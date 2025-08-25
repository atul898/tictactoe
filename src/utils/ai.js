import { checkWinner, getEmptyCells } from './gameLogic';

export function getEasyMove(board) {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function minimax(board, depth, isMaximizing, maxDepth = Infinity, alpha = -Infinity, beta = Infinity) {
  const result = checkWinner(board);
  
  if (result) {
    if (result.winner === 'O') return 10 - depth;
    if (result.winner === 'X') return depth - 10;
    if (result.winner === 'draw') return 0;
  }
  
  if (depth >= maxDepth) {
    return 0;
  }
  
  const emptyCells = getEmptyCells(board);
  
  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const index of emptyCells) {
      board[index] = 'O';
      const score = minimax(board, depth + 1, false, maxDepth, alpha, beta);
      board[index] = null;
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const index of emptyCells) {
      board[index] = 'X';
      const score = minimax(board, depth + 1, true, maxDepth, alpha, beta);
      board[index] = null;
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return minScore;
  }
}

export function getMediumMove(board) {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return null;
  
  // 30% chance to make a random move for medium difficulty
  if (Math.random() < 0.3) {
    return getEasyMove(board);
  }
  
  let bestScore = -Infinity;
  let bestMove = emptyCells[0];
  
  for (const index of emptyCells) {
    board[index] = 'O';
    const score = minimax(board, 0, false, 3); // Depth limit of 3
    board[index] = null;
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  
  return bestMove;
}

export function getHardMove(board) {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return null;
  
  // First move optimization - prefer center or corners
  if (emptyCells.length === 9) {
    return 4; // Take center
  }
  if (emptyCells.length === 8 && board[4] === 'X') {
    // If player took center, take a corner
    const corners = [0, 2, 6, 8];
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  let bestScore = -Infinity;
  let bestMove = emptyCells[0];
  
  for (const index of emptyCells) {
    board[index] = 'O';
    const score = minimax(board, 0, false); // No depth limit
    board[index] = null;
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  
  return bestMove;
}

export function getAIMove(board, difficulty) {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board);
    case 'medium':
      return getMediumMove(board);
    case 'hard':
      return getHardMove(board);
    default:
      return getHardMove(board);
  }
}