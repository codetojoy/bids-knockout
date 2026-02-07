function BidsViewModel() {
    const self = this;

    self.newGame = function () {
        console.log("TRACER newGame clicked");
    };

    self.reveal = function () {
        console.log("TRACER reveal clicked");
    };

    self.config = function () {
        console.log("TRACER config clicked");
    };
}

$(document).ready(function () {
    const viewModel = new BidsViewModel();
    ko.applyBindings(viewModel);
});
