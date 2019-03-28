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