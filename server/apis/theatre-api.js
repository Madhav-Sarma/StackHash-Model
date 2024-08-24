const express = require('express');
const router = express.Router();

// Controller function to get all theatres
const getTheatres = async (db) => {
  return await db.collection('theatres').find().toArray();
};

// Route to fetch all theatres
router.get('/', async (req, res) => {
  try {
    const theatres = await getTheatres(req.db);
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch theatres' });
  }
});

module.exports = router;
