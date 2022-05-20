const express = require('express');
const router = express.Router();

const { getAllUsers, getNotifications, deleteNotification } = require('../controllers/user');
const { parseUserInfo, parseNotificationsInfo } = require('../utils/middlewares');

router.get('/getConnectedUsers', (req, res) => {
     res.send(getAllUsers()).status(200);
})

router.get('/getNotifications', parseUserInfo ,(req, res) => {
     const nickname = req.user.nickname;
     res.send(getNotifications(nickname)).status(200);
})

router.delete('/deleteNotification', parseNotificationsInfo ,(req, res) => {
     const notification = req.notification;
     res.send(deleteNotification(notification)).status(200);
})

module.exports = router;