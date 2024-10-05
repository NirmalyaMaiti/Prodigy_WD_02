const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const pvpBtn = document.getElementById('pvp');
const pveBtn = document.getElementById('pve');
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let isVsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a tie!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    if (isVsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
};

const handleClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !isGameActive || (isVsAI && currentPlayer === "O")) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
};

const aiMove = () => {
    let availableCells = board
        .map((value, index) => (value === "" ? index : null))
        .filter(value => value !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    checkWinner();
};

const restartGame = () => {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    
    if (isVsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
};

const startPVP = () => {
    isVsAI = false;
    document.getElementById('mode-selection').classList.add('hidden');
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const startPVE = () => {
    isVsAI = true;
    document.getElementById('mode-selection').classList.add('hidden');
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
pvpBtn.addEventListener('click', startPVP);
pveBtn.addEventListener('click', startPVE);

