const express = require('express');
const serverPort = process.env.PORT ? process.env.PORT : 3000;

const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');

const { getUnsedPort, parseUserInfo, parseMessageInfo } = require('./utils/middlewares');

const app = express();
app.use(express.json());

app.use('/login', [getUnsedPort, parseUserInfo, loginRoutes]);
app.use('/user', [userRoutes]);
app.use('/chat', [parseMessageInfo, chatRoutes]);

app.listen(serverPort, () => {
    console.log(`<< Server running on port ${serverPort} >>`);
});