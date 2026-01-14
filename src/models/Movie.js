class Movie {
  constructor(title = '', year = '', director = '') {
    this.title = title || '';
    this.year = this.parseYear(year);
    this.directors = this.parseDirectors(director);
    this.id = null;
  }

  parseYear(date) {
    if (!date) return '';
    const parts = date.split(/[^0-9]/);
    return parts.length > 0 ? parts[0] : date;
  }

  parseDirectors(directors) {
    if (!directors) return [];
    if (Array.isArray(directors)) return directors;
    return directors.split(',').map(d => d.trim());
  }

  setDirectors(directors) {
    if (!directors) {
      this.directors = [];
    } else if (Array.isArray(directors)) {
      this.directors = directors;
    } else {
      this.directors = directors.split(',').map(d => d.trim());
    }
    return this;
  }

  addDirector(director) {
    if (!this.directors) {
      this.directors = [];
    }
    this.directors.push(director || '');
  }

  toJSON() {
    return {
      Title: this.title,
      Year: this.year,
      Director: this.directors.join(', ')
    };
  }
}

module.exports = Movie;
