const { server } = require('../models/Server');

const parseUserInfo = (req, res, next) => {
    if (!req.user) {
        req.user = {};
    }
    req.user.nickname = req.body.nickname;
    next();
}

const parseNotificationsInfo = (req, res, next) => {
    if (!req.body.from || !req.body.to) {
        return res.send('Missing arguments').status(400);
    }
    if (!req.notification) {
        req.notification = {};
    }
    req.notification.from = req.body.from;
    req.notification.to = req.body.to;

    next();
}

const parseMessageSentInfo = (req, res, next) => {
    if (!req.body.from || !req.body.to || !req.body.message) {
        return res.send('Missing arguments').status(400);
    }
    if (!req.messageObj) {
        req.messageObj = {};
    }
    req.messageObj.from = req.body.from;
    req.messageObj.to = req.body.to;
    req.messageObj.message = req.body.message;

    next();
}

const parseChatInfo = (req, res, next) => {
    if (!req.body.talkers) {
        return res.send('Missing arguments').status(400);
    }
    if (!req.messageObj) {
        req.chatInfo = {};
    }
    req.chatInfo.users = req.body.talkers;

    next();
}

const getUnsedPort = (req, res, next) => {
    if (!req.user) {
        req.user = {};
    }
    req.user.port = server.getUnsedPort();
    next();
}


module.exports = {
    parseUserInfo,
    getUnsedPort,
    parseMessageSentInfo,
    parseChatInfo,
    parseNotificationsInfo
}