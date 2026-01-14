const clientFactory = require('../clients/ClientFactory');

class MovieInfoService {
  async getMovieList(movieTitle, apiName) {
    try {
      const client = clientFactory.get(apiName);
      const movies = await client.getMovieList(movieTitle);
      
      return {
        movies: movies
      };
    } catch (error) {
      console.error('Error in MovieInfoService:', error.message);
      throw error;
    }
  }
}

module.exports = new MovieInfoService();
