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

describe("createDeck", function () {
    it("should return an array of numbers from 1 to N", function () {
        // test
        const deck = createDeck(5);

        expect(deck).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return a single-card deck when given 1", function () {
        // test
        const deck = createDeck(1);

        expect(deck).toEqual([1]);
    });

    it("should return an empty deck when given 0", function () {
        // test
        const deck = createDeck(0);

        expect(deck).toEqual([]);
    });
});

describe("shuffleDeck", function () {
    it("should return an array of the same length", function () {
        const deck = createDeck(8);

        // test
        const shuffled = shuffleDeck(deck);

        expect(shuffled.length).toBe(8);
    });

    it("should contain all the same elements", function () {
        const deck = createDeck(8);

        // test
        const shuffled = shuffleDeck(deck);

        expect(shuffled.slice().sort()).toEqual(deck.slice().sort());
    });

    it("should not modify the original deck", function () {
        const deck = createDeck(8);
        const original = deck.slice();

        // test
        shuffleDeck(deck);

        expect(deck).toEqual(original);
    });
});

describe("dealCards", function () {
    it("should deal evenly to players and kitty", function () {
        const deck = [1, 2, 3, 4, 5, 6];

        // test
        const result = dealCards(deck, 2);

        expect(result.hands.length).toBe(2);
        expect(result.hands[0].length).toBe(2);
        expect(result.hands[1].length).toBe(2);
        expect(result.kitty.length).toBe(2);
    });

    it("should include all cards from the deck", function () {
        const deck = [1, 2, 3, 4, 5, 6];

        // test
        const result = dealCards(deck, 2);

        const allCards = result.hands.flat().concat(result.kitty).sort();
        expect(allCards).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should deal cards in order from the deck", function () {
        const deck = [10, 20, 30, 40, 50, 60];

        // test
        const result = dealCards(deck, 2);

        expect(result.hands[0]).toEqual([10, 20]);
        expect(result.hands[1]).toEqual([30, 40]);
        expect(result.kitty).toEqual([50, 60]);
    });
});

describe("selectBid", function () {
    it("should return a card that exists in the hand", function () {
        const hand = [3, 7, 12];

        // test
        const bid = selectBid(hand);

        expect(hand).toContain(bid);
    });

    it("should return the only card when hand has one card", function () {
        const hand = [5];

        // test
        const bid = selectBid(hand);

        expect(bid).toBe(5);
    });
});

describe("evaluateRound", function () {
    it("should return the index of the highest bid", function () {
        const bids = [
            { playerIndex: 0, card: 3 },
            { playerIndex: 1, card: 7 },
            { playerIndex: 2, card: 5 }
        ];

        // test
        const winnerIndex = evaluateRound(bids);

        expect(winnerIndex).toBe(1);
    });

    it("should return the first highest bid on a tie", function () {
        const bids = [
            { playerIndex: 0, card: 5 },
            { playerIndex: 1, card: 5 },
        ];

        // test
        const winnerIndex = evaluateRound(bids);

        expect(winnerIndex).toBe(0);
    });

    it("should handle a single bid", function () {
        const bids = [
            { playerIndex: 0, card: 10 }
        ];

        // test
        const winnerIndex = evaluateRound(bids);

        expect(winnerIndex).toBe(0);
    });
});

describe("validateGameConfig", function () {
    it("should return valid for a correct configuration", function () {
        // test
        const result = validateGameConfig(4, 3);

        expect(result.valid).toBe(true);
        expect(result.error).toBe("");
    });

    it("should reject zero opponents", function () {
        // test
        const result = validateGameConfig(4, 0);

        expect(result.valid).toBe(false);
        expect(result.error).toContain("positive numbers");
    });

    it("should reject zero cards per hand", function () {
        // test
        const result = validateGameConfig(0, 1);

        expect(result.valid).toBe(false);
        expect(result.error).toContain("positive numbers");
    });

    it("should reject NaN input", function () {
        // test
        const result = validateGameConfig("abc", 1);

        expect(result.valid).toBe(false);
    });

    it("should accept string numbers", function () {
        // test
        const result = validateGameConfig("4", "3");

        expect(result.valid).toBe(true);
    });
});
