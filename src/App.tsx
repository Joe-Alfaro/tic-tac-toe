import { FC, useCallback, useState } from 'react';
import { getIsWinner } from './utilities';
import { BoardData, Player } from './types';
import './style.css';

const PLAYER_COLORS: { [key in Player]: string } = {
  [Player.X]: 'red',
  [Player.O]: 'blue',
};

const BOARD_SIZE = 3;

export const App: FC<{ name: string }> = ({ name }) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.X);
  const [boardData, setBoardData] = useState<BoardData>(
    Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null))
  );
  const [winner, setWinner] = useState<Player>(null);
  const [isTie, setIsTie] = useState<boolean>(false);

  function handleClick(rowIndex: number, columnIndex: number): () => void {
    return function (): void {
      if (boardData[rowIndex][columnIndex] || winner || isTie) {
        return;
      }

      const newBoardData: BoardData = [...boardData.map((row) => [...row])];
      newBoardData[rowIndex][columnIndex] = currentPlayer;

      setBoardData(newBoardData);

      const isWinner: boolean = getIsWinner(newBoardData, currentPlayer);

      if (isWinner) {
        setWinner(currentPlayer);
      } else if (newBoardData.every((row) => row.every((square) => !!square))) {
        setIsTie(true);
      } else {
        setCurrentPlayer((prev) => (prev === Player.X ? Player.O : Player.X));
      }
    };
  }

  const handleReset: () => void = useCallback(function (): void {
    setBoardData(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer(Player.X);
    setWinner(null);
    setIsTie(false);
  }, []);

  return (
    <div className="container">
      <div className="board">
        {boardData.map((row, rowIndex) => (
          <div className="row">
            {row.map((cell, columnIndex) => (
              <button
                className={`square ${PLAYER_COLORS[cell]}`}
                style={{ width: `${100 / BOARD_SIZE}%` }}
                onClick={handleClick(rowIndex, columnIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      {winner ? (
        <div className={`declaration ${PLAYER_COLORS[currentPlayer]}`}>
          {currentPlayer} has won the game!
        </div>
      ) : null}
      {isTie ? <div className="declaration">Cat's Game!</div> : null}
      <button className="reset" onClick={handleReset}>
        {isTie || winner ? 'Play Again' : 'RESET'}
      </button>
    </div>
  );
};
