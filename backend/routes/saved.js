const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's saved properties
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [saved] = await pool.query(
      `SELECT sp.*, p.*
       FROM saved_properties sp
       JOIN properties p ON sp.property_id = p.id
       WHERE sp.user_id = ?
       ORDER BY sp.created_at DESC`,
      [req.user.id]
    );

    // Parse images JSON
    const parsedSaved = saved.map(item => ({
      ...item,
      images: item.images ? JSON.parse(item.images) : [],
      amenities: item.amenities ? JSON.parse(item.amenities) : []
    }));

    res.json(parsedSaved);
  } catch (error) {
    console.error('Get saved properties error:', error);
    res.status(500).json({ error: 'Failed to fetch saved properties' });
  }
});

// Check if property is saved
router.get('/check/:propertyId', authenticateToken, async (req, res) => {
  try {
    const [saved] = await pool.query(
      'SELECT id FROM saved_properties WHERE user_id = ? AND property_id = ?',
      [req.user.id, req.params.propertyId]
    );
    res.json({ saved: saved.length > 0 });
  } catch (error) {
    console.error('Check saved error:', error);
    res.status(500).json({ error: 'Failed to check saved status' });
  }
});

// Save a property
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { property_id } = req.body;

    if (!property_id) {
      return res.status(400).json({ error: 'Property ID is required' });
    }

    // Check if already saved
    const [existing] = await pool.query(
      'SELECT id FROM saved_properties WHERE user_id = ? AND property_id = ?',
      [req.user.id, property_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Property already saved' });
    }

    const [result] = await pool.query(
      'INSERT INTO saved_properties (user_id, property_id) VALUES (?, ?)',
      [req.user.id, property_id]
    );

    res.status(201).json({ id: result.insertId, message: 'Property saved' });
  } catch (error) {
    console.error('Save property error:', error);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

// Unsave a property
router.delete('/:propertyId', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?',
      [req.user.id, req.params.propertyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Saved property not found' });
    }

    res.json({ message: 'Property unsaved' });
  } catch (error) {
    console.error('Unsave property error:', error);
    res.status(500).json({ error: 'Failed to unsave property' });
  }
});

module.exports = router;
