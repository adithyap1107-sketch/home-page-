const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// ─── GET /api/assets ───────────────────────────────────────────────────────────
// Returns all active assets. Optional query param: ?category=agrishare
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let query = 'SELECT * FROM assets WHERE is_active = TRUE';
    const params = [];

    if (category) {
      params.push(category.toLowerCase());
      query += ` AND category = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json({
      count: result.rows.length,
      assets: result.rows,
    });
  } catch (err) {
    console.error('GET /api/assets error:', err.message);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// ─── GET /api/assets/:id ───────────────────────────────────────────────────────
// Returns a single asset by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid asset ID' });
    }

    const result = await pool.query(
      'SELECT * FROM assets WHERE id = $1 AND is_active = TRUE',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /api/assets/:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

// ─── POST /api/assets ──────────────────────────────────────────────────────────
// Add a new asset listing
router.post('/', async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      price_per_share,
      total_shares,
      available_shares,
      location,
      image_url,
    } = req.body;

    // Basic validation
    const required = { title, category, price_per_share, total_shares, available_shares };
    const missing = Object.entries(required)
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    const validCategories = ['agrishare', 'brickshare', 'luxshare', 'dailyrentals', 'truckshare'];
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
    }

    if (available_shares > total_shares) {
      return res.status(400).json({ error: 'available_shares cannot exceed total_shares' });
    }

    const result = await pool.query(
      `INSERT INTO assets
        (title, category, description, price_per_share, total_shares, available_shares, location, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, category.toLowerCase(), description, price_per_share, total_shares, available_shares, location, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/assets error:', err.message);
    res.status(500).json({ error: 'Failed to create asset' });
  }
});

// ─── PATCH /api/assets/:id ─────────────────────────────────────────────────────
// Update available_shares (e.g. after a purchase)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { available_shares } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid asset ID' });
    }

    if (available_shares === undefined || isNaN(available_shares) || available_shares < 0) {
      return res.status(400).json({ error: 'Provide a valid available_shares value (>= 0)' });
    }

    const result = await pool.query(
      `UPDATE assets SET available_shares = $1 WHERE id = $2 AND is_active = TRUE RETURNING *`,
      [available_shares, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('PATCH /api/assets/:id error:', err.message);
    res.status(500).json({ error: 'Failed to update asset' });
  }
});

// ─── DELETE /api/assets/:id ────────────────────────────────────────────────────
// Soft delete (sets is_active = false)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid asset ID' });
    }

    const result = await pool.query(
      `UPDATE assets SET is_active = FALSE WHERE id = $1 RETURNING id, title`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json({ message: `Asset "${result.rows[0].title}" deactivated`, id: result.rows[0].id });
  } catch (err) {
    console.error('DELETE /api/assets/:id error:', err.message);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

module.exports = router;
