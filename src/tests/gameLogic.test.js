import { checkWinner, getEmptyCells, isGameOver } from '../utils/gameLogic';

describe('Game Logic', () => {
  describe('checkWinner', () => {
    test('detects horizontal win - top row', () => {
      const board = ['X', 'X', 'X', null, null, null, null, null, null];
      const result = checkWinner(board);
      expect(result.winner).toBe('X');
      expect(result.winningLine).toEqual([0, 1, 2]);
    });

    test('detects horizontal win - middle row', () => {
      const board = [null, null, null, 'O', 'O', 'O', null, null, null];
      const result = checkWinner(board);
      expect(result.winner).toBe('O');
      expect(result.winningLine).toEqual([3, 4, 5]);
    });

    test('detects horizontal win - bottom row', () => {
      const board = [null, null, null, null, null, null, 'X', 'X', 'X'];
      const result = checkWinner(board);
      expect(result.winner).toBe('X');
      expect(result.winningLine).toEqual([6, 7, 8]);
    });

    test('detects vertical win - left column', () => {
      const board = ['O', null, null, 'O', null, null, 'O', null, null];
      const result = checkWinner(board);
      expect(result.winner).toBe('O');
      expect(result.winningLine).toEqual([0, 3, 6]);
    });

    test('detects vertical win - middle column', () => {
      const board = [null, 'X', null, null, 'X', null, null, 'X', null];
      const result = checkWinner(board);
      expect(result.winner).toBe('X');
      expect(result.winningLine).toEqual([1, 4, 7]);
    });

    test('detects vertical win - right column', () => {
      const board = [null, null, 'O', null, null, 'O', null, null, 'O'];
      const result = checkWinner(board);
      expect(result.winner).toBe('O');
      expect(result.winningLine).toEqual([2, 5, 8]);
    });

    test('detects diagonal win - top-left to bottom-right', () => {
      const board = ['X', null, null, null, 'X', null, null, null, 'X'];
      const result = checkWinner(board);
      expect(result.winner).toBe('X');
      expect(result.winningLine).toEqual([0, 4, 8]);
    });

    test('detects diagonal win - top-right to bottom-left', () => {
      const board = [null, null, 'O', null, 'O', null, 'O', null, null];
      const result = checkWinner(board);
      expect(result.winner).toBe('O');
      expect(result.winningLine).toEqual([2, 4, 6]);
    });

    test('detects draw', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      const result = checkWinner(board);
      expect(result.winner).toBe('draw');
      expect(result.winningLine).toEqual([]);
    });

    test('returns null for incomplete game', () => {
      const board = ['X', null, null, null, 'O', null, null, null, null];
      const result = checkWinner(board);
      expect(result).toBe(null);
    });

    test('returns null for empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const result = checkWinner(board);
      expect(result).toBe(null);
    });
  });

  describe('getEmptyCells', () => {
    test('finds all empty cells', () => {
      const board = ['X', null, 'O', null, null, 'X', null, 'O', null];
      const emptyCells = getEmptyCells(board);
      expect(emptyCells).toEqual([1, 3, 4, 6, 8]);
    });

    test('returns empty array for full board', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      const emptyCells = getEmptyCells(board);
      expect(emptyCells).toEqual([]);
    });

    test('returns all indices for empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const emptyCells = getEmptyCells(board);
      expect(emptyCells).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe('isGameOver', () => {
    test('returns true for win', () => {
      const board = ['X', 'X', 'X', null, null, null, null, null, null];
      expect(isGameOver(board)).toBe(true);
    });

    test('returns true for draw', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(isGameOver(board)).toBe(true);
    });

    test('returns false for ongoing game', () => {
      const board = ['X', null, null, null, 'O', null, null, null, null];
      expect(isGameOver(board)).toBe(false);
    });
  });
});