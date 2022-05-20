class User {
    
    constructor({ nickname, port }) {
        this.nickname = nickname;
        this.port = port;
        this.notificationBy = {};
    }

    notifiedByUser(notifier) {
        if (!this.notificationBy[notifier]) {
            this.notificationBy[notifier] = 0;
        }
        this.notificationBy[notifier]++;
    }

    removeNotification(notifier) {
        delete this.notificationBy[notifier];
    }

    getNotifications() {
        return { ...this.notificationBy };
    }

}

const __users = {};

const userInstance = ( { nickname, port} ) => {
    if (!__users[nickname]) {
        __users[nickname] = new User( {nickname, port} );
    }
    return __users[nickname];
}

const getAllConnectedUsers = () => {
    const users = [];
    for (const userKey in __users) {
        const user = { 
            nickname: __users[userKey].nickname,
        }
        users.push(user);
    }
    return users;
}

module.exports = {
    userInstance,
    getAllConnectedUsers
}