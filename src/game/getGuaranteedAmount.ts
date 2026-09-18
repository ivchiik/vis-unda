import { MONEY_LADDER, SAFE_HAVEN_LEVELS } from "./constants";

export const getGuaranteedAmount = (levelsCleared: number): number => {
  const reached = SAFE_HAVEN_LEVELS.filter((level) => level <= levelsCleared);
  const best = reached[reached.length - 1];
  return best ? MONEY_LADDER[best - 1] : 0;
};
