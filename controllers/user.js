const { getAllConnectedUsers, userInstance } = require('../models/User');

const getAllUsers = () => {
    return getAllConnectedUsers();
}

const getNotifications = (nickname) => {
    const user = userInstance({ nickname });
    return user.getNotifications();
}

const deleteNotification = ({ from, to }) => {
    const user = userInstance( {nickname: to} );
    user.removeNotification(from);
    return true;
}

module.exports = {
    getAllUsers,
    getNotifications,
    deleteNotification
}