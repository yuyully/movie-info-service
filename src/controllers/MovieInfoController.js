const express = require('express');
const movieInfoService = require('../services/MovieInfoService');

const router = express.Router();

// GET /movies/synchron/:api?title=
router.get('/synchron/:api', async (req, res) => {
  try {
    const { api } = req.params;
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title parameter is required' });
    }

    const result = await movieInfoService.getMovieList(title, api);
    res.json(result);
  } catch (error) {
    console.error('Error in getMovieList:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// For backward compatibility with original API
// GET /movies/:api?title=
router.get('/:api', async (req, res) => {
  try {
    const { api } = req.params;
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Title parameter is required' });
    }

    const result = await movieInfoService.getMovieList(title, api);
    res.json(result);
  } catch (error) {
    console.error('Error in getMovieList:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
