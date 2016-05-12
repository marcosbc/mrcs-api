const http = require('http');
const server = http.createServer((req, res) => {
  var responseBody = {
    hello: 'world'
  };
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(responseBody));
});
server.listen(3000);
