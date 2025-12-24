const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Submit contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, phone, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || null, phone || null, message]
    );

    res.status(201).json({ id: result.insertId, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
