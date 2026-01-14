const express = require('express');
const config = require('./config/config');
const movieInfoController = require('./controllers/MovieInfoController');

const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/movies', movieInfoController);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Movie Info Service is running' });
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Movie Info Service listening on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/movies/omdbapi?title=transformation`);
  console.log(`Try: http://localhost:${PORT}/movies/themoviedb?title=transformation`);
});

module.exports = app;
