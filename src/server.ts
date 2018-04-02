'use strict';

import { Application } from 'express';
import http from 'http';

import app from './app';

const port: number | string | boolean = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Server started on ${bind}`);
});

function normalizePort(val: number | string): number | string | boolean {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  
  if (isNaN(port)) {
    return val;
  }
  else if (port >= 0) {
    return port;
  }
  else {
    return false;
  }
}
