const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const port = 3000;
const router = require('./router/routes.js');

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use('/topics', express.static(path.join(__dirname, '../client/dist')))
app.use('/chatroom', express.static(path.join(__dirname, '../client/dist')))
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})