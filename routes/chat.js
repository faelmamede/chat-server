const express = require('express');
const router = express.Router();

const { parseMessageSentInfo, parseChatInfo } = require("../utils/middlewares");
const { sendMessage, getAllMessagesInAChat } = require('../controllers/chat');

router.post('/sendMessage', parseMessageSentInfo, async (req, res) => {
     const timeMessageWasSent = await sendMessage(req.messageObj);
     res.send(`${timeMessageWasSent}`).status(200);
})

router.post('/getAllMessages', parseChatInfo, async (req, res) => {
     const messages = await getAllMessagesInAChat(req.chatInfo.users);
     res.send(messages).status(200);
})

module.exports = router;