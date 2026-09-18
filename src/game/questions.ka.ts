import type { Question } from "./types";

// Local placeholder questions so the game runs offline. Replace with the backend feed later.
export const QUESTIONS_KA: Question[] = [
  {
    id: "q1",
    level: 1,
    text: "რომელია საქართველოს დედაქალაქი?",
    answers: ["ქუთაისი", "თბილისი", "ბათუმი", "რუსთავი"],
    correctIndex: 1,
    category: "გეოგრაფია",
  },
  {
    id: "q2",
    level: 2,
    text: "რამდენი ასოა ქართულ ანბანში?",
    answers: ["28", "31", "33", "36"],
    correctIndex: 2,
    category: "ენა",
  },
  {
    id: "q3",
    level: 3,
    text: "ვინ დაწერა „ვეფხისტყაოსანი“?",
    answers: ["ილია ჭავჭავაძე", "შოთა რუსთაველი", "ვაჟა-ფშაველა", "აკაკი წერეთელი"],
    correctIndex: 1,
    category: "ლიტერატურა",
  },
];
