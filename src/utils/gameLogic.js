export function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: pattern };
    }
  }

  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', winningLine: [] };
  }

  return null;
}

export function getEmptyCells(board) {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

export function isGameOver(board) {
  const result = checkWinner(board);
  return result !== null;
}