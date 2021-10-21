const uuidv4 = require("uuid").v4;
let users = new Map();

let board = new Array(6).fill().map((_) => new Array(7).fill().map(() => 0));

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = socket.id;

    socket.on("setUser", (user) => this.setUser(user));
    socket.on("setBoard", (value) => this.setBoard(value));
    socket.on("hasWon", () => this.sendHasWonMessage());
    socket.on("sendId", () => this.sendId());
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendId() {
    console.log(this.id);
    this.socket.broadcast.emit("setId", this.socket.id);
    // this.io.sockets.emit("setId", this.socket.id);
  }

  sendHasWonMessage() {
    this.io.sockets.emit("hasWon", currentUser);
  }

  setUser(user) {
    const id = this.socket.id;

    users.set(id, user);

    this.io.sockets.emit("setUser", users.get(id));
  }

  setBoard(value) {
    board = value;

    this.io.sockets.emit("board", board);
  }

  disconnect() {
    // users.delete(this.socket);
  }
}

function connectFour(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

module.exports = connectFour;
