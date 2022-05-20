const express = require('express');
const router = express.Router();

const { sendMessage, getAllMessagesInAChat } = require('../controllers/chat');

router.post('/sendMessage', async (req, res) => {
     const timeMessageWasSent = await sendMessage(req.messageObj);
     res.send(`OK! Message sent at ${timeMessageWasSent}`).status(200);
})

router.get('/getAllMessages', async (req, res) => {
     const messages = await getAllMessagesInAChat(req.messageObj);
     res.send(messages).status(200);
})

module.exports = router;