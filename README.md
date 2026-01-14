# Movie Info

A REST API service for fetching movie information from OMDB API and TheMovieDB API.

## Using with Node.js

### Prerequisites
- Node.js 18 or higher
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Copy `.env.example` to `.env` and update the API keys if needed:
```bash
cp .env.example .env
```

### Run

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## Using with Docker

### Build
```bash
docker build -t movie-info:latest .
```

### Run
```bash
docker run -p 8080:8080 -t movie-info:latest
```

### Stop
```bash
docker ps
docker stop [CONTAINER_ID]
```

## Usage

### API Endpoints

#### Search movies
```
GET /movies/{apiname}?title={title}
```

Where:
- `apiname`: `omdbapi` or `themoviedb`
- `title`: text to search in movie's title

### Examples

```bash
curl -i http://localhost:8080/movies/omdbapi?title=transformation
curl -i http://localhost:8080/movies/themoviedb?title=transformation
```

### Response Format

```json
{
  "movies": [
    {
      "Title": "Movie Title",
      "Year": "2020",
      "Director": "Director Name"
    }
  ]
}
```


