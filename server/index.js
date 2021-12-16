const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
const morgan = require('morgan');
const port = 3000;
const router = require('./router/routes.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/topics', express.static(path.join(__dirname, '../client/dist')));
app.use('/chatroom', express.static(path.join(__dirname, '../client/dist')));
app.use('/videochat', express.static(path.join(__dirname, '../client/dist')));
//app.use('/rooms', express.static(path.join(__dirname, '../client/dist')))

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

  socket.on('join_room', (room) => {
    let users = io.sockets.adapter.rooms.get(room);
    socket.emit('connected_users', users ? [...users] : [])

    socket.join(room);
    console.log('User joined room:', room)
  });

  socket.on('send_connection_to', ({ targetID, fromID, fromSignal }) => {
    io.to(targetID).emit('new_connection_request', { fromID, fromSignal })
  });

  socket.on('confirmed_connection_request', ({ targetID, fromID, fromSignal }) => {
    io.to(targetID).emit('connection_confirmation', { targetID: fromID, targetSignal: fromSignal })
  })

  socket.on('new_message', (data) => {
    console.log('Got new message:')
    console.log(data);
    socket.to(data.room).emit('message_update', data.message);
  })

  socket.on('disconnect', () => {
    console.log(`User: ${socket.id} has disconnected`);
  })
})

app.get('/server/rooms/users', (req, res) => {
  const userCount = req.query.roomIDs.map(roomID => {
    let userCount = io.sockets.adapter.rooms.get(roomID);
    return userCount ? userCount.size : 0
  });
  console.log(userCount);
  res.status(200).send(userCount);
})