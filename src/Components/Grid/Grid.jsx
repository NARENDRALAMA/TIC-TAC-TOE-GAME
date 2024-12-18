import { useState } from "react";
import Card from "../card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Grid.css";
import isWinner from "../helpers/checkWinner";

function Grid({ numberOfCards }) {
  const [turn, setTurn] = useState(true); //false -> X, true => O
  const [board, setBoard] = useState(Array(numberOfCards).fill("")); //[" ", " ", " ", " ", " "]);
  const [winner, setWinner] = useState(null);

  function play(index) {
    console.log(
      "Mother Fucker i just played my move, sugewa Jotaro Ki sama da",
      index
    );

    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    console.log("Winner is ", win);
    if (win) {
      setWinner(win);
      console.log("Congratulations X! win the game!!");
      toast(`Congratulations ${win} wins the game!!`);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          (<h1 className="turn-highlight"> Winner is {winner}</h1>)
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"}</h1>
      <ToastContainer position="top-center" />

      <div className="grid">
        {board.map((value, idx) => {
          return (
            <Card
              gameEnd={winner ? true : false}
              onPlay={play}
              player={value}
              key={idx}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
