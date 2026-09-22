import { Lifeline } from "./types";

export const MONEY_LADDER = [
  100, 200, 300, 500, 1_000, 2_000, 3_000, 4_000, 5_000, 7_500, 10_000, 12_500, 15_000, 17_500,
  20_001,
] as const;

export const TOTAL_LEVELS = MONEY_LADDER.length;

export const SAFE_HAVEN_LEVELS = [5, 10] as const;

export const ANSWERS_PER_QUESTION = 4;

export const ALL_LIFELINES = [Lifeline.FiftyFifty, Lifeline.PhoneFriend, Lifeline.AskAudience];

export const ANSWER_TIME_MS = 40_000;
export const ANSWER_REVEAL_DELAY_MS = 1_500;
