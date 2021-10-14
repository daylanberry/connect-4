const path = require("path");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
// todo add to heroku: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

// // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "../client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("message here!");
});

const PORT = process.env.PORT || 3001;
server.listen(3001, () => {
  console.log("server started on port " + PORT);
});
