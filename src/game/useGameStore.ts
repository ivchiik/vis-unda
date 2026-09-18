import { create } from "zustand";

import { MONEY_LADDER, TOTAL_LEVELS } from "./constants";
import { getGuaranteedAmount } from "./getGuaranteedAmount";
import type { GameStatus, Lifeline, Question } from "./types";

interface GameState {
  status: GameStatus;
  questions: Question[];
  currentIndex: number;
  usedLifelines: Lifeline[];
  hiddenAnswerIndexes: number[];
  wonAmount: number;

  startGame: (questions: Question[]) => void;
  answer: (answerIndex: number) => boolean;
  useLifeline: (lifeline: Lifeline) => boolean;
  walkAway: () => void;
  reset: () => void;
}

const INITIAL_STATE = {
  status: "idle" as GameStatus,
  questions: [] as Question[],
  currentIndex: 0,
  usedLifelines: [] as Lifeline[],
  hiddenAnswerIndexes: [] as number[],
  wonAmount: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...INITIAL_STATE,

  startGame: (questions) =>
    set({ ...INITIAL_STATE, status: "playing", questions: [...questions].sort(byLevel) }),

  answer: (answerIndex) => {
    const { status, questions, currentIndex } = get();
    if (status !== "playing") return false;

    const isCorrect = questions[currentIndex]?.correctIndex === answerIndex;
    if (!isCorrect) {
      set({ status: "lost", wonAmount: getGuaranteedAmount(currentIndex) });
      return false;
    }

    const isLastLevel = currentIndex + 1 >= Math.min(TOTAL_LEVELS, questions.length);
    if (isLastLevel) {
      set({ status: "won", wonAmount: MONEY_LADDER[currentIndex] });
    } else {
      set({ currentIndex: currentIndex + 1, hiddenAnswerIndexes: [] });
    }
    return true;
  },

  useLifeline: (lifeline) => {
    const { status, usedLifelines, questions, currentIndex } = get();
    if (status !== "playing" || usedLifelines.includes(lifeline)) return false;

    const next: Partial<GameState> = { usedLifelines: [...usedLifelines, lifeline] };
    if (lifeline === "FIFTY_FIFTY") {
      const question = questions[currentIndex];
      next.hiddenAnswerIndexes = pickTwoWrongAnswers(question);
    }
    set(next);
    return true;
  },

  walkAway: () => {
    const { status, currentIndex } = get();
    if (status !== "playing") return;
    set({
      status: "walked_away",
      wonAmount: currentIndex > 0 ? MONEY_LADDER[currentIndex - 1] : 0,
    });
  },

  reset: () => set({ ...INITIAL_STATE }),
}));

const byLevel = (a: Question, b: Question) => a.level - b.level;

const pickTwoWrongAnswers = (question: Question | undefined): number[] => {
  if (!question) return [];
  const wrong = question.answers
    .map((_, index) => index)
    .filter((i) => i !== question.correctIndex);
  return wrong.sort(() => Math.random() - 0.5).slice(0, 2);
};
