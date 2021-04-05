import ScoreTennis from "./score-tennis";
import { Player } from "./types";

describe("ScoreTennis", () => {
  it("returns a winner", () => {
    expect(new ScoreTennis().winner).toBeDefined();
  });
});
