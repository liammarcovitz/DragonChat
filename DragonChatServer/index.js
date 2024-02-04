/*var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
server.listen();*/

const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    var result = "" + String(data);
    if (result.startsWith("MESSAGE: ")) {
      // message
      result = result.replace("MESSAGE: ", "");

      wss.clients.forEach(function each(client) {
        client.send(result);
      });
    }
    else if (result.startsWith("CONNECTION: ")) {
      result = result.replace("CONNECTION: ", "");
      wss.clients.forEach(function each(client) {
        client.send(result + " has joined.");
      });
    }
  });

  ws.send('You connected to server.');
});