const gameBoard = document.getElementById('game-board');
const movesCount = document.getElementById('moves-count');
const restartButton = document.getElementById('restart');

let cards;
let firstCard = false;
let secondCard = false;
let moves = 0;

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

function initGame() {
    moves = 0;
    movesCount.innerHTML = moves;

    const items = [...emojis, ...emojis];

    const shuffledItems = items.sort(() => Math.random() - 0.5);

    gameBoard.innerHTML = '';
    shuffledItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = item;
        card.style.display = 'none';
        card.dataset.item = item;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    cards = document.querySelectorAll('.card');
}

function flipCard() {
    if (this.classList.contains('flipped')) return;

    this.style.display = 'flex';

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesCount.innerHTML = moves;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.item === secondCard.dataset.item) {
        firstCard = false;
        secondCard = false;

        const flippedCards = document.querySelectorAll('.card[style*="display: flex"]');
        if (flippedCards.length === cards.length) {
            setTimeout(() => {
                alert(`Gratulacje! Wygrałeś w ${moves} ruchach!`);
                restartGame();
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.style.display = 'none';
            secondCard.style.display = 'none';
            firstCard = false;
            secondCard = false;
        }, 1000);
    }
}

function restartGame() {
    initGame();
}

initGame(); 