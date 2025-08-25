# Implementation Plan: Classic Arcade Tic-Tac-Toe

## Overview
This implementation plan provides step-by-step instructions for building the Classic Arcade Tic-Tac-Toe game as specified in the PRD. Each step includes clear actions, expected outcomes, and verification criteria.

## Prerequisites
- Node.js (v18 or higher) and npm installed
- Git installed
- Basic knowledge of React and JavaScript
- Code editor (VS Code recommended)

## Project Structure
```
tictactoe/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Board.js
│   │   ├── Cell.js
│   │   ├── Game.js
│   │   └── GameStatus.js
│   ├── styles/
│   │   ├── arcade.css
│   │   └── animations.css
│   ├── utils/
│   │   ├── ai.js
│   │   └── gameLogic.js
│   ├── tests/
│   │   ├── ai.test.js
│   │   ├── gameLogic.test.js
│   │   └── Game.test.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

## Phase 0: Project Setup (30 minutes)

### Step 0.1: Initialize React Project
```bash
npx create-react-app .
```
**Note**: Run this in the existing tictactoe directory
**Verify**: Project created, `npm start` shows default React app

### Step 0.2: Clean Up Boilerplate
- Delete unnecessary files: `App.test.js`, `logo.svg`, `setupTests.js`, `reportWebVitals.js`
- Clear contents of `App.css`
- Simplify `App.js` to basic component
**Verify**: App runs with blank page

### Step 0.3: Create Project Structure
- Create folders: `components/`, `styles/`, `utils/`
- Create empty component files
**Verify**: Folder structure matches specification

### Step 0.4: Install Additional Dependencies
```bash
npm install --save classnames
```
**Verify**: Package added to package.json

---

## Phase 1: Core Game Logic (2 hours)

### Step 1.1: Create Board State Management
**File**: `src/components/Game.js`
- Initialize 3x3 board array (null values)
- Create state for current player (X or O)
- Create state for game status (playing/won/draw)
**Verify**: Console.log shows correct board state

### Step 1.2: Build Board Component
**File**: `src/components/Board.js`
- Create 3x3 grid using CSS Grid
- Map board array to Cell components
- Pass click handlers to cells
**Verify**: 3x3 grid visible on screen

### Step 1.3: Create Cell Component
**File**: `src/components/Cell.js`
- Display X, O, or empty
- Handle click events
- Disable clicks on filled cells
**Verify**: Can click cells to place X

### Step 1.4: Implement Turn Logic
**File**: `src/components/Game.js`
- Alternate between X and O
- Update board state on click
- Prevent moves on occupied cells
**Verify**: X and O alternate correctly

### Step 1.5: Add Win Condition Checking
**File**: `src/utils/gameLogic.js` (Create this file)
```javascript
export function checkWinner(board) {
  // Check rows, columns, diagonals
  // Return 'X', 'O', 'draw', or null
}

export function checkDraw(board) {
  // Return true if board is full and no winner
}

export function getEmptyCells(board) {
  // Return array of indices for empty cells
}
```
**Verify**: Game ends when someone wins

### Step 1.6: Create Game Status Display
**File**: `src/components/GameStatus.js`
- Show current player's turn
- Display winner message
- Display draw message
**Verify**: Status updates correctly

### Step 1.7: Add Reset Game Function
**File**: `src/components/Game.js`
- Reset board to initial state
- Reset game status
- Add "New Game" button
**Verify**: Can start new game after win/draw

---

## Phase 2: AI Implementation (3 hours)

### Step 2.1: Create AI Module Structure
**File**: `src/utils/ai.js`
- Export functions for each difficulty
- Create move selection interface
**Verify**: AI module imports correctly

### Step 2.2: Implement Easy AI (Random Moves)
**File**: `src/utils/ai.js`
```javascript
import { getEmptyCells } from './gameLogic';

export function getEasyMove(board) {
  const emptyCells = getEmptyCells(board);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}
