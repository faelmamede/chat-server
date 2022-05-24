const express = require('express');
const cors = require('cors');
const serverPort = process.env.PORT ? process.env.PORT : 3000;

const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');

const { getUnsedPort, parseUserInfo } = require('./utils/middlewares');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', [getUnsedPort, parseUserInfo, loginRoutes]);
app.use('/user', [userRoutes]);
app.use('/chat', [chatRoutes]);

app.listen(serverPort, () => {
    console.log(`<< Server running on port ${serverPort} >>`);
});
