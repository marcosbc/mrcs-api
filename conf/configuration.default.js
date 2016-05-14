// Rename this file to "config.js"
const config = {
  // Path where the API will be accessed from the browser
  base: '/',
  // Protocol and host to be shown when response contains URLs
  protocol: 'http',
  host: '127.0.0.1',
  // Port which the API server will run on
  port: 3000,
  // Different modes: 'production', 'development'
  env: 'development'
};
module.exports = config;
