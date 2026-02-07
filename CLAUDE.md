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

Use Jasmine for unit tests on game logic (domain objects, strategies, etc.).

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

## Hooks

A PostToolUse hook runs `./resources/my-edit-logger.sh` after Edit/Write operations, logging file changes to `./resources/files-audit.log` (gitignored).
