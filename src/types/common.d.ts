declare type SuitType = "s" | "h" | "d" | "c";

declare type RankType =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

declare type Combinations =
  | "Straight Flush"
  | "Four of a Kind"
  | "Full House"
  | "Flush"
  | "Straight"
  | "Three of a Kind"
  | "Two Pair"
  | "Pair"
  | "High Card";

declare type CardType = {
  rank: RankType;
  suit: SuitType;
};
