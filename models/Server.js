class Server {

    constructor() {
        this.endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : '192.168.100.10';
        this.serverPort = process.env.PORT ? process.env.PORT : 3000;
        this.connectedPorts = 0;

        this.openedChats = [];
    }

    getUnsedPort() {
        return this.serverPort + this.connectedPorts + 1;
    }

    incrementConnectedPorts() {
        this.connectedPorts++;
    }

    getEndpoint() {
        return this.endpoint;
    }

    getOpenedChat(people) {
        const chat = this.openedChats.find(chat => {
            return JSON.stringify(chat.users) == JSON.stringify(people);
        });

        return chat;
    }

    addOpenedChat(chat) {
        this.openedChats.push(chat);
    }

}

exports.server = new Server();