import { MONEY_LADDER, SAFE_HAVEN_LEVELS } from "@/game";

export const ANSWER_LETTERS = ["A", "B", "C", "D"];

export const LADDER_STEPS = MONEY_LADDER.map((amount, index) => ({
  amount,
  level: index + 1,
  isSafeHaven: SAFE_HAVEN_LEVELS.some((level) => level === index + 1),
})).reverse();
