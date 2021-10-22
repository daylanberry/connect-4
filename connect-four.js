const uuidv4 = require("uuid").v4;
let users = [];

let board = new Array(6).fill().map((_) => new Array(7).fill().map(() => 0));
let currentRoom = "";

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.id = socket.id;

    socket.on("joinRoom", (room) => this.joinRoom(room));
    socket.on("setUser", (user) => this.setUser(user));
    socket.on("setBoard", (value) => this.setBoard(value));
    socket.on("hasWon", () => this.sendHasWonMessage());
    socket.on("disconnect", () => this.disconnect());
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  joinRoom(room) {
    currentRoom = room;
    this.socket.join(room);
    this.socket.emit("joinRoom", "joined " + currentRoom);
  }

  sendHasWonMessage() {
    this.io.sockets.emit("hasWon", currentUser);
  }

  setUser(user) {
    const id = this.socket.id;

    console.log(users);

    if (users.length < 2) {
      users.push({ id, user });
      this.io.sockets.to(currentRoom).emit("setUser", users);
    } else {
      this.io.sockets
        .to(currentRoom)
        .emit("roomError", "There are already two players in this room");
    }
  }

  setBoard(value) {
    board = value;

    this.io.sockets.to(currentRoom).emit("board", board);
    // this.io.sockets.emit("board", board);
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
