import type { Question } from "@/game";

export interface GameAnswersProps {
  question: Question;
  selectedIndex: number | null;
  submittedAnswerIndex: number | null;
  hiddenAnswerIndexes: number[];
  isRevealed: boolean;
  onSelectAnswer: (index: number) => void;
}
