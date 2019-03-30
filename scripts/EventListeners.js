newGame.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    gameTie = false;

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