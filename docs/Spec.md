---
name: Spec
description: Technical Specification for the app.
---

### Summary

This is a simple app, called "Bids", in SPA web page that allows a human to play a simple card game against automated players.

### Rules

See @docs/GameRules.md for the rules and example of the game.

### Technical Specs

* The app should use Javascript, jQuery 3.7.1 (from CDN), and Knockout JS 3.5.1 (from CDN).
* The code should have JS objects/classes for domain entities, ViewModel entities, etc.
* Use the code-style skill for code formatting.
* Use vanilla CSS with no frameworks.
* Use Jasmine for unit-tests of any game logic.
* Currently, there is no back-end or database in the application.
* The entire app does not need to exist in one file; certainly CSS and JS can be partitioned into multiple files. If necessary, we can run the app via a Bash script that runs a simple HTTP server in Python3.

### Phase 1: TODO list

* COMPLETE: create a initial webpage for the app
* COMPLETE: create a left nav on the page
* COMPLETE: create a button "New Game" in left nav
    * for now, it just logs to the console
* COMPLETE: create a button "Reveal" in the left nav
    * for now, it just logs to the console
* COMPLETE: create a button "Config" in the left nav
    * for now, it just logs to the console

### Phase 2: TODO list

* COMPLETE: on click for Config button, display a form which allows user to enter:
    * num cards-in-deck
    * num players
    * configurable name for each player
* COMPLETE: on Config display, create a "Save" button. When clicked:
    * validate this:
        * num-cards-in-deck % (num-players + 1) == 0
        * that is, we must be able to deal, evenly, the cards to the players plus the kitty
    * if valid, then return to the main display

### Phase 3: TODO list

* COMPLETE: on click for New Game button:
    * confirm valid values for num-cards-in-deck
    * shuffle the deck
    * evenly distribute/deal the cards to the players and the kitty
    * display the kitty and the players with their respective hand
    * a card can be a simple button for now
    * also for now, a card can show its value, so the user can see the players' hands and the kitty
    * display a "prize area" where the next kitty card will go
    * display a "Go" button which simply logs click to the console

### Phase 4: TODO list

* COMPLETE: play one round of the game
    * assume New Game button is clicked and cards are dealt
    * place random card from the kitty into the current-prize area
    * allow user to click on card in order to make a bid
        * call other players to receive their bid, providing them with the value of the current kitty card
        * evaluate bids and determine the winner of the current-prize card
        * update display
            * show points totals for all players
            * display who won this round, with their winning bid and the value of the prize-card
            * remove the cards played in this round from the display
            * repeat the cycle by dealing a new card from the kitty into the prize-area

### Phase 5: TODO list (Compliance & Quick Wins)

* COMPLETE: add Apache 2.0 copyright headers to all source files (`index.html`, `app.js`, `game.js`, `app.css`)
* COMPLETE: add SRI integrity hashes to CDN script tags for jQuery and Knockout
* COMPLETE: add third-party attribution for jQuery (MIT) and Knockout (MIT)
* COMPLETE: add tooltips (`title` attributes) to input fields
* COMPLETE: add `:focus-visible` styles for keyboard navigation
* COMPLETE: fix broken README link: `Rules.md` should be `GameRules.md`

### Phase 6: TODO list (Testing)

* COMPLETE: set up Jasmine test runner and spec files for `game.js` functions (`createDeck`, `shuffleDeck`, `dealCards`, `selectBid`, `evaluateRound`)
* COMPLETE: extract shared validation logic from `newGame()` and `saveConfig()` to eliminate DRY violation
* COMPLETE: create `./docs/Test.md` with test runner instructions

### Phase 7: TODO list

* COMPLETE: refactor Config form to have "number of cards per hand" rather than "number of cards in deck"
* COMPLETE: refactor JS code to compute "number of cards in deck" as the multiple of "number of cards per hand" (where multiple is clearly num-players + 1 for kitty)
* COMPLETE: refactor Config initial state so that there are 3 automated players with names Mozart, Chopin, and Brahms

### Phase 8: TODO list (Accessibility & Responsiveness)

* COMPLETE: add ARIA attributes: labels on buttons, `aria-live` on game status regions, `role="alert"` on error messages
* COMPLETE: add CSS media queries and responsive breakpoints for mobile

### Phase 9: TODO list (game play)

* COMPLETE: After last round is played, display a section declaring the winner, along with total points and number of rounds won.
* COMPLETE: Also list the other players with their respective points and number of rounds won.
* COMPLETE: Since "number of rounds won" is new, introduce this into the rest of the code where necessary (for tracking).

### Phase 10: TODO list

* COMPLETE: For initial state of the game, alter the UI so that the card values of the kitty and hands of automated players are hidden. For now the cards can simply be solid colors.
* COMPLETE: Of course, the current prize card and human user's hand is always viewable.
* COMPLETE: If Reveal button is clicked, then display all card values and change the Reveal button text to "Hide".
* COMPLETE: If Reveal button is in Hide mode and clicked, then hide card values according to the original rule above (kitty, hands of automated players).

### Phase 11: TODO list

* COMPLETE: Implement player strategies:
    * Max: play maximum card in hand
    * Min: play minimum card in hand
    * Random: play random card from hand
    * Nearest: play nearest card (to prize card) in hand
* COMPLETE: Alter game state so that automated players are assigned a strategy (fixed for now).
* COMPLETE: By default, use these assignments:
    * Mozart uses Max strategy
    * Chopin uses Min strategy
    * Brahms uses Nearest strategy
* COMPLETE: Create Jasmine tests to verify/confirm each strategy type

### Phase TBA: TODO list (Theming)

* refactor hardcoded colors to CSS custom properties
* add dark/light theme support with `prefers-color-scheme` and a manual toggle
* apply 1980s retro aesthetic: pixel/monospace fonts, CRT glow effects, retro color palette

### Phase TBD: TODO list (Game Features)

* COMPLETE: implement remaining AI strategies: max, min, nearest
* COMPLETE: implement the `reveal()` function

### Phase TBA: TODO list (E2E Tests)

* add Playwright tests for core user flows