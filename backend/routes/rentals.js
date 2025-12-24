const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's rentals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rentals] = await pool.query(
      `SELECT r.*, p.title, p.address, p.city, p.state, p.images, p.price
       FROM rentals r
       JOIN properties p ON r.property_id = p.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    // Parse images JSON for each rental
    const parsedRentals = rentals.map(rental => ({
      ...rental,
      property: {
        title: rental.title,
        address: rental.address,
        city: rental.city,
        state: rental.state,
        images: rental.images ? JSON.parse(rental.images) : [],
        price: rental.price
      }
    }));

    res.json(parsedRentals);
  } catch (error) {
    console.error('Get rentals error:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

// Create rental application
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { property_id, start_date, end_date, total_amount, notes } = req.body;

    if (!property_id || !start_date || !end_date) {
      return res.status(400).json({ error: 'Property ID, start date, and end date are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO rentals (user_id, property_id, start_date, end_date, total_amount, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, property_id, start_date, end_date, total_amount || null, notes || null]
    );

    res.status(201).json({ id: result.insertId, message: 'Rental application submitted' });
  } catch (error) {
    console.error('Create rental error:', error);
    res.status(500).json({ error: 'Failed to submit rental application' });
  }
});

// Update rental status
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const [result] = await pool.query(
      'UPDATE rentals SET status = ? WHERE id = ? AND user_id = ?',
      [status, req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    res.json({ message: 'Rental updated' });
  } catch (error) {
    console.error('Update rental error:', error);
    res.status(500).json({ error: 'Failed to update rental' });
  }
});

module.exports = router;
