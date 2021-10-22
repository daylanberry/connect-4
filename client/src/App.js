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
  const [user, setUser] = useState("");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [view, setView] = useState(VIEWS.STEP_0);
  const [error, setError] = useState("");
  const [board, setBoard] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);

  const setNewBoard = () => {
    const board = new Array(6)
      .fill()
      .map((_) => new Array(7).fill().map(() => 0));

    setBoard(board);
  };

  useEffect(() => {
    setNewBoard();
    const userString = localStorage.getItem("users") || "";

    const [user1, user2] = userString.split("-");

    if (user1 && user2) {
      if (room?.length) {
        setView(VIEWS.STEP_3);
      }
      setUser1(user1);
      setUser2(user2);
      setUser(user1);

      if (socket) {
        socket.emit("setUser", user1);
      }
    }

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
      socket.on("setUser", (user) => {
        setUser(user);
      });
    }
  }, [socket, setBoard, user]);

  if (view === VIEWS.STEP_0) {
    return (
      <JoinRoom
        error={error}
        setError={() => setError("You must join a room to continue")}
        room={room}
        setView={(e) => setView(VIEWS.STEP_1)}
        setRoom={(e) => setRoom(e.target.value)}
      />
    );
  }

  return (
    <>
      {view === VIEWS.STEP_3 && (
        <UserTable user1={user1} user2={user2} user={user} room={room} />
      )}
      <Container className="pt-5">
        {view !== "started" ? (
          <SetUser
            changeUser1={(e) => view === "user1" && setUser1(e.target.value)}
            changeUser2={(e) => view === "user2" && setUser2(e.target.value)}
            user1={user1}
            user2={user2}
            view={view}
            setView={setView}
            error={error}
            setError={setError}
            setCurrentUser={setUser}
          />
        ) : (
          <Board
            user={user}
            setUser={setUser}
            user1={user1}
            user2={user2}
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
