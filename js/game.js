/*
 * Copyright 2026 Michael Easter / @codetojoy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

function validateGameConfig(numCardsPerHand, numOpponents) {
    const cardsPerHand = parseInt(numCardsPerHand, 10);
    const opponents = parseInt(numOpponents, 10);

    if (isNaN(cardsPerHand) || isNaN(opponents) || opponents < 1 || cardsPerHand < 1) {
        return { valid: false, error: "Cards per hand and number of opponents must be positive numbers." };
    }

    return { valid: true, error: "" };
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
