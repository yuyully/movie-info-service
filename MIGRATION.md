# Node.js Migration Summary

This project has been successfully ported from Java Spring Boot to Node.js with Express.

## Technology Stack Changes

### Before (Java)
- **Framework**: Spring Boot 2.3.2
- **Build Tool**: Maven
- **Runtime**: Java 8
- **HTTP Client**: Spring WebFlux/WebClient
- **Reactive**: Project Reactor (Flux, Mono)
- **Data**: Lombok, Jackson

### After (Node.js)
- **Framework**: Express.js 4.18.2
- **Runtime**: Node.js 18+
- **HTTP Client**: Axios 1.6.2
- **Async**: Native async/await
- **Config**: dotenv 16.3.1

## Architecture Mapping

| Java Class | Node.js Module | Description |
|------------|----------------|-------------|
| MovieInfoApplication.java | src/index.js | Main application entry point |
| MovieInfoConfigurationProperties.java | src/config/config.js | Configuration management |
| Movie.java | src/models/Movie.js | Movie data model |
| ClientFactory.java | src/clients/ClientFactory.js | Factory pattern for API clients |
| OmdbClient.java | src/clients/OmdbClient.js | OMDB API client |
| MoviedbClient.java | src/clients/MoviedbClient.js | TheMovieDB API client |
| MovieInfoService.java | src/services/MovieInfoService.js | Business logic service |
| MovieInfoController.java | src/controllers/MovieInfoController.js | REST API controller |

## Features Preserved

✅ Search movies by title from OMDB API
✅ Search movies by title from TheMovieDB API
✅ Fetch detailed movie information including directors
✅ RESTful API endpoints
✅ CORS support
✅ Configuration via environment variables
✅ Docker support
✅ Same JSON response format

## API Endpoints

Both implementations support the same endpoints:

```
GET /movies/omdbapi?title={title}
GET /movies/themoviedb?title={title}
GET /movies/synchron/{api}?title={title}
```

## Changes from Java Version

1. **Reactive Flux endpoint removed**: The Java version had a `/movies/flux/{api}` endpoint that used Spring WebFlux streaming. This has been omitted in the Node.js version for simplicity, as the standard async/await approach is more idiomatic in Node.js.

2. **Redis caching removed**: The Java version included Redis caching support. This has been removed to keep the initial migration minimal and focused on core functionality. It can be added later if needed.

3. **Error handling**: Simplified error handling using try-catch blocks instead of Spring's exception handling.

4. **Configuration**: Uses .env file instead of application.properties.

## How to Use

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the application:
   ```bash
   npm start
   ```

3. Test the API:
   ```bash
   curl "http://localhost:8080/movies/omdbapi?title=transformation"
   curl "http://localhost:8080/movies/themoviedb?title=transformation"
   ```

## Docker

Build and run with Docker:
```bash
docker build -t movie-info:latest .
docker run -p 8080:8080 movie-info:latest
```
