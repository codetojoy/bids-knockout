---
name: Spec
description: Technical Specification for the app.
---

### Summary

This is a simple app, called "Bids", in SPA web page that allows a human to play a simple card game against automated players.

### Rules

See @docs/Rules.md for the rules and example of the game.

### Technical Specs

* The app should use Javascript, jQuery 3.7.1 (from CDN), and Knockout JS 3.5.1 (from CDN).
* The code should have JS objects/classes for domain entities, ViewModel entities, etc.
* Use the code-style skill for code formatting.
* Use vanilla CSS with no frameworks.
* Use Jasmine for unit-tests of any game logic.
* Currently, there is no back-end or database in the application.
* The entire app does not need to exist in one file; certainly CSS and JS can be partitioned into multiple files. If necessary, we can run the app via a Bash script that runs a simple HTTP server in Python3.

### Phase 1: TODO list

* TODO: create a initial webpage for the app
* TODO: create a left nav on the page 
* TODO: create a button "New Game" in left nav
    * for now, it just logs to the console
* TODO: create a button "Reveal" in the left nav
    * for now, it just logs to the console
* TODO: create a button "Config" in the left nav
    * for now, it just logs to the console

