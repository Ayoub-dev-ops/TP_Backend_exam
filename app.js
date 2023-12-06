require('dotenv').config();
var app = require('./loaders/express');
var mongoose = require('./loaders/mongoose');
var debug = require('debug')('backend:server');
var http = require('http');

async function startServer() {
  
  await mongoose.connect();

  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  var server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' demande des privilèges élevés');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' est déjà utilisé');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    debug('Listening on ' + bind); 
  }
}

startServer();