const { server } = require('../models/Server');
const { userInstance } = require('../models/User');
const Chat = require('../models/Chat');

const sendMessage = ({ from, to, message }) => {
    const peopleWhoWantToTalkWith = [from, to].sort();
    let openedChat = server.getOpenedChat(peopleWhoWantToTalkWith);
    if (!openedChat) {
        openedChat = new Chat();
        openedChat.setUsers(peopleWhoWantToTalkWith);
        server.addOpenedChat(openedChat);
    }

    const currentTime = new Date();
    const messageObj = {
        from: from,
        to: to,
        message: message,
        time: currentTime
    };
    openedChat.pushMessage(messageObj);
    sendNotificationToReceiver(from, to);

    return currentTime;
}

const sendNotificationToReceiver = (sender, receiver) => {
    const user = userInstance({ nickname: receiver });
    user.notifiedByUser(sender);
}

const getAllMessagesInAChat = ({ from, to }) => {
    const peopleTalking = [from, to].sort();
    const openedChat = server.getOpenedChat(peopleTalking);
    if (!openedChat) {
        return [];
    }

    return openedChat.getMessages();
}

module.exports = {
    sendMessage,
    getAllMessagesInAChat
}