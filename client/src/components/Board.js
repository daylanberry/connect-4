import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import calculateWinner from "../helpers/calculateWinner";
import "./Board.css";

import HoverCircle from "./HoverCircle";

const Board = ({
  users,
  user,
  setUser,
  user1,
  user2,
  board,
  setBoard,
  socket,
}) => {
  const [hasWon, setHasWon] = useState(false);
  const currentColor = users?.length && users[0].user === user1 ? 1 : 2;

  const setBackground = (num) => {
    if (num === 0) return "white";
    if (num === 1) return "red";
    if (num === 2) return "blue";
  };

  useEffect(() => {
    if (socket) {
      socket.on("hasWon", (currentUser) => {
        setUser(currentUser);
        setHasWon(true);
      });
    }
  }, [socket]);

  const pickCol = (selectedCol) => {
    const updatedBoard = board.slice();
    if (hasWon) return;

    let i = 0;
    if (user !== user1) {
      alert("It's not your turn yet");
      return;
    }

    while (updatedBoard[i]) {
      if (
        (updatedBoard[i + 1] && updatedBoard[i + 1][selectedCol] > 0) ||
        i === updatedBoard.length - 1
      ) {
        if (i === 0 && updatedBoard[i][selectedCol] > 0) return;

        updatedBoard[i][selectedCol] = currentColor;

        break;
      }
      i++;
    }

    if (updatedBoard.length) {
      setBoard(updatedBoard);
      socket.emit("setBoard", JSON.stringify(updatedBoard));
      if (calculateWinner(board, i, selectedCol)) {
        socket.emit("hasWon", user);
        return setHasWon(true);
      }

      if (user) {
        const userToSet = users.filter(({ user: u }) => u !== user)[0].user;
        socket.emit("setCurrentUser", userToSet);
      }
    }
  };

  const createBoard = () => {
    return (
      <div>
        {board.map((row) => (
          <div className="d-flex">
            {row.map((ele, i) => (
              <div className="col-container" onClick={() => pickCol(i)}>
                <div
                  className="circle bg-red"
                  style={{ backgroundColor: setBackground(ele) }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const setNewBoard = () => {
    const board = new Array(6)
      .fill()
      .map((_) => new Array(7).fill().map(() => 0));

    setBoard(board);
  };

  const renderCongrats = () => {
    const reset = () => {
      setNewBoard();
      setHasWon(false);
    };

    return (
      <>
        <div className="mb-4">Congratulations {user}, you won!</div>
        <Button variant="success" onClick={reset}>
          Reset
        </Button>
      </>
    );
  };

  return (
    <div className="text-center">
      {hasWon ? (
        renderCongrats()
      ) : (
        <div className="mb-4">
          {user === user1 ? "It's your turn" : `It's ${user}'s turn`}
        </div>
      )}
      <HoverCircle
        row={board[0] ? board[0].length : 7}
        circleColor={setBackground(currentColor)}
        pickCol={pickCol}
      />
      {createBoard()}
    </div>
  );
};

export default Board;
