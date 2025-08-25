import React from 'react';

function GameStatus({ gameState, currentPlayer, isAIThinking }) {
  const getStatusMessage = () => {
    if (gameState?.winner === 'X') {
      return { text: 'You Win!', className: 'status-win' };
    }
    if (gameState?.winner === 'O') {
      return { text: 'Computer Wins!', className: 'status-lose' };
    }
    if (gameState?.winner === 'draw') {
      return { text: "It's a Draw!", className: 'status-draw' };
    }
    if (isAIThinking) {
      return { text: 'Computer thinking...', className: 'status-thinking' };
    }
    if (currentPlayer === 'X') {
      return { text: 'Your turn', className: 'status-player' };
    }
    return { text: "Computer's turn", className: 'status-ai' };
  };

  const status = getStatusMessage();

  return (
    <div className={`game-status ${status.className}`}>
      <span className="status-text">{status.text}</span>
      {isAIThinking && (
        <span className="thinking-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      )}
    </div>
  );
}

export default GameStatus;