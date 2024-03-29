class Socket {
    constructor(url = "ws://localhost/socket") {
        this.socket = new WebSocket(url);

        this.socket.onopen = (event) => {
            this.socket.send("We\'re connected!")
        };

        this.socket.onmessage = (message) => {
            console.log(JSON.parse(message));
        };
    }

    sendMessage = (message) => {
        this.socket.send(JSON.stringify(message));
    }
}

export default Socket;
