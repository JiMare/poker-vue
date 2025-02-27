import { handRankings, ranks, suits } from "../constants";
import type { SuitType, RankType, CardType } from "../types/common";
import { Hand } from "pokersolver";

const getRandomCorrectAnswer = () => {
  const randomIndex = Math.floor(Math.random() * handRankings.length);
  return handRankings[randomIndex];
};

const generateRandomHand = () => {
  const usedCards = new Set();
  const hand = [];

  while (hand.length < 5) {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const cardKey = `${rank}${suit}`;

    if (!usedCards.has(cardKey)) {
      usedCards.add(cardKey);
      hand.push({ rank, suit });
    }
  }
  return hand;
};

export const getHandRanking = (hand: { rank: RankType; suit: SuitType }[]) =>
  Hand.solve(hand.map((card) => `${card.rank}${card.suit}`)).name;

export const generateHand = () => {
  const ranking = getRandomCorrectAnswer();

  let hand: CardType[] = [];

  switch (ranking) {
    case "Straight Flush": {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const startIndex = Math.floor(Math.random() * (ranks.length - 5));
      hand = ranks
        .slice(startIndex, startIndex + 5)
        .map((rank) => ({ rank, suit }));
      break;
    }
    case "Four of a Kind": {
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const otherRank = ranks.find((r) => r !== rank)!;
      hand = suits.map((suit) => ({ rank, suit }));
      hand.push({
        rank: otherRank,
        suit: suits[Math.floor(Math.random() * suits.length)],
      });
      break;
    }
    case "Full House": {
      const rank1 = ranks[Math.floor(Math.random() * ranks.length)];
      const possibleRanks = ranks.filter((r) => r !== rank1);
      const rank2 =
        possibleRanks[Math.floor(Math.random() * possibleRanks.length)];
      const shuffledSuits = [...suits].sort(() => Math.random() - 0.5);
      hand = [
        { rank: rank1, suit: shuffledSuits[0] },
        { rank: rank1, suit: shuffledSuits[1] },
        { rank: rank1, suit: shuffledSuits[2] },
        { rank: rank2, suit: shuffledSuits[0] },
        { rank: rank2, suit: shuffledSuits[3] },
      ];
      break;
    }
    case "Flush": {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const shuffledRanks = [...ranks].sort(() => Math.random() - 0.5);
      const uniqueRanks = shuffledRanks.slice(0, 5);
      hand = uniqueRanks.map((rank) => ({
        rank,
        suit,
      }));
      break;
    }
    case "Straight": {
      const startIndex = Math.floor(Math.random() * (ranks.length - 5));
      hand = ranks.slice(startIndex, startIndex + 5).map((rank) => ({
        rank,
        suit: suits[Math.floor(Math.random() * suits.length)],
      }));
      break;
    }
    case "Three of a Kind": {
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const otherRanks = ranks.filter((r) => r !== rank);
      const shuffledOtherRanks = otherRanks.sort(() => Math.random() - 0.5);
      const shuffledSuits = [...suits].sort(() => Math.random() - 0.5);
      hand = [
        { rank, suit: shuffledSuits[0] },
        { rank, suit: shuffledSuits[1] },
        { rank, suit: shuffledSuits[2] },
        { rank: shuffledOtherRanks[0], suit: shuffledSuits[0] },
        { rank: shuffledOtherRanks[1], suit: shuffledSuits[3] },
      ];
      break;
    }
    case "Two Pair": {
      const rank1 = ranks[Math.floor(Math.random() * ranks.length)];
      const remainingRanks = ranks.filter((r) => r !== rank1);
      const shuffledRanks = [...remainingRanks].sort(() => Math.random() - 0.5);
      const rank2 = shuffledRanks[0];
      const otherRank = shuffledRanks[1];

      const shuffledSuits = [...suits].sort(() => Math.random() - 0.5);
      hand = [
        { rank: rank1, suit: shuffledSuits[0] },
        { rank: rank1, suit: shuffledSuits[1] },
        { rank: rank2, suit: shuffledSuits[0] },
        { rank: rank2, suit: shuffledSuits[3] },
        { rank: otherRank, suit: shuffledSuits[2] },
      ];
      break;
    }
    case "Pair": {
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      const otherRanks = ranks.filter((r) => r !== rank);
      const shuffledRanks = [...otherRanks].sort(() => Math.random() - 0.5);

      const shuffledSuits = [...suits].sort(() => Math.random() - 0.5);
      hand = [
        { rank, suit: shuffledSuits[0] },
        { rank, suit: shuffledSuits[1] },
        { rank: shuffledRanks[0], suit: shuffledSuits[0] },
        { rank: shuffledRanks[1], suit: shuffledSuits[2] },
        { rank: shuffledRanks[2], suit: shuffledSuits[3] },
      ];
      break;
    }
    case "High Card": {
      do {
        hand = generateRandomHand();
      } while (getHandRanking(hand) !== "High Card");

      break;
    }
  }

  return hand;
};

export const generateAnswerOptions = (correctRanking: string) => {
  const filteredRankings = handRankings.filter(
    (rank) => rank !== correctRanking
  );
  const wrongOptions = filteredRankings
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  return [
    { name: correctRanking, isCorrect: true },
    ...wrongOptions?.map((option) => ({ name: option, isCorrect: false })),
  ].sort(() => 0.5 - Math.random());
};

export const getShape = (suit: SuitType) => {
  switch (suit) {
    case "s":
      return "♠";
    case "h":
      return "♥";
    case "d":
      return "♦";
    case "c":
      return "♣";
    default:
      return "?";
  }
};
