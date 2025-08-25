# Classic Arcade Tic-Tac-Toe

A retro arcade-style Tic-Tac-Toe game built with React, featuring an AI opponent with three difficulty levels.

## Features

- 🎮 Classic arcade aesthetic with neon colors and retro fonts
- 🤖 Three AI difficulty levels:
  - **Easy**: Makes random moves
  - **Medium**: Strategic gameplay with occasional mistakes
  - **Hard**: Unbeatable AI using the Minimax algorithm
- ✨ Smooth animations and visual effects
- 📱 Fully responsive design for desktop and mobile
- 🎯 Clean, intuitive interface

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Game

Start the development server:
```bash
npm start
```

The game will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

## How to Play

1. You play as **X**, the computer plays as **O**
2. Select your difficulty level (Easy, Medium, or Hard)
3. Click on any empty cell to make your move
4. Try to get three in a row horizontally, vertically, or diagonally
5. Click "NEW GAME" to start over

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Technologies Used

- React 18
- CSS3 with custom animations
- Jest for testing
- Minimax algorithm for AI

## Project Structure

```
src/
├── components/     # React components
├── styles/        # CSS styling
├── utils/         # Game logic and AI
└── tests/         # Test files
```

## License

MIT