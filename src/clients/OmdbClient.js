const axios = require('axios');
const config = require('../config/config');
const Movie = require('../models/Movie');

class OmdbClient {
  constructor() {
    this.apiKey = config.omdbapi.apiKey;
    this.baseUrl = config.omdbapi.baseUrl;
  }

  getApiName() {
    return 'omdbapi';
  }

  async getMovieList(searchString) {
    try {
      // First, search for movies
      const searchResult = await this.searchMovies(searchString);
      
      if (!searchResult || !searchResult.Search) {
        return [];
      }

      // Then get detailed info for each movie
      const moviePromises = searchResult.Search.map(movie => 
        this.getMovieDetails(movie.imdbID)
      );

      const detailedMovies = await Promise.all(moviePromises);
      
      // Convert to Movie objects
      return detailedMovies
        .filter(movie => movie)
        .map(movie => this.convertToMovie(movie));
    } catch (error) {
      console.error('Error fetching movies from OMDB:', error.message);
      return [];
    }
  }

  async searchMovies(searchString) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: searchString
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching OMDB:', error.message);
      return null;
    }
  }

  async getMovieDetails(imdbId) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          i: imdbId
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for ${imdbId}:`, error.message);
      return null;
    }
  }

  convertToMovie(detailedMovie) {
    const movie = new Movie(
      detailedMovie.Title,
      detailedMovie.Year,
      detailedMovie.Director
    );
    return movie;
  }
}

module.exports = OmdbClient;
