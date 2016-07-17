// Rename this file to "config.js"
const config = {
  // Path where the API will be accessed from the browser
  base: '/',
  // Port which the API server will run on
  port: 80,
  // Different modes: 'production', 'development'
  env: 'development',
  // Front-end settings, for obtaining URLs
  frontend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 50080
  },
  // MongoDB connection string
  mongoDbUri: 'mongodb://api:api@mongodb:27017/api',
  // Locale for character support
  locale: 'en-US'
};
module.exports = config;
