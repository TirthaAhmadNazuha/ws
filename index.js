/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
app.use(cors());

app.use(express.static('clientExample'));

const clients = new Set();
const mediaWs = new WebSocketServer({ port: process.env.PORT || 8081, path: '/addMedia' });
mediaWs.on('connection', (socket, req) => {
  const client = { nameRoom: req.url.replace('/addMedia?', ''), socket };
  clients.add(client);
  client.socket.on('message', (message) => {
    clients.forEach((anotherClient) => {
      if (anotherClient.nameRoom === client.nameRoom && anotherClient.socket !== client.socket) {
        anotherClient.socket.send(message.toString());//
      }
    });
  });
  client.socket.on('close', () => {
    clients.delete(client);
  });
});

app.listen(process.env.PORT || 8080, () => console.log('Server Runned in port 8080'));
