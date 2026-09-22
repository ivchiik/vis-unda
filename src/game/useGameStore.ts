import { create } from "zustand";

import {
  ALL_LIFELINES,
  ANSWER_REVEAL_DELAY_MS,
  ANSWER_TIME_MS,
  MONEY_LADDER,
  TOTAL_LEVELS,
} from "./constants";
import { getGuaranteedAmount } from "./getGuaranteedAmount";
import { prepareQuestions } from "./prepareQuestions";
import { Lifeline } from "./types";
import type { GameStatus, Question } from "./types";

interface GameState {
  status: GameStatus;
  questions: Question[];
  currentIndex: number;
  usedLifelines: Lifeline[];
  hiddenAnswerIndexes: number[];
  phoneFriendIndex: number | null;
  audiencePercentages: number[] | null;
  submittedAnswerIndex: number | null;
  isTimedOut: boolean;
  deadlineAt: number;
  revealedAt: number;
  wonAmount: number;
  startGame: (questions: Question[]) => boolean;
  answer: (answerIndex: number) => boolean;
  advance: () => void;
  expire: () => void;
  useLifeline: (lifeline: Lifeline) => boolean;
  walkAway: () => void;
  reset: () => void;
}

const QUESTION_STATE = {
  hiddenAnswerIndexes: [] as number[],
  phoneFriendIndex: null as number | null,
  audiencePercentages: null as number[] | null,
  submittedAnswerIndex: null as number | null,
  isTimedOut: false,
  revealedAt: 0,
};

const INITIAL_STATE = {
  ...QUESTION_STATE,
  status: "idle" as GameStatus,
  questions: [] as Question[],
  currentIndex: 0,
  usedLifelines: [] as Lifeline[],
  wonAmount: 0,
  deadlineAt: 0,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...INITIAL_STATE,

  startGame: (bank) => {
    const questions = prepareQuestions(bank);
    if (!questions) return false;
    set({
      ...INITIAL_STATE,
      status: "playing",
      questions,
      deadlineAt: Date.now() + ANSWER_TIME_MS,
    });
    return true;
  },

  answer: (answerIndex) => {
    get().expire();
    const { status, questions, currentIndex, hiddenAnswerIndexes } = get();
    if (
      status !== "playing" ||
      !Number.isInteger(answerIndex) ||
      answerIndex < 0 ||
      answerIndex >= questions[currentIndex].answers.length ||
      hiddenAnswerIndexes.includes(answerIndex)
    )
      return false;

    const isCorrect = questions[currentIndex].correctIndex === answerIndex;
    set({
      status: "revealed",
      submittedAnswerIndex: answerIndex,
      revealedAt: Date.now(),
      wonAmount: isCorrect ? MONEY_LADDER[currentIndex] : getGuaranteedAmount(currentIndex),
    });
    return isCorrect;
  },

  advance: () => {
    const { status, questions, currentIndex, submittedAnswerIndex, revealedAt } = get();
    if (status !== "revealed" || Date.now() - revealedAt < ANSWER_REVEAL_DELAY_MS) return;
    if (submittedAnswerIndex !== questions[currentIndex].correctIndex) {
      set({ status: "lost" });
    } else if (currentIndex === TOTAL_LEVELS - 1) {
      set({ status: "won" });
    } else {
      set({
        ...QUESTION_STATE,
        status: "playing",
        currentIndex: currentIndex + 1,
        deadlineAt: Date.now() + ANSWER_TIME_MS,
      });
    }
  },

  expire: () => {
    const { status, currentIndex, deadlineAt } = get();
    if (status !== "playing" || Date.now() < deadlineAt) return;
    set({
      status: "revealed",
      isTimedOut: true,
      submittedAnswerIndex: null,
      revealedAt: Date.now(),
      wonAmount: getGuaranteedAmount(currentIndex),
    });
  },

  useLifeline: (lifeline) => {
    get().expire();
    const { status, usedLifelines, questions, currentIndex, hiddenAnswerIndexes } = get();
    if (
      status !== "playing" ||
      usedLifelines.includes(lifeline) ||
      !ALL_LIFELINES.includes(lifeline)
    )
      return false;
    const question = questions[currentIndex];
    const available = question.answers
      .map((_, index) => index)
      .filter((index) => !hiddenAnswerIndexes.includes(index));
    const wrong = available.filter((index) => index !== question.correctIndex);
    const next: Partial<GameState> = { usedLifelines: [...usedLifelines, lifeline] };
    if (lifeline === Lifeline.FiftyFifty) {
      const remaining = wrong[Math.floor(Math.random() * wrong.length)];
      next.hiddenAnswerIndexes = wrong.filter((index) => index !== remaining);
    } else {
      const accuracy = 0.9 - currentIndex * 0.025;
      const suggestion =
        Math.random() < accuracy
          ? question.correctIndex
          : wrong[Math.floor(Math.random() * wrong.length)];
      if (lifeline === Lifeline.PhoneFriend) next.phoneFriendIndex = suggestion;
      else {
        const votes = question.answers.map(() => 0);
        for (let vote = 0; vote < 100; vote += 1) {
          const choice =
            Math.random() < 0.55
              ? suggestion
              : available[Math.floor(Math.random() * available.length)];
          votes[choice] += 1;
        }
        next.audiencePercentages = votes;
      }
    }
    set(next);
    return true;
  },

  walkAway: () => {
    get().expire();
    const { status, questions, currentIndex, submittedAnswerIndex } = get();
    const isCorrectReveal =
      status === "revealed" && submittedAnswerIndex === questions[currentIndex].correctIndex;
    if (status !== "playing" && !isCorrectReveal) return;
    set({ status: isCorrectReveal && currentIndex === TOTAL_LEVELS - 1 ? "won" : "walked_away" });
  },

  reset: () => set({ ...INITIAL_STATE }),
}));
