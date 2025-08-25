import React from 'react';
import classNames from 'classnames';

function Cell({ value, onClick, disabled, isWinning, index }) {
  return (
    <button
      className={classNames('cell', {
        'cell-x': value === 'X',
        'cell-o': value === 'O',
        'cell-winning': isWinning,
        'cell-disabled': disabled
      })}
      onClick={onClick}
      disabled={disabled || value !== null}
      data-testid={`cell-${index}`}
      aria-label={`Cell ${index}`}
    >
      <span className="cell-content">
        {value}
      </span>
    </button>
  );
}

export default Cell;