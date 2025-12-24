const express = require('express');
const pool = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all available properties
router.get('/', async (req, res) => {
  try {
    const [properties] = await pool.query(
      'SELECT * FROM properties WHERE status = ? ORDER BY created_at DESC',
      ['available']
    );
    res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Get featured properties
router.get('/featured', async (req, res) => {
  try {
    const [properties] = await pool.query(
      'SELECT * FROM properties WHERE featured = 1 AND status = ? ORDER BY created_at DESC LIMIT 6',
      ['available']
    );
    res.json(properties);
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({ error: 'Failed to fetch featured properties' });
  }
});

// Get single property by ID
router.get('/:id', async (req, res) => {
  try {
    const [properties] = await pool.query(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Parse JSON fields
    const property = properties[0];
    if (property.amenities) {
      property.amenities = JSON.parse(property.amenities);
    }
    if (property.images) {
      property.images = JSON.parse(property.images);
    }

    res.json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// Create property (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title, description, address, city, state, zip_code, country,
      price, bedrooms, bathrooms, area_sqft, property_type, amenities, images
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO properties 
       (title, description, address, city, state, zip_code, country, price, 
        bedrooms, bathrooms, area_sqft, property_type, amenities, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description, address, city, state, zip_code, country || 'USA',
        price, bedrooms || 1, bathrooms || 1, area_sqft, property_type || 'apartment',
        JSON.stringify(amenities || []), JSON.stringify(images || [])
      ]
    );

    res.status(201).json({ id: result.insertId, message: 'Property created' });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

module.exports = router;
