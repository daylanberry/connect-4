import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Board from "./components/Board";
import UserTable from "./components/UserTable";
import SetUser from "./components/SetUser";
import JoinRoom from "./components/JoinRoom";
import VIEWS from "./helpers/views";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";
import io from "socket.io-client";

function App() {
  const [users, setUsers] = useState([]);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user, setUser] = useState("");
  const [view, setView] = useState(VIEWS.STEP_1);
  const [error, setError] = useState("");
  const [board, setBoard] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");

  const setNewBoard = () => {
    const board = new Array(6)
      .fill()
      .map((_) => new Array(7).fill().map(() => 0));

    setBoard(board);
  };

  useEffect(() => {
    if (socket) {
      socket.on("joinRoom", (msg) => {
        console.log("testing", msg);
      });

      socket.on("roomError", (msg) => {
        console.log("error", msg);
      });
    }
  }, [socket]);

  useEffect(() => {
    setNewBoard();

    const newSocket = io(
      process.env.NODE_ENV === "production"
        ? "https://connecter-4.herokuapp.com/"
        : `http://${window.location.hostname}:3001`
    );
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("sendId");

      socket.on("board", (board) => {
        setBoard(JSON.parse(board));
      });
      socket.on("setUser", (users) => {
        setUsers(users);
        setUser2(users.find(({ user }) => user !== user1).user || "");
      });
    }
  }, [socket, setBoard, user]);

  if (view === VIEWS.STEP_1) {
    return (
      <JoinRoom
        error={error}
        setError={() => setError("You must join a room to continue")}
        room={room}
        setView={(e) => setView(VIEWS.STEP_2)}
        setRoom={(e) => setRoom(e.target.value)}
        socket={socket}
      />
    );
  }

  return (
    <>
      {view === VIEWS.STEP_3 && (
        <UserTable user1={user1} user2={user2} user={user} room={room} />
      )}
      <Container className="pt-5">
        {view === VIEWS.STEP_2 ? (
          <SetUser
            setUser={(e) => setUser(e.target.value)}
            setUser1={(user) => setUser1(user)}
            user={user}
            view={view}
            setView={setView}
            error={error}
            setError={setError}
            socket={socket}
          />
        ) : (
          <Board
            user={user}
            setUser={setUser}
            board={board}
            setBoard={setBoard}
            socket={socket}
          />
        )}
      </Container>
    </>
  );
}

export default App;
