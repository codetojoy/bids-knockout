# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Bids" (also known as "War-O") is a simple card game SPA where a human plays against automated players. Built with JavaScript, jQuery 3.7.1 (CDN), and Knockout JS 3.5.1 (CDN). No backend or database. Vanilla CSS, no frameworks.

See `docs/Spec.md` for technical specs and `docs/GameRules.md` for game rules and strategy details.

## Running the App

No build system or package manager. The app runs as static files served via a simple Python3 HTTP server:

```
python3 -m http.server
```

## Testing

Use Jasmine 5.11.0 (CDN, no npm) for unit tests on game logic. See `docs/Test.md` for runner instructions.

- Test runner: `tests/SpecRunner.html` (open in browser via HTTP server)
- Spec files: `tests/game.spec.js` (covers `createDeck`, `shuffleDeck`, `dealCards`, `selectBid`, `evaluateRound`, `validateGameConfig`)

## Architecture

The app follows MVVM via Knockout JS:

- **Domain layer**: JS objects/classes for game entities (Card, Player, Game, GameRound, Bid)
- **ViewModel layer**: Knockout ViewModels bound to the UI
- **View layer**: HTML with Knockout data-bindings, vanilla CSS

### Game Logic

- Deck of N numbered cards (1 to N), no suits
- Cards dealt evenly to X players and a "kitty" (prize pool)
- Each round: reveal kitty card, players bid from hand, highest bid wins the prize card's point value
- Automated player strategies: max, min, nearest, yolo

## Code Style

Use the `code-style` skill. Key points:

- 4-space indentation, no tabs
- `const` and `let` over `var`; prefer `const`
- Braces on same line (K&R style)
- All `console.log` output prefixed with `TRACER `
- Guard clauses commented with `// guard`
- Unit tests: use single `// test` comment before the act step (no arrange/act/assert)

## Skills

Four skills are defined in `.claude/skills/` and should be consulted for relevant work:

- **`architect`**: DRY, YAGNI, immutable state, unit tests are crucial, liberal logging, balance pragmatism with elegance
- **`code-style`**: 4-space indentation, `const`/`let` over `var`, K&R braces, `TRACER ` log prefix, `// guard` comments, `// test` in unit tests
- **`security-police`**: No hardcoded credentials, modern encryption, Apache 2.0 copyright headers on all source files, honor third-party licenses with attribution
- **`ux-ui-police`**: 1980s retro styling, mobile + desktop with CSS breakpoints, ARIA accessibility, dark/light themes, tooltips on inputs, Playwright E2E tests

## Current Status

Phases 1-10 are complete. See `docs/Spec.md` for the full phase list.

### What's Done

- **Phase 5** (Compliance): Copyright headers, SRI hashes, third-party attribution, tooltips, `:focus-visible`, broken link fix
- **Phase 6** (Testing): Jasmine test suite (19 specs), `validateGameConfig()` extracted to `game.js` to eliminate DRY violation, `docs/Test.md`
- **Phase 7** (Config Refactoring): Config form uses "cards per hand" instead of "cards in deck"; deck size computed automatically; default 3 opponents (Mozart, Chopin, Brahms)
- **Phase 8** (Accessibility & Responsiveness): ARIA attributes (`aria-label`, `aria-live`, `role="alert"`), responsive CSS breakpoints (768px, 480px)
- **Phase 9** (Game Play): Game-over screen declares winner with points and rounds won; final standings for all players sorted by points; `roundsWon` tracking added to player objects
- **Phase 10** (Reveal/Hide): Kitty and opponent cards hidden by default (solid dark face-down); Reveal/Hide toggle button with dynamic text and ARIA label; prize card and human hand always visible; state resets on new game

### What Remains

- **Phase TBA**: CSS custom properties, dark/light theme, 1980s retro aesthetic
- **Phase TBD**: Remaining AI strategies (max, min, nearest)
- **Phase TBA**: Playwright E2E tests

## Hooks

A PostToolUse hook runs `./resources/my-edit-logger.sh` after Edit/Write operations, logging file changes to `./resources/files-audit.log` (gitignored).
