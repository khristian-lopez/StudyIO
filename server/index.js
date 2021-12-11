const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
const morgan = require('morgan');
const port = 3000;
const router = require('./router/routes.js');

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use('/topics', express.static(path.join(__dirname, '../client/dist')))
app.use('/chatroom', express.static(path.join(__dirname, '../client/dist')))

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', router);

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket id:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log('User joined room:', data)
  });

  socket.on('new_message', (data) => {
    console.log('Got new message:')
    console.log(data);
    socket.to(data.room).emit('message_update', data.message);
  })

  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} has disconnected`);
  })
})