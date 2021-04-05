import ScoreTennis from "./score-tennis";

describe("ScoreTennis", () => {
  it("returns a winner", () => {
    expect(new ScoreTennis().winner).toBeDefined();
  });
});
