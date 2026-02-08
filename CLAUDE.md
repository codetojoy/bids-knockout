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

## Skills

Three review skills are defined in `.claude/skills/` and should be consulted for relevant work:

- **`architect`**: DRY, YAGNI, immutable state, unit tests are crucial, liberal logging, balance pragmatism with elegance
- **`security-police`**: No hardcoded credentials, modern encryption, Apache 2.0 copyright headers on all source files, honor third-party licenses with attribution
- **`ux-ui-police`**: 1980s retro styling, mobile + desktop with CSS breakpoints, ARIA accessibility, dark/light themes, tooltips on inputs, Playwright E2E tests

## Current Status

Phases 1-4 are complete (basic UI, config, dealing, one round of play). See `docs/Spec.md` for the full phase list.

### Milestone Review Findings (Post Phase 4)

A cross-cutting review identified these gaps, now tracked as phases 5-10 in `docs/Spec.md`:

- **Security**: Missing copyright headers, SRI hashes on CDN scripts, third-party attribution
- **UX/UI**: No ARIA attributes, no responsive breakpoints, no dark/light theme, no retro styling, no tooltips, no `:focus-visible` styles
- **Architecture**: Zero test coverage (Jasmine spec'd but not set up), DRY violation in validation logic (`newGame`/`saveConfig`), only 1 of 4 AI strategies implemented, `reveal()` is a stub

## Hooks

A PostToolUse hook runs `./resources/my-edit-logger.sh` after Edit/Write operations, logging file changes to `./resources/files-audit.log` (gitignored).
