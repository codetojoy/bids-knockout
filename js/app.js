function BidsViewModel() {
    const self = this;

    self.currentView = ko.observable("main");
    self.numCardsInDeck = ko.observable(9);
    self.numPlayers = ko.observable(2);
    self.players = ko.observableArray([]);
    self.validationError = ko.observable("");

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
}

$(document).ready(function () {
    const viewModel = new BidsViewModel();
    ko.applyBindings(viewModel);
});
