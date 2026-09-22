import type { Lifeline } from "@/game";

export interface GameLifelinesProps {
  usedLifelines: Lifeline[];
  onUseLifeline: (lifeline: Lifeline) => void;
}
