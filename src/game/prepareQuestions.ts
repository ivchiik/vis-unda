import { ANSWERS_PER_QUESTION, TOTAL_LEVELS } from "./constants";
import type { Question } from "./types";

const isValidQuestionBank = (bank: Question[]): boolean => {
  const seenIds = new Set<string>();

  return bank.every((question) => {
    if (!question.id || seenIds.has(question.id) || !question.text.trim()) {
      return false;
    }

    const isValidLevel =
      Number.isInteger(question.level) && question.level >= 1 && question.level <= TOTAL_LEVELS;

    if (!isValidLevel) {
      return false;
    }

    const hasValidAnswers =
      question.answers.length === ANSWERS_PER_QUESTION &&
      question.answers.every((answer) => answer.trim().length > 0) &&
      new Set(question.answers).size === ANSWERS_PER_QUESTION;

    if (!hasValidAnswers) {
      return false;
    }

    const isValidCorrectIndex =
      Number.isInteger(question.correctIndex) &&
      question.correctIndex >= 0 &&
      question.correctIndex < ANSWERS_PER_QUESTION;

    if (!isValidCorrectIndex) {
      return false;
    }

    seenIds.add(question.id);
    return true;
  });
};

const pickQuestionForLevel = (bank: Question[], level: number): Question | null => {
  const candidates = bank.filter((question) => question.level === level);

  if (candidates.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};

const shuffleAnswers = (question: Question): Question => {
  const answerIndexes = question.answers.map((_, index) => index);

  for (let currentIndex = answerIndexes.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const currentAnswerIndex = answerIndexes[currentIndex];

    answerIndexes[currentIndex] = answerIndexes[randomIndex];
    answerIndexes[randomIndex] = currentAnswerIndex;
  }

  return {
    ...question,
    answers: answerIndexes.map((index) => question.answers[index]),
    correctIndex: answerIndexes.indexOf(question.correctIndex),
  };
};

export const prepareQuestions = (bank: Question[]): Question[] | null => {
  if (!isValidQuestionBank(bank)) {
    return null;
  }

  const questions: Question[] = [];

  for (let level = 1; level <= TOTAL_LEVELS; level += 1) {
    const question = pickQuestionForLevel(bank, level);

    if (!question) {
      return null;
    }

    questions.push(shuffleAnswers(question));
  }

  return questions;
};
