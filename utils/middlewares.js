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

const parseMessageInfo = (req, res, next) => {
    if (!req.body.from || !req.body.to) {
        return res.send('Missing arguments').status(400);
    }
    if (!req.messageObj) {
        req.messageObj = {};
    }
    req.messageObj.from = req.body.from;
    req.messageObj.to = req.body.to;
    req.messageObj.message = req.body.message ? req.body.message : " ";

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
    parseMessageInfo,
    parseNotificationsInfo
}