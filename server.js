const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const connectFour = require("./connect-four");
var socketio = require("socket.io");
const cors = require("cors");
const app = express();

// app.use(cors);
// todo add to heroku: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

// // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// // All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/api", (req, res) => {
  res.send("hello");
});

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
connectFour(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
