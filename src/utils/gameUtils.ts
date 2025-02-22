import type { SuitType, RankType, Combinations } from "../types/common";
import { Hand } from "pokersolver";

const suits: SuitType[] = ["♠", "♥", "♦", "♣"];
const ranks: RankType[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const handRankings: Combinations[] = [
  "Royal Flush",
  "Straight Flush",
  "Four of a Kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of a Kind",
  "Two Pair",
  "Pair",
  "High Card",
];

export const generateRandomHand = () => {
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
  Hand.solve(hand.map((card) => `${card.rank}${card.suit[0].toLowerCase()}`))
    .name;

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
