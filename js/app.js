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

function BidsViewModel() {
    const self = this;

    self.currentView = ko.observable("main");
    self.numCardsPerHand = ko.observable(4);
    self.numOpponents = ko.observable(3);
    self.opponents = ko.observableArray([]);
    self.validationError = ko.observable("");

    self.kitty = ko.observableArray([]);
    self.humanPlayer = ko.observable(null);
    self.gamePlayers = ko.observableArray([]);
    self.prizeCard = ko.observable(null);
    self.roundActive = ko.observable(false);
    self.roundResult = ko.observable(null);
    self.gameOver = ko.observable(false);
    self.finalStandings = ko.observableArray([]);

    const defaultNames = ["Mozart", "Chopin", "Brahms"];

    function buildOpponents(count) {
        const current = self.opponents();
        if (count > current.length) {
            for (let i = current.length; i < count; i++) {
                const defaultName = defaultNames[i] || ("Opponent " + (i + 1));
                self.opponents.push({ name: ko.observable(defaultName) });
            }
        } else if (count < current.length) {
            self.opponents.splice(count);
        }
    }

    buildOpponents(self.numOpponents());

    self.numOpponents.subscribe(function (val) {
        const count = parseInt(val, 10);
        if (!isNaN(count) && count >= 0) {
            buildOpponents(count);
        }
    });

    function totalPlayers() {
        return parseInt(self.numOpponents(), 10) + 1;
    }

    self.newGame = function () {
        console.log("TRACER newGame clicked");
        const result = validateGameConfig(self.numCardsPerHand(), self.numOpponents());

        if (!result.valid) {
            // guard
            return;
        }

        const cardsPerHand = parseInt(self.numCardsPerHand(), 10);
        const opponents = parseInt(self.numOpponents(), 10);
        const players = opponents + 1;
        const cards = cardsPerHand * (players + 1);

        const deck = createDeck(cards);
        const shuffled = shuffleDeck(deck);
        const deal = dealCards(shuffled, players);

        self.kitty(deal.kitty);
        self.prizeCard(null);
        self.roundActive(false);
        self.roundResult(null);
        self.gameOver(false);

        self.finalStandings([]);

        const human = {
            name: "You",
            hand: ko.observableArray(deal.hands[0]),
            points: ko.observable(0),
            roundsWon: ko.observable(0),
            isHuman: true
        };
        self.humanPlayer(human);

        const opponentList = [];
        for (let i = 1; i < players; i++) {
            const name = self.opponents()[i - 1] ? self.opponents()[i - 1].name() : ("Opponent " + i);
            opponentList.push({
                name: name,
                hand: ko.observableArray(deal.hands[i]),
                points: ko.observable(0),
                roundsWon: ko.observable(0),
                isHuman: false
            });
        }
        self.gamePlayers(opponentList);

        const allPlayers = [human].concat(opponentList);
        console.log("TRACER newGame: kitty=" + JSON.stringify(deal.kitty) +
            " players=" + JSON.stringify(allPlayers.map(function (p) {
                return { name: p.name, hand: p.hand() };
            })));

        self.currentView("game");
    };

    self.go = function () {
        console.log("TRACER go clicked");

        if (self.kitty().length === 0) {
            // guard
            return;
        }

        const kittyCards = self.kitty();
        const prize = kittyCards[0];
        self.kitty(kittyCards.slice(1));
        self.prizeCard(prize);
        self.roundResult(null);
        self.roundActive(true);

        console.log("TRACER revealed prize card: " + prize);
    };

    self.humanBid = function (card) {
        if (!self.roundActive()) {
            // guard
            return;
        }

        console.log("TRACER human bid: " + card);

        const prize = self.prizeCard();
        const human = self.humanPlayer();
        const opponents = self.gamePlayers();
        const allPlayers = [human].concat(opponents);
        const bids = [];

        bids.push({ playerIndex: 0, card: card });

        opponents.forEach(function (player, i) {
            const aiCard = selectBid(player.hand());
            bids.push({ playerIndex: i + 1, card: aiCard });
        });

        console.log("TRACER bids: " + JSON.stringify(bids.map(function (b) {
            return { player: allPlayers[b.playerIndex].name, card: b.card };
        })));

        const winnerBidIndex = evaluateRound(bids);
        const winnerBid = bids[winnerBidIndex];
        const winner = allPlayers[winnerBid.playerIndex];

        winner.points(winner.points() + prize);
        winner.roundsWon(winner.roundsWon() + 1);

        bids.forEach(function (bid) {
            allPlayers[bid.playerIndex].hand.remove(bid.card);
        });

        const bidSummary = bids.map(function (b) {
            return allPlayers[b.playerIndex].name + " bid " + b.card;
        }).join(", ");

        self.roundResult(winner.name + " wins with bid " + winnerBid.card +
            ", earning " + prize + " pts (" + bidSummary + ")");

        console.log("TRACER round result: " + self.roundResult());

        self.roundActive(false);

        if (self.kitty().length === 0) {
            self.gameOver(true);
            const standings = allPlayers.slice().sort(function (a, b) {
                return b.points() - a.points();
            });
            self.finalStandings(standings.map(function (p) {
                return { name: p.name, points: p.points(), roundsWon: p.roundsWon() };
            }));
            console.log("TRACER game over: " + JSON.stringify(self.finalStandings()));
        }
    };

    self.reveal = function () {
        console.log("TRACER reveal clicked");
    };

    self.config = function () {
        console.log("TRACER config clicked");
        self.validationError("");
        self.currentView("config");
    };

    self.saveConfig = function () {
        console.log("TRACER saveConfig clicked");
        const result = validateGameConfig(self.numCardsPerHand(), self.numOpponents());

        if (!result.valid) {
            self.validationError(result.error);
            return;
        }

        const opponentNames = self.opponents().map(function (p) { return p.name(); });
        console.log("TRACER config saved: numCardsPerHand=" + self.numCardsPerHand() +
            " numOpponents=" + self.numOpponents() + " opponents=" + JSON.stringify(opponentNames));

        self.validationError("");
        self.currentView("main");
    };
}

$(document).ready(function () {
    const viewModel = new BidsViewModel();
    ko.applyBindings(viewModel);
});
