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

function createDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < cardValue.length; j++) {
            let card = {
                suit: suits[i],
                value: cardValue[j]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[i];
        deck[i] = deck[swapIdx];
        deck[swapIdx] = tmp;
    }
}

function getNextCard() {
    return deck.shift();
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getNumericValue(card) {
    switch (card.value) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;

    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getNumericValue(card);
        if (card.value === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScore() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

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
            textArea.innerText += "It's a Tie!!";
        }

    }

}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome To BlackJack!!!";
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
        if (playerWon) {
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
// for (let i = 0; i < deck.length; i++) {
//     console.log(deck[i]);
// }

// console.log("Welcome to BlackJack!");
// console.log("You are dealt:");
// console.log(getCardString(playerCards[0]));
// console.log(getCardString(playerCards[1]));