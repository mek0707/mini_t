import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);e
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
