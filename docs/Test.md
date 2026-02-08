---
name: Test
description: How to run the test suite.
---

### Test Runner

Tests use [Jasmine 5.11.0](https://jasmine.github.io/) loaded from CDN. No npm or build step required.

### Running Tests

1. Start the HTTP server from the project root:

```
python3 -m http.server
```

2. Open the test runner in a browser:

```
http://localhost:8000/tests/SpecRunner.html
```

### Test Files

| File | Covers |
|------|--------|
| `tests/game.spec.js` | `createDeck`, `shuffleDeck`, `dealCards`, `selectBid`, `evaluateRound`, `validateGameConfig` |

### Adding Tests

1. Create a new `.spec.js` file in the `tests/` directory.
2. Add a `<script>` tag for it in `tests/SpecRunner.html` after the existing spec files.