```
**Verify**: AI makes valid random moves

### Step 2.3: Implement Minimax Algorithm
**File**: `src/utils/ai.js`
```javascript
import { checkWinner } from './gameLogic';

function minimax(board, depth, isMaximizing, maxDepth = Infinity) {
  const winner = checkWinner(board);
  
  // Terminal states
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'draw' || depth >= maxDepth) return 0;
  
  // Recursive case
  const emptyCells = getEmptyCells(board);
  
  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let index of emptyCells) {
      board[index] = 'O';
      const score = minimax(board, depth + 1, false, maxDepth);
      board[index] = null;
      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let index of emptyCells) {
      board[index] = 'X';
      const score = minimax(board, depth + 1, true, maxDepth);
      board[index] = null;
      minScore = Math.min(minScore, score);
    }
    return minScore;
  }
}
```
**Verify**: Algorithm returns scores correctly

### Step 2.4: Implement Medium AI
**File**: `src/utils/ai.js`
```javascript
export function getMediumMove(board) {
  const emptyCells = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMove = emptyCells[0];
  
  for (let index of emptyCells) {
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
```
**Verify**: AI plays strategically but not perfectly

### Step 2.5: Implement Hard AI
**File**: `src/utils/ai.js`
```javascript
export function getHardMove(board) {
  const emptyCells = getEmptyCells(board);
  let bestScore = -Infinity;
  let bestMove = emptyCells[0];
  
  for (let index of emptyCells) {
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
```
**Verify**: AI is unbeatable (only draws or wins)

### Step 2.6: Add Difficulty Selector
**File**: `src/components/Game.js`
- Add difficulty state (easy/medium/hard)
- Create difficulty buttons
- Pass difficulty to AI module
**Verify**: Can select and change difficulty

### Step 2.7: Integrate AI with Game Flow
**File**: `src/components/Game.js`
- Trigger AI move after player move
- Add slight delay for AI "thinking"
- Disable board during AI turn
**Verify**: AI responds to player moves

---

## Phase 3: Visual Design - Arcade Style (2 hours)

### Step 3.1: Set Up Arcade Color Scheme
**File**: `src/styles/arcade.css`
```css
:root {
  --bg-color: #0a0a0a;
  --neon-green: #00ff41;
  --neon-pink: #ff10f0;
  --neon-blue: #00d4ff;
  --grid-color: #00ff41;
}
```
**Verify**: Dark background with neon colors

### Step 3.2: Add Pixel Font
**File**: `public/index.html`
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
```
**Verify**: Pixel font displays correctly

### Step 3.3: Style Game Board
**File**: `src/styles/arcade.css`
- Neon grid lines
- Glowing effect on hover
- Cell size and spacing
**Verify**: Board has arcade aesthetic

### Step 3.4: Style X and O Symbols
**File**: `src/styles/arcade.css`
- Large, bold symbols
- Neon colors (X=pink, O=blue)
- Text shadow for glow effect
**Verify**: Symbols look arcade-style

### Step 3.5: Style Game UI Elements
**File**: `src/styles/arcade.css`
- Arcade-style buttons
- Retro title design
- Status message styling
**Verify**: All UI elements match theme

### Step 3.6: Add Background Effects
**File**: `src/styles/arcade.css`
- Scanline effect
- Subtle grid pattern
- Optional: animated stars
**Verify**: Background enhances arcade feel

### Step 3.7: Make Responsive
**File**: `src/styles/arcade.css`
- Mobile breakpoints
- Touch-friendly cell sizes
- Maintain aspect ratio
**Verify**: Works on mobile devices

---

## Phase 4: Animations & Effects (2 hours)

### Step 4.1: Add Piece Placement Animation
**File**: `src/styles/animations.css`
```css
@keyframes placeSymbol {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```
**Verify**: Symbols animate when placed

### Step 4.2: Create Win Line Animation
**File**: `src/components/Board.js`
- Add win line overlay
- Animate line drawing
- Flash winning symbols
**Verify**: Win condition shows animated line

### Step 4.3: Add Draw Game Effect
**File**: `src/styles/animations.css`
- Board shake animation
- Fade to gray effect
**Verify**: Draw triggers visual effect

### Step 4.4: Implement Hover Effects
**File**: `src/styles/animations.css`
- Glow on empty cells
- Pulse effect on hover
- Cursor changes
**Verify**: Interactive hover feedback

### Step 4.5: Add Button Animations
**File**: `src/styles/animations.css`
- Press effect on click
- Hover glow
- Difficulty selector animations
**Verify**: Buttons feel responsive

### Step 4.6: Create Loading Animation
**File**: `src/components/Game.js`
- "Computer thinking" animation
- Pulsing dots or spinner
**Verify**: Shows during AI turn

### Step 4.7: Add Particle Effects (Optional)
**File**: `src/components/WinEffect.js`
- Confetti for wins
- Explosion effect
- Use CSS or canvas
**Verify**: Victory feels celebratory

---

## Phase 5: Testing & Deployment (2 hours)

### Step 5.1: Create Test Setup
**File**: `package.json`
```json
"scripts": {
  "test": "react-scripts test",
  "test:coverage": "react-scripts test --coverage --watchAll=false"
}
```
**Verify**: Test scripts added

### Step 5.2: Test Game Logic
**File**: `src/tests/gameLogic.test.js`
```javascript
import { checkWinner, checkDraw, getEmptyCells } from '../utils/gameLogic';

describe('Game Logic', () => {
  test('detects horizontal win', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(checkWinner(board)).toBe('X');
  });
  
  test('detects vertical win', () => {
    const board = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(checkWinner(board)).toBe('O');
  });
  
  test('detects diagonal win', () => {
    const board = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(checkWinner(board)).toBe('X');
  });
  
  test('detects draw', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkWinner(board)).toBe('draw');
  });
  
  test('returns null for incomplete game', () => {
    const board = ['X', null, null, null, 'O', null, null, null, null];
    expect(checkWinner(board)).toBe(null);
  });
  
  test('finds empty cells correctly', () => {
    const board = ['X', null, 'O', null, null, 'X', null, 'O', null];
    expect(getEmptyCells(board)).toEqual([1, 3, 4, 6, 8]);
  });
});
```
**Verify**: All game logic tests pass

### Step 5.3: Test AI Functions
**File**: `src/tests/ai.test.js`
```javascript
import { getEasyMove, getMediumMove, getHardMove } from '../utils/ai';

describe('AI Functions', () => {
  test('Easy AI returns valid move', () => {
    const board = ['X', null, null, null, 'O', null, null, null, null];
    const move = getEasyMove(board);
    expect([1, 2, 3, 5, 6, 7, 8]).toContain(move);
  });
  
  test('Hard AI blocks winning move', () => {
    const board = ['X', 'X', null, null, 'O', null, null, null, null];
    const move = getHardMove(board);
    expect(move).toBe(2); // Should block the win
  });
  
  test('Hard AI takes winning move', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null];
    const move = getHardMove(board);
    expect(move).toBe(2); // Should win the game
  });
  
  test('Hard AI takes center on empty board', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    const move = getHardMove(board);
    expect(move).toBe(4); // Should take center
  });
});
```
**Verify**: All AI tests pass

### Step 5.4: Test React Components
**File**: `src/tests/Game.test.js`
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
  test('renders game board', () => {
    render(<Game />);
    const cells = screen.getAllByRole('button');
    expect(cells.length).toBeGreaterThanOrEqual(9);
  });
  
  test('allows player to make move', () => {
    render(<Game />);
    const cells = screen.getAllByTestId(/cell-/);
    fireEvent.click(cells[0]);
    expect(cells[0].textContent).toBe('X');
  });
  
  test('shows new game button after win', () => {
    render(<Game />);
    // Simulate win condition
    const newGameButton = screen.queryByText(/New Game/i);
    expect(newGameButton).toBeInTheDocument();
  });
  
  test('difficulty selector works', () => {
    render(<Game />);
    const easyButton = screen.getByText(/Easy/i);
    const hardButton = screen.getByText(/Hard/i);
    fireEvent.click(hardButton);
    // Verify difficulty changed
  });
});
```
**Verify**: Component tests pass

### Step 5.5: Run Test Coverage
```bash
npm run test:coverage
```
**Verify**: Coverage > 80% for all files

### Step 5.6: Cross-Browser Testing
- Chrome
- Firefox
- Safari
- Edge
**Verify**: Game works in all browsers

### Step 5.7: Mobile Testing
- iOS Safari
- Android Chrome
- Touch responsiveness
**Verify**: Fully playable on mobile

### Step 5.8: Performance Optimization
```bash
npm run build
```
- Check bundle size
- Optimize images/assets
- Minimize CSS
**Verify**: Build completes, size < 500KB

### Step 5.9: Prepare for GitHub Pages
**File**: `package.json`
```json
"homepage": "https://[username].github.io/tictactoe",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
**Verify**: Scripts added to package.json

### Step 5.10: Install GitHub Pages Package
```bash
npm install --save-dev gh-pages
```
**Verify**: Package installed

### Step 5.11: Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repo-url]
git push -u origin main
npm run deploy
```
**Verify**: Game live at GitHub Pages URL

---

## Verification Checklist

### Core Functionality
- [ ] Game loads without errors
- [ ] Can place X and O alternately
- [ ] Win conditions detected correctly
- [ ] Draw condition detected
- [ ] New Game button works
- [ ] AI makes moves

### AI Difficulty
- [ ] Easy mode makes random moves
- [ ] Medium mode plays strategically
- [ ] Hard mode is unbeatable
- [ ] Can switch difficulty mid-game

### Visual Design
- [ ] Arcade aesthetic consistent
- [ ] Animations smooth
- [ ] Responsive on all devices
- [ ] No visual glitches

### Deployment
- [ ] Builds without errors
- [ ] Deploys to GitHub Pages
- [ ] Accessible via public URL

---

## Troubleshooting Guide

### Common Issues

**Issue**: AI not making moves
- Check console for errors
- Verify AI functions are imported
- Check board state is passed correctly

**Issue**: Animations laggy
- Reduce animation complexity
- Use transform instead of position
- Check for console errors

**Issue**: GitHub Pages 404
- Check homepage URL in package.json
- Ensure gh-pages branch exists
- Wait 5-10 minutes for deployment

**Issue**: Mobile layout broken
- Check viewport meta tag
- Test responsive breakpoints
- Verify touch events work

---

## Success Criteria
✅ Game fully playable without bugs  
✅ All three AI difficulties working  
✅ Arcade aesthetic throughout  
✅ Smooth performance  
✅ Deployed to GitHub Pages  
✅ Works on all major browsers  

---

## Next Steps (Post-MVP)
1. Add sound effects
2. Implement local storage for stats
3. Add more visual themes
4. Create tutorial mode
5. Add achievement system

---

## Time Estimate
**Total Time**: 9-11 hours
- Phase 0: 30 minutes
- Phase 1: 2 hours
- Phase 2: 3 hours
- Phase 3: 2 hours
- Phase 4: 2 hours
- Phase 5: 2 hours (includes comprehensive testing)

---

## Notes for AI Implementation
When executing this plan:
1. Complete each phase before moving to the next
2. Test after each major step - run `npm test` frequently
3. Write unit tests as you implement each feature (don't wait until Phase 5)
4. Commit code frequently with clear commit messages
5. If stuck, refer to PRD for requirements
6. Prioritize functionality over perfection
7. Ask for clarification if any step is unclear
8. Run `npm start` regularly to verify the game works visually
9. Keep console open to catch any runtime errors early