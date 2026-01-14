const axios = require('axios');
const config = require('../config/config');
const Movie = require('../models/Movie');

class MoviedbClient {
  constructor() {
    this.apiKey = config.themoviedb.apiKey;
    this.baseUrl = config.themoviedb.baseUrl;
    this.maxPages = config.themoviedb.maxPages;
  }

  getApiName() {
    return 'themoviedb';
  }

  async getMovieList(searchString) {
    try {
      // Get all pages of search results
      const allMovies = await this.getAllPages(searchString);
      
      if (!allMovies || allMovies.length === 0) {
        return [];
      }

      // Get directors for each movie
      const moviePromises = allMovies.map(async (movie) => {
        const directors = await this.getDirectors(movie.id);
        const movieObj = new Movie(movie.title, movie.release_date);
        movieObj.id = movie.id;
        movieObj.setDirectors(directors);
        return movieObj;
      });

      return await Promise.all(moviePromises);
    } catch (error) {
      console.error('Error fetching movies from TheMovieDB:', error.message);
      return [];
    }
  }

  async getAllPages(searchString) {
    try {
      // Get first page to know total pages
      const firstPage = await this.getPage(searchString, 1);
      
      if (!firstPage || !firstPage.results) {
        return [];
      }

      let allResults = [...firstPage.results];
      const totalPages = Math.min(firstPage.total_pages || 1, this.maxPages);

      // Get remaining pages
      if (totalPages > 1) {
        const pagePromises = [];
        for (let i = 2; i <= totalPages; i++) {
          pagePromises.push(this.getPage(searchString, i));
        }
        
        const pages = await Promise.all(pagePromises);
        pages.forEach(page => {
          if (page && page.results) {
            allResults = allResults.concat(page.results);
          }
        });
      }

      return allResults;
    } catch (error) {
      console.error('Error fetching all pages:', error.message);
      return [];
    }
  }

  async getPage(searchString, page) {
    try {
      const response = await axios.get(`${this.baseUrl}/3/search/movie`, {
        params: {
          api_key: this.apiKey,
          query: searchString,
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error.message);
      return null;
    }
  }

  async getDirectors(movieId) {
    try {
      const credits = await this.getCredits(movieId);
      
      if (!credits || !credits.crew) {
        return [];
      }

      return credits.crew
        .filter(person => person.job === 'Director')
        .map(director => director.name);
    } catch (error) {
      console.error(`Error fetching directors for movie ${movieId}:`, error.message);
      return [];
    }
  }

  async getCredits(movieId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/3/movie/${movieId}/credits`,
        {
          params: {
            api_key: this.apiKey
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching credits for movie ${movieId}:`, error.message);
      return null;
    }
  }
}

module.exports = MoviedbClient;
