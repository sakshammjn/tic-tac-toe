const box = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGame = document.querySelector('.new-game');

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');
const box5 = document.querySelector('.box5');
const box6 = document.querySelector('.box6');
const box7 = document.querySelector('.box7');
const box8 = document.querySelector('.box8');
const box9 = document.querySelector('.box9');

let currentPlayer;
let gameGrid;

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialize the game
function initGame() {
    currentPlayer = "X";

    // gamegrid empty
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // ui empty
    box1.innerText = "";
    box2.innerText = "";
    box3.innerText = "";
    box4.innerText = "";
    box5.innerText = "";
    box6.innerText = "";
    box7.innerText = "";
    box8.innerText = "";
    box9.innerText = "";

    box1.style.pointerEvents = 'all';
    box2.style.pointerEvents = 'all';
    box3.style.pointerEvents = 'all';
    box4.style.pointerEvents = 'all';
    box5.style.pointerEvents = 'all';
    box6.style.pointerEvents = 'all';
    box7.style.pointerEvents = 'all';
    box8.style.pointerEvents = 'all';
    box9.style.pointerEvents = 'all';

    newGame.classList.remove('active');
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

    // remove green div from won cells
    box.forEach((b) => {
        b.classList.remove('win');
    })
}

initGame();

box1.addEventListener('click', () => {
    handleClick(0);
});

box2.addEventListener('click', () => {
    handleClick(1);
});

box3.addEventListener('click', () => {
    handleClick(2);
});

box4.addEventListener('click', () => {
    handleClick(3);
});

box5.addEventListener('click', () => {
    handleClick(4);
});

box6.addEventListener('click', () => {
    handleClick(5);
});

box7.addEventListener('click', () => {
    handleClick(6);
});

box8.addEventListener('click', () => {
    handleClick(7);
});

box9.addEventListener('click', () => {
    handleClick(8);
});

function handleClick(index) {
    // if nothing in that cell, then only runs
    if (gameGrid[index] === "")
    {
        // set cell to X or O
        box[index].innerText = currentPlayer; 


        // sets X and O to gameGrid to check for the winner later
        gameGrid[index] = currentPlayer;

        // pointer style when cell is not empty
        box[index].style.pointerEvents = 'none';

        // swap turn
        swapTurn();

        // check for a winner
        checkGameOver();
    }
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }

    else  {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non empty and exactly same
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] == gameGrid[position[1]])
            && (gameGrid[position[1]] == gameGrid[position[2]])) {

            // if check winner is x or o
            if (gameGrid[position[0] === "X"]) {
                answer = "X";
            }

            else {
                answer = "O";
            }

            // disable pointer event
            box.forEach((b) => {
                b.style.pointerEvents = 'none';
            })
            


            box[position[0]].classList.add('win');
            box[position[1]].classList.add('win');
            box[position[2]].classList.add('win');
        }
    })

    // we have a winner
    if (answer !== "") {
        swapTurn();
        gameInfo.innerText = `Winner Player - ${currentPlayer}`;
        newGame.classList.add('active');

        return;
    }

    // when no winner...game tied
    let fillCount = 0;

    gameGrid.forEach((b) => {
        if (b !== "") {
            fillCount ++;
        }

        // board is fill, game tied
        if (fillCount === 9) {
            gameInfo.innerText= 'Game Tied!';
            newGame.classList.add('active');
        }
    })
}

newGame.addEventListener('click', initGame);
