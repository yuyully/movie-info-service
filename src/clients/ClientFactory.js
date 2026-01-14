const OmdbClient = require('./OmdbClient');
const MoviedbClient = require('./MoviedbClient');

class ClientFactory {
  constructor() {
    this.clients = new Map();
    this.initClients();
  }

  initClients() {
    const omdbClient = new OmdbClient();
    const moviedbClient = new MoviedbClient();
    
    this.clients.set(omdbClient.getApiName(), omdbClient);
    this.clients.set(moviedbClient.getApiName(), moviedbClient);
  }

  get(apiName) {
    const client = this.clients.get(apiName);
    
    if (!client) {
      throw new Error(`Illegal api name: ${apiName}`);
    }
    
    return client;
  }
}

module.exports = new ClientFactory();
