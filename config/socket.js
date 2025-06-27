const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
let ioInstance;

function setup(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('Socket connected');

    socket.on('join-tenant', (tenant) => {
      socket.join(tenant);
      console.log(`Client joined room: ${tenant}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  const tenants = ['tenant']; // add more if needed

  tenants.forEach(tenant => {
    const filePath = path.join(__dirname, `tenants.json`);
    fs.watchFile(filePath, { interval: 1000 }, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        console.log(`[${tenant}] File changed, broadcasting update...`);

        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const features = content;
        console.log(JSON.stringify(features));

        io.to(tenant).emit('features-update', features);
      }
    });
  });

  return io;
}

function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized');
  }
  return ioInstance;
}

module.exports = setup;
module.exports.getIO = getIO;
