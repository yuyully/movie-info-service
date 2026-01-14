require('dotenv').config();

module.exports = {
  omdbapi: {
    apiKey: process.env.OMDBAPI_API_KEY,
    baseUrl: process.env.OMDBAPI_BASE_URL
  },
  themoviedb: {
    apiKey: process.env.THEMOVIEDB_API_KEY,
    baseUrl: process.env.THEMOVIEDB_BASE_URL,
    maxPages: parseInt(process.env.THEMOVIEDB_MAX_PAGES) || 10
  },
  server: {
    port: parseInt(process.env.PORT) || 8080
  }
};
