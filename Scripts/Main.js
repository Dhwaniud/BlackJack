//
//Dhwani Desai
//

let suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
let cardValue = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let textArea = document.getElementById("text-area");
let newGame = document.getElementById("new-game");
let hit = document.getElementById("hit");
let stay = document.getElementById("stay");

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

newGame.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffle(deck);

    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGame.style.display = "none";
    hit.style.display = "inline";
    stay.style.display = "inline";
    showStatus();
})

hit.addEventListener('click', function () {
    playerCards.push(getNextCard());
    if(playerCards.length >= 5) {
        gameOver = true;
    }
    CheckForEndOfGame();
    showStatus();
})

stay.addEventListener('click', function () {
    gameOver = true;
    CheckForEndOfGame();
    showStatus();
})
