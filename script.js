const singlePlayerButton = document.getElementById('singlePlayer');
const multiPlayerButton = document.getElementById('multiPlayer');
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let mode;
let currentPlayer;
let isGameOver;
let board;

singlePlayerButton.addEventListener('click', () => startGame('single'));
multiPlayerButton.addEventListener('click', () => startGame('multi'));
resetButton.addEventListener('click', resetGame);

function startGame(selectedMode) {
    mode = selectedMode;
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = `${currentPlayer}'s turn`;
    createBoard();
    if (mode === 'single') {
        playComputer();
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', cellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function cellClick() {
    if (isGameOver) return;
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        this.textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (checkDraw()) {
            message.textContent = 'It\'s a draw!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `${currentPlayer}'s turn`;
            if (mode === 'single' && currentPlayer === 'O') {
                playComputer();
            }
        }
    }
}

function playComputer() {
    const emptyCells = [];
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === '') {
                emptyCells.push({ row: rowIndex, col: colIndex });
            }
        });
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    board[row][col] = 'O';
    const cell = gameBoard.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.textContent = 'O';
    if (checkWin()) {
        message.textContent = 'Computer wins!';
        isGameOver = true;
    } else if (checkDraw()) {
        message.textContent = 'It\'s a draw!';
        isGameOver = true;
    } else {
        currentPlayer = 'X';
        message.textContent = `${currentPlayer}'s turn`;
    }
}

function playComputerWithDelay() {
    setTimeout(playComputer, 1000); // Adjust delay time as needed (in milliseconds)
}


function checkWin() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    mode = null;
    currentPlayer = null;
    isGameOver = false;
    board = null;
    message.textContent = '';
    gameBoard.innerHTML = '';
}

