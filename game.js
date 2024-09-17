// Dark mode toggle
const toggleModeButton = document.getElementById("toggleMode");
toggleModeButton.addEventListener("click", function () {
    const body = document.body;
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        toggleModeButton.textContent = 'Toggle Light Mode';
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        toggleModeButton.textContent = 'Toggle Dark Mode';
    }
});

// Game logic
let lives = 3;
let caught = 0;
let timeLeft = 5; // Initial countdown time
let xVelocity = 3;
let yVelocity = 2;
let gameInterval;
let countdownTimer;
let gameInProgress = false; // Added flag to control game state

const ballot = document.getElementById('ballot');
const livesDisplay = document.getElementById('lives');
const caughtDisplay = document.getElementById('caughtCount');
const timerDisplay = document.getElementById('timer');
const gameOverDisplay = document.getElementById('gameOver');
const startGameButton = document.getElementById('startGame');
const gameContainer = document.querySelector('.game-container');

let containerWidth, containerHeight, ballotX, ballotY;

function initializeBallotPosition() {
    containerWidth = gameContainer.offsetWidth;
    containerHeight = gameContainer.offsetHeight;
    ballotX = Math.random() * (containerWidth - ballot.offsetWidth);
    ballotY = Math.random() * (containerHeight - ballot.offsetHeight);
    ballot.style.left = `${ballotX}px`;
    ballot.style.top = `${ballotY}px`;
}

// Game start
function startGame() {
    gameInProgress = true; // Set the game state to active
    lives = 3;
    caught = 0;
    timeLeft = 5;
    xVelocity = 3;
    yVelocity = 2;
    initializeBallotPosition();

    livesDisplay.innerText = `Lives: ${lives}`;
    caughtDisplay.innerText = `Caught: ${caught}`;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    gameOverDisplay.style.display = 'none';

    ballot.style.display = 'flex';
    ballot.classList.remove('explosion');
    moveBallot();
    startCountdown();

    startGameButton.disabled = true;
}

// Move the ballot around within the game container
function moveBallot() {
    gameInterval = setInterval(function () {
        ballotX += xVelocity;
        ballotY += yVelocity;

        if (ballotX <= 0 || ballotX + ballot.offsetWidth >= containerWidth) {
            xVelocity = -xVelocity;
        }
        if (ballotY <= 0 || ballotY + ballot.offsetHeight >= containerHeight) {
            yVelocity = -yVelocity;
        }

        ballot.style.left = `${ballotX}px`;
        ballot.style.top = `${ballotY}px`;
    }, 20);
}

// Timer countdown for the current ballot
function startCountdown() {
    clearInterval(countdownTimer);
    countdownTimer = setInterval(function () {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            loseLife(); // Trigger life decrement if time runs out
        }
    }, 1000);
}

// Ballot click event
ballot.addEventListener('click', function () {
    if (!gameInProgress) return; // Prevent clicking if the game is over
    caught++;
    timeLeft = Math.max(3, timeLeft - 0.5); // Decrease time, but not below 3 seconds
    xVelocity *= 1.1;
    yVelocity *= 1.1;

    caughtDisplay.innerText = `Caught: ${caught}`;
    timerDisplay.innerText = `Time Left: ${timeLeft.toFixed(1)}s`;

    // Explosion effect
    ballot.classList.add('explosion');
    setTimeout(function () {
        ballot.classList.remove('explosion');
        resetBallot();
    }, 500);
});

// Reset the ballot to a new random position
function resetBallot() {
    clearInterval(countdownTimer);
    clearInterval(gameInterval);
    initializeBallotPosition();
    moveBallot();
    timeLeft = 5; // Reset time after a ballot is caught
    timerDisplay.innerText = `Time Left: ${timeLeft}s`; // Display reset time
    startCountdown();
}

// Lose a life
function loseLife() {
    if (!gameInProgress) return; // Prevent losing life if the game is already over
    lives--;
    livesDisplay.innerText = `Lives: ${lives}`;
    if (lives === 0) {
        gameOver();
    } else {
        resetBallot(); // Always reset the ballot after losing a life
    }
}

// End the game
function gameOver() {
    gameInProgress = false; // Set the game state to not active
    clearInterval(gameInterval);
    clearInterval(countdownTimer);
    ballot.style.display = 'none';
    gameOverDisplay.style.display = 'block';
    startGameButton.disabled = false;
}

// Start game button click handler
startGameButton.addEventListener('click', startGame);
