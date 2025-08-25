import React from 'react';
import Cell from './Cell';

function Board({ board, onCellClick, disabled, winningLine }) {
  return (
    <div className="board">
      <div className="board-grid">
        {board.map((value, index) => (
          <Cell
            key={index}
            index={index}
            value={value}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            isWinning={winningLine && winningLine.includes(index)}
          />
        ))}
      </div>
      {winningLine && winningLine.length > 0 && (
        <div className={`winning-line winning-line-${getWinningLineClass(winningLine)}`} />
      )}
    </div>
  );
}

function getWinningLineClass(winningLine) {
  const patterns = {
    '0,1,2': 'row-0',
    '3,4,5': 'row-1',
    '6,7,8': 'row-2',
    '0,3,6': 'col-0',
    '1,4,7': 'col-1',
    '2,5,8': 'col-2',
    '0,4,8': 'diag-1',
    '2,4,6': 'diag-2'
  };
  return patterns[winningLine.join(',')] || '';
}

export default Board;