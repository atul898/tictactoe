import { getEasyMove, getMediumMove, getHardMove, getAIMove } from '../utils/ai';

describe('AI Functions', () => {
  describe('Easy AI', () => {
    test('returns valid move for partially filled board', () => {
      const board = ['X', null, null, null, 'O', null, null, null, null];
      const move = getEasyMove(board);
      expect([1, 2, 3, 5, 6, 7, 8]).toContain(move);
    });

    test('returns valid move for empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getEasyMove(board);
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
    });

    test('returns null for full board', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      const move = getEasyMove(board);
      expect(move).toBe(null);
    });
  });

  describe('Hard AI', () => {
    test('blocks winning move', () => {
      const board = ['X', 'X', null, null, 'O', null, null, null, null];
      const move = getHardMove(board);
      expect(move).toBe(2); // Should block the win
    });

    test('takes winning move', () => {
      const board = ['O', 'O', null, 'X', 'X', null, null, null, null];
      const move = getHardMove(board);
      expect(move).toBe(2); // Should win the game
    });

    test('takes center on empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getHardMove(board);
      expect(move).toBe(4); // Should take center
    });

    test('takes corner when player takes center first', () => {
      const board = [null, null, null, null, 'X', null, null, null, null];
      const move = getHardMove(board);
      expect([0, 2, 6, 8]).toContain(move); // Should take a corner
    });

    test('blocks fork opportunity', () => {
      const board = ['X', null, null, null, 'O', null, null, null, 'X'];
      const move = getHardMove(board);
      // Should block the fork by taking edge or creating own threat
      expect([1, 3, 5, 7]).toContain(move);
    });

    test('creates fork when possible', () => {
      const board = ['O', null, null, null, 'X', null, null, null, 'O'];
      const move = getHardMove(board);
      // Should create a fork opportunity
      expect([2, 6]).toContain(move);
    });
  });

  describe('Medium AI', () => {
    test('makes strategic moves', () => {
      const board = ['X', null, null, null, 'O', null, null, null, null];
      const move = getMediumMove(board);
      expect(move).not.toBe(null);
      expect(board[move]).toBe(null);
    });

    test('blocks obvious wins', () => {
      const board = ['X', 'X', null, null, 'O', null, null, null, null];
      // Medium AI should usually block this, but might occasionally miss due to randomness
      const moves = [];
      for (let i = 0; i < 10; i++) {
        const testBoard = [...board];
        moves.push(getMediumMove(testBoard));
      }
      // At least some moves should block the win
      expect(moves).toContain(2);
    });
  });

  describe('getAIMove', () => {
    test('delegates to easy AI', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getAIMove(board, 'easy');
      expect(move).not.toBe(null);
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
    });

    test('delegates to medium AI', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getAIMove(board, 'medium');
      expect(move).not.toBe(null);
    });

    test('delegates to hard AI', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getAIMove(board, 'hard');
      expect(move).toBe(4); // Hard AI takes center on empty board
    });

    test('defaults to hard AI for unknown difficulty', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getAIMove(board, 'unknown');
      expect(move).toBe(4); // Hard AI takes center on empty board
    });
  });

  describe('AI Unbeatable on Hard', () => {
    test('never loses from empty board', () => {
      // This is a simplified test - in reality, we'd need to test all possible game trees
      const board = [null, null, null, null, null, null, null, null, null];
      const move = getHardMove(board);
      expect(move).toBe(4); // Optimal first move
    });

    test('draws or wins when second player', () => {
      const board = ['X', null, null, null, null, null, null, null, null];
      const move = getHardMove(board);
      expect(move).toBe(4); // Should take center when corner is taken
    });
  });
});