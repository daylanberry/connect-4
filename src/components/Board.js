import { useEffect, useState } from "react";
import calculateWinner from "../helpers/calculateWinner";
import "./Board.css";

import HoverCircle from "./HoverCircle";

const Board = ({ user, setUser, user1, user2 }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const board = new Array(6)
      .fill()
      .map((_) => new Array(7).fill().map(() => 0));

    setBoard(board);
  }, []);

  const setBackground = (num) => {
    if (num === 0) return "white";
    if (num === 1) return "red";
    if (num === 2) return "blue";
  };

  const pickCol = (selectedCol) => {
    const updatedBoard = board.slice();

    let i = 0;

    while (updatedBoard[i]) {
      if (
        (updatedBoard[i + 1] && updatedBoard[i + 1][selectedCol] > 0) ||
        i === updatedBoard.length - 1
      ) {
        updatedBoard[i][selectedCol] = user === user1 ? 1 : 2;
        break;
      }
      i++;
    }

    if (updatedBoard.length) {
      setBoard(updatedBoard);
      calculateWinner(board);
      if (user && user === user1) {
        setUser(user2);
      } else {
        setUser(user1);
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

  return (
    <div className="text-center">
      <div className="mb-4">{user}: It's you're turn</div>
      <HoverCircle
        row={board[0] ? board[0].length : 7}
        circleColor={user === user1 ? setBackground(1) : setBackground(2)}
        pickCol={pickCol}
      />
      {createBoard()}
    </div>
  );
};

export default Board;
