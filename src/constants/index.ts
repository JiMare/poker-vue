import type { Combinations, RankType, SuitType } from "../types/common";

export const startTime = 100;

export const handRankings: Combinations[] = [
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

export const suits: SuitType[] = ["s", "h", "d", "c"];

export const ranks: RankType[] = [
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
