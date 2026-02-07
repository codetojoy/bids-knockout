function createDeck(numCards) {
    const deck = [];
    for (let i = 1; i <= numCards; i++) {
        deck.push(i);
    }
    return deck;
}

function shuffleDeck(deck) {
    const shuffled = deck.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function dealCards(deck, numPlayers) {
    const handSize = deck.length / (numPlayers + 1);
    const hands = [];
    for (let i = 0; i < numPlayers; i++) {
        hands.push(deck.slice(i * handSize, (i + 1) * handSize));
    }
    const kitty = deck.slice(numPlayers * handSize);
    return { hands: hands, kitty: kitty };
}

function selectBid(hand) {
    const index = Math.floor(Math.random() * hand.length);
    return hand[index];
}

function evaluateRound(bids) {
    let winnerIndex = 0;
    for (let i = 1; i < bids.length; i++) {
        if (bids[i].card > bids[winnerIndex].card) {
            winnerIndex = i;
        }
    }
    return winnerIndex;
}
