class Chat {

    constructor() {
        this.users = [];
        this.messages = [];
    }

    sendMessage(msg) {
        this.messages.push(msg);
    }

    getMessages() {
        return [...this.messages];
    }

    pushMessage(msg) {
        this.messages.push(msg);
    }

    setUsers(users) {
        this.users = users;
    }

}

module.exports = Chat;