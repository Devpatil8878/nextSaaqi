// pages/api/chat.ts
import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = (req: any, res: any) => {

  
  if (!req.socket.server.io) {
    console.log('Creating server...');
    const httpServer = req.socket.server;

    const io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    io.on('connection', socket => {
      console.log('a user connected');

      socket.on('chat message', message => {
        console.log('message:', message);
        io.emit('chat message', message);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Server already created');
  }
  res.writeHead(307, { Location: '/chat' });
  res.end();
};

export default handler;
