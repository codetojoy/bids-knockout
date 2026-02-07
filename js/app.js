function BidsViewModel() {
    const self = this;

    self.currentView = ko.observable("main");
    self.numCardsInDeck = ko.observable(9);
    self.numPlayers = ko.observable(2);
    self.players = ko.observableArray([]);
    self.validationError = ko.observable("");

    self.kitty = ko.observableArray([]);
    self.gamePlayers = ko.observableArray([]);
    self.prizeCard = ko.observable(null);

    const defaultNames = ["Chopin", "Mozart"];

    function buildPlayers(count) {
        const current = self.players();
        if (count > current.length) {
            for (let i = current.length; i < count; i++) {
                const defaultName = defaultNames[i] || ("Player " + (i + 1));
                self.players.push({ name: ko.observable(defaultName) });
            }
        } else if (count < current.length) {
            self.players.splice(count);
        }
    }

    buildPlayers(self.numPlayers());

    self.numPlayers.subscribe(function (val) {
        const count = parseInt(val, 10);
        if (!isNaN(count) && count >= 0) {
            buildPlayers(count);
        }
    });

    self.newGame = function () {
        console.log("TRACER newGame clicked");
        const cards = parseInt(self.numCardsInDeck(), 10);
        const players = parseInt(self.numPlayers(), 10);

        if (isNaN(cards) || isNaN(players) || players < 1 || cards < 1) {
            // guard
            return;
        }

        if (cards % (players + 1) !== 0) {
            // guard
            return;
        }

        const deck = createDeck(cards);
        const shuffled = shuffleDeck(deck);
        const deal = dealCards(shuffled, players);

        self.kitty(deal.kitty);
        self.prizeCard(null);

        const gamePlayerList = deal.hands.map(function (hand, i) {
            const name = self.players()[i] ? self.players()[i].name() : ("Player " + (i + 1));
            return { name: name, hand: ko.observableArray(hand) };
        });
        self.gamePlayers(gamePlayerList);

        console.log("TRACER newGame: kitty=" + JSON.stringify(deal.kitty) +
            " players=" + JSON.stringify(gamePlayerList.map(function (p) {
                return { name: p.name, hand: p.hand() };
            })));

        self.currentView("game");
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
        const cards = parseInt(self.numCardsInDeck(), 10);
        const players = parseInt(self.numPlayers(), 10);

        if (isNaN(cards) || isNaN(players) || players < 1 || cards < 1) {
            self.validationError("Cards in deck and number of players must be positive numbers.");
            return;
        }

        if (cards % (players + 1) !== 0) {
            self.validationError(
                "Cards in deck (" + cards + ") must be evenly divisible by " +
                "number of players + 1 for the kitty (" + (players + 1) + ")."
            );
            return;
        }

        const playerNames = self.players().map(function (p) { return p.name(); });
        console.log("TRACER config saved: numCardsInDeck=" + cards +
            " numPlayers=" + players + " players=" + JSON.stringify(playerNames));

        self.validationError("");
        self.currentView("main");
    };

    self.go = function () {
        console.log("TRACER go clicked");
    };
}

$(document).ready(function () {
    const viewModel = new BidsViewModel();
    ko.applyBindings(viewModel);
});
