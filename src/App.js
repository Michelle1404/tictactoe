import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ResetButton from "./components/ResetButton";
import ScoreBoard from "./components/ScoreBoard";

function App() {
   const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  let [zähler, setZähler] = useState(8);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    })
    
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({...scores,oScore})
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({...scores,xScore})
      }
    }

    setZähler((prevZähler) => prevZähler-1);
    
    if (zähler < 1 ) {
      resetBoard();
      return console.log("reset");
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  }

  
  const resetBoard = () => {
    setZähler(8);
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        setBoard(Array(9).fill(null));
        return board[x]; 
      } 
    }
  }
  
  const resetScore = () => {
    setScores({ xScore: 0, oScore: 0 })
  }

  return(
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} resetScore={resetScore} />
    </div>
  );
}

export default App;
