function CheckForEndOfGame() {
    updateScore();
    if (gameOver) {
        while (dealerScore < playerScore && dealerScore < 21 && playerScore < 21 && dealerCards.length < 5) {
            dealerCards.push(getNextCard());
            updateScore();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (dealerScore > playerScore) {
            playerWon = false;
        }
        else if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            gameTie = true;
        }

    }

}

function showStatus() {
    if (!gameStarted) {
      //  textArea.innerText = "Welcome To BlackJack!!!";
        return;
    }

    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + "\n";
    }

    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + "\n";
    }

    updateScore();

    textArea.innerText = "Dealer has : \n" + dealerCardString + "(Score :" + dealerScore + ") \n\n"
        + "Player has : \n" + playerCardString + "(Score :" + playerScore + ") \n\n";

    if (gameOver) {
        if(gameTie) {
            textArea.innerText += "It's a Tie!!!";
        }
        else if (playerWon) {
            textArea.innerText += "Player Won!!!";
        }
        else {
            textArea.innerText += "Dealer Won!!!";
        }

        newGame.style.display = "inline";
        hit.style.display = "none";
        stay.style.display = "none";
    }
}