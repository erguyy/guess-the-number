
let secretNumber = 0;
let attempts = 0;


const startBtn = document.getElementById('startBtn');
const gameForm = document.getElementById('gameForm');
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const attemptCount = document.getElementById('attemptCount');


startBtn.addEventListener('click', function() {
    startGame();
});


gameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    makeGuess();
});


function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    
    startBtn.style.display = 'none';
    gameForm.style.display = 'block';
    message.style.display = 'none';
    guessInput.value = '';
    attemptCount.textContent = '0';
    guessInput.focus();
}


function makeGuess() {
    const userGuess = parseInt(guessInput.value);
    
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert('Zadej číslo od 1 do 100!');
        return;
    }

    attempts++;
    attemptCount.textContent = attempts;

    
    if (userGuess < secretNumber) {
        message.textContent = 'Safryš, přidej!';
        message.style.display = 'block';
    } else if (userGuess > secretNumber) {
        message.textContent = 'Safryš, uber!';
        message.style.display = 'block';
    } else {
        message.textContent = 'Skvělě Mistře!!! ' + 'tajné číslo je ' + secretNumber;
        message.style.display = 'block';
        guessInput.disabled = true;
    }

    guessInput.value = '';
    guessInput.focus();
}