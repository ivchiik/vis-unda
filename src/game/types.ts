export enum Lifeline {
  FiftyFifty = "FIFTY_FIFTY",
  PhoneFriend = "PHONE_FRIEND",
  AskAudience = "ASK_AUDIENCE",
}

export type GameStatus = "idle" | "playing" | "revealed" | "won" | "lost" | "walked_away";

export interface Question {
  id: string;
  level: number;
  text: string;
  answers: string[];
  correctIndex: number;
  category?: string;
  explanation: string;
  sourceUrl: string;
}
