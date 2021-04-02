import ScoreTennis from "./score-tennis";

describe("ScoreTennis", () => {
  it("new ScoreTennis", () => {
    expect(new ScoreTennis()).toBeInstanceOf(ScoreTennis);
  });
});
