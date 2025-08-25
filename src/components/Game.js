import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import { checkWinner } from '../utils/gameLogic';
import { getAIMove } from '../utils/ai';

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const makeMove = useCallback((index, player) => {
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = player;
      return newBoard;
    });
  }, []);

  const handleCellClick = useCallback((index) => {
    if (board[index] || gameState || currentPlayer !== 'X' || isAIThinking) {
      return;
    }
    makeMove(index, 'X');
    setCurrentPlayer('O');
  }, [board, gameState, currentPlayer, isAIThinking, makeMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameState(null);
    setIsAIThinking(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  // Check for game over
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setGameState(result);
      setIsAIThinking(false);
    }
  }, [board]);

  // AI move
  useEffect(() => {
    if (currentPlayer === 'O' && !gameState && !isAIThinking) {
      setIsAIThinking(true);
      
      const makeAIMove = async () => {
        // Add delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const aiMove = getAIMove([...board], difficulty);
        if (aiMove !== null) {
          makeMove(aiMove, 'O');
          setCurrentPlayer('X');
        }
        setIsAIThinking(false);
      };
      
      makeAIMove();
    }
  }, [currentPlayer, board, gameState, difficulty, isAIThinking, makeMove]);

  return (
    <div className="game">
      <div className="game-header">
        <h1 className="game-title">TIC-TAC-TOE</h1>
        <div className="arcade-subtitle">ARCADE EDITION</div>
      </div>

      <div className="difficulty-selector">
        <button
          className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('easy')}
        >
          EASY
        </button>
        <button
          className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('medium')}
        >
          MEDIUM
        </button>
        <button
          className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('hard')}
        >
          HARD
        </button>
      </div>

      <GameStatus 
        gameState={gameState}
        currentPlayer={currentPlayer}
        isAIThinking={isAIThinking}
      />

      <Board
        board={board}
        onCellClick={handleCellClick}
        disabled={gameState !== null || isAIThinking || currentPlayer === 'O'}
        winningLine={gameState?.winningLine}
      />

      {gameState && (
        <button className="new-game-btn" onClick={resetGame}>
          NEW GAME
        </button>
      )}

      <div className="game-info">
        <div className="player-info">
          <span className="player-x">YOU: X</span>
          <span className="player-o">CPU: O</span>
        </div>
      </div>
    </div>
  );
}

export default Game;