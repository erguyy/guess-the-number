
let secretNumber = 0;
let attempts = 0;
let currentGuessCount = [];


const startBtn = document.getElementById('startBtn');
const gameForm = document.getElementById('gameForm');
const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const attemptCount = document.getElementById('attemptCount');
const restartBtn = document.getElementById('restartBtn');
const historyList = document.getElementById('historyList');

loadHistory();

startBtn.addEventListener('click', function() {
    startGame();
});


gameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    makeGuess();
});

restartBtn.addEventListener('click', function() {
    restartGame();
});


function startGame() {
    currentGuessCount = [];
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
    currentGuessCount.push(userGuess);
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
        saveGame();
        restartBtn.style.display = 'inline-block';
    }

    guessInput.value = '';
    guessInput.focus();

   
}

 function saveGame() {
    const game = {
        date: new Date().toLocaleString('cs-CZ'),
        secretNumber: secretNumber,
        attempts: attempts,
        guesses: currentGuessCount
    };

    let history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    history.unshift(game);
    
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('gameHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<li>Zatím žádné hry...</li>';
        return;
    }

    history.forEach(function(game) {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            ${game.date}<br>
            Tajné číslo: ${game.secretNumber} | Počet pokusů: ${game.attempts}<br>
            Tvé tipy: ${game.guesses.join(', ')}
        `;
        historyList.appendChild(li);
    });
}

 function restartGame(){
     startGame();
     guessInput.disabled = false;
     restartBtn.style.display = 'none';
    }