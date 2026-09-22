const assert = require("node:assert/strict");
const fs = require("node:fs");
const { afterEach, beforeEach, test } = require("node:test");
const ts = require("typescript");

// Run the domain code with Node's test runner using the project's existing TypeScript dependency.
require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  module._compile(outputText, filename);
};

const { useGameStore } = require("../src/game/useGameStore.ts");
const { QUESTIONS_KA } = require("../src/game/questions.ka.ts");
const {
  ANSWER_TIME_MS,
  ANSWER_REVEAL_DELAY_MS,
  MONEY_LADDER,
} = require("../src/game/constants.ts");
const { Lifeline } = require("../src/game/types.ts");
const { prepareQuestions } = require("../src/game/prepareQuestions.ts");

const originalNow = Date.now;
let now;
const state = () => useGameStore.getState();
const correctAnswer = () => state().questions[state().currentIndex].correctIndex;
const advance = () => {
  now += ANSWER_REVEAL_DELAY_MS;
  state().advance();
};
const clearQuestions = (count) => {
  for (let index = 0; index < count; index += 1) {
    state().answer(correctAnswer());
    advance();
  }
};

beforeEach(() => {
  now = 1_000_000;
  Date.now = () => now;
  state().reset();
  state().startGame(QUESTIONS_KA);
});
afterEach(() => {
  Date.now = originalNow;
  state().reset();
});

test("a round requires all 15 levels and rejects ambiguous or invalid answers", () => {
  assert.equal(prepareQuestions(QUESTIONS_KA.slice(0, 3)), null);
  assert.equal(prepareQuestions([]), null);
  const invalid = QUESTIONS_KA.map((question) => ({ ...question, answers: [...question.answers] }));
  invalid[0].answers[1] = invalid[0].answers[0];
  assert.equal(prepareQuestions(invalid), null);
  invalid[0] = { ...QUESTIONS_KA[0], correctIndex: 4 };
  assert.equal(prepareQuestions(invalid), null);
  assert.equal(state().startGame([]), false);
  assert.equal(state().questions.length, 15);
});

test("shuffling preserves the correct answer and does not mutate the bank", () => {
  const snapshot = JSON.stringify(QUESTIONS_KA);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const questions = prepareQuestions(QUESTIONS_KA);
    questions.forEach((question, index) => {
      assert.equal(question.level, index + 1);
      assert.equal(
        question.answers[question.correctIndex],
        QUESTIONS_KA[index].answers[QUESTIONS_KA[index].correctIndex]
      );
      assert.ok(question.sourceUrl.startsWith("https://"));
      assert.ok(question.explanation.length > 0);
    });
  }
  assert.equal(JSON.stringify(QUESTIONS_KA), snapshot);
});

test("15 correct answers are required for the 20,001 prize", () => {
  clearQuestions(14);
  assert.equal(state().status, "playing");
  assert.equal(state().wonAmount, MONEY_LADDER[13]);
  state().answer(correctAnswer());
  assert.equal(state().status, "revealed");
  advance();
  assert.equal(state().status, "won");
  assert.equal(state().wonAmount, 20_001);
});

test("wrong answers keep only the last completed safe haven", () => {
  for (const [cleared, expected] of [
    [0, 0],
    [4, 0],
    [5, 1_000],
    [9, 1_000],
    [10, 7_500],
    [14, 7_500],
  ]) {
    state().startGame(QUESTIONS_KA);
    clearQuestions(cleared);
    state().answer((correctAnswer() + 1) % 4);
    advance();
    assert.equal(state().status, "lost");
    assert.equal(state().wonAmount, expected);
  }
});

test("answers at the 40-second deadline are rejected, even without timer ticks", () => {
  now += ANSWER_TIME_MS - 1;
  state().expire();
  assert.equal(state().status, "playing");
  now += 1;
  assert.equal(state().answer(correctAnswer()), false);
  assert.equal(state().isTimedOut, true);
  assert.equal(state().submittedAnswerIndex, null);
  advance();
  assert.equal(state().status, "lost");
});

test("background timeout preserves a safe haven and blocks lifelines and walking away", () => {
  clearQuestions(6);
  now += ANSWER_TIME_MS + 60_000;
  assert.equal(state().useLifeline(Lifeline.FiftyFifty), false);
  state().walkAway();
  assert.equal(state().status, "revealed");
  assert.equal(state().wonAmount, 1_000);
  assert.deepEqual(state().usedLifelines, []);
});

test("invalid answers and rapid duplicate submissions cannot skip a question", () => {
  for (const index of [-1, 4, 1.5, NaN]) assert.equal(state().answer(index), false);
  assert.equal(state().status, "playing");
  state().answer(correctAnswer());
  assert.equal(state().answer(correctAnswer()), false);
  state().advance();
  assert.equal(state().status, "revealed");
  advance();
  state().advance();
  assert.equal(state().currentIndex, 1);
});

test("walking away keeps earned winnings before and after the answer reveal", () => {
  state().walkAway();
  assert.equal(state().wonAmount, 0);
  state().startGame(QUESTIONS_KA);
  state().answer(correctAnswer());
  state().walkAway();
  assert.equal(state().status, "walked_away");
  assert.equal(state().wonAmount, 100);
  state().startGame(QUESTIONS_KA);
  clearQuestions(3);
  state().walkAway();
  assert.equal(state().wonAmount, 300);
});

test("50:50 removes two wrong answers, rejects hidden answers, and works only once", () => {
  assert.equal(state().useLifeline(Lifeline.FiftyFifty), true);
  assert.equal(state().hiddenAnswerIndexes.length, 2);
  assert.ok(!state().hiddenAnswerIndexes.includes(correctAnswer()));
  assert.equal(state().answer(state().hiddenAnswerIndexes[0]), false);
  assert.equal(state().useLifeline(Lifeline.FiftyFifty), false);
  state().answer(correctAnswer());
  advance();
  assert.deepEqual(state().hiddenAnswerIndexes, []);
  assert.equal(state().useLifeline(Lifeline.FiftyFifty), false);
});

test("simulated advice respects remaining answers and audience votes total 100", () => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    state().startGame(QUESTIONS_KA);
    state().useLifeline(Lifeline.FiftyFifty);
    state().useLifeline(Lifeline.PhoneFriend);
    state().useLifeline(Lifeline.AskAudience);
    assert.ok(!state().hiddenAnswerIndexes.includes(state().phoneFriendIndex));
    assert.equal(
      state().audiencePercentages.reduce((sum, percent) => sum + percent, 0),
      100
    );
    for (const index of state().hiddenAnswerIndexes)
      assert.equal(state().audiencePercentages[index], 0);
    assert.equal(state().useLifeline(Lifeline.PhoneFriend), false);
    assert.equal(state().useLifeline(Lifeline.AskAudience), false);
  }
});

test("restarting clears all answers, advice, lifelines, and winnings", () => {
  state().useLifeline(Lifeline.PhoneFriend);
  state().answer(correctAnswer());
  state().startGame(QUESTIONS_KA);
  assert.equal(state().currentIndex, 0);
  assert.equal(state().wonAmount, 0);
  assert.equal(state().phoneFriendIndex, null);
  assert.equal(state().submittedAnswerIndex, null);
  assert.deepEqual(state().usedLifelines, []);
  assert.equal(state().deadlineAt, now + ANSWER_TIME_MS);
});
