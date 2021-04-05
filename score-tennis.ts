import {
  ScoreBoard,
  Player,
  Game,
  TieBreakGame,
  CountScores,
  SetCount,
} from "./types";

export default class ScoreTennis {
  // Three-set match
  scoreBoard: ScoreBoard = {
    playerA: [0, 0, 0],
    playerB: [0, 0, 0],
  };

  constructor() {
    const winner = this.countMatch(this.scoreBoard.playerA.length);
    console.log(winner);
    console.log(this.scoreBoard);
  }

  whichPlayerScored = (): Player =>
    Math.floor(Math.random() * 2) + 1 === 1 ? "A" : "B";

  decideRoundWinner = <T extends CountScores>(
    scoreTarget: number,
    scores: T
  ): Player | undefined => {
    if (
      scores.playerA >= scoreTarget &&
      scores.playerB === scores.playerA - 2
    ) {
      return "A";
    } else if (
      scores.playerB >= scoreTarget &&
      scores.playerA === scores.playerB - 2
    ) {
      return "B";
    } else {
      return undefined;
    }
  };

  countGame = (): Player => {
    let winner: Player | undefined = undefined;
    const game: Game = {
      playerA: "0",
      playerB: "0",
    };

    const checkPlayerAdvantage = (player: Player) => {
      if (player === "A") {
        if (game.playerB === "A") {
          game.playerB = "40";
        }
      } else {
        if (game.playerA === "A") {
          game.playerA = "40";
        }
      }
    };

    while (true) {
      if (game.playerA === "GAME") {
        winner = "A";
        break;
      } else if (game.playerB === "GAME") {
        winner = "B";
        break;
      }

      if (this.whichPlayerScored() === "A") {
        switch (game.playerA) {
          case "0":
            checkPlayerAdvantage("A");
            game.playerA = "15";
            break;
          case "15":
            checkPlayerAdvantage("A");
            game.playerA = "30";
            break;
          case "30":
            checkPlayerAdvantage("A");
            game.playerA = "40";
            break;
          case "40":
            checkPlayerAdvantage("A");
            game.playerA = "A";
            break;
          case "A":
            game.playerA = "GAME";
        }
      } else {
        switch (game.playerB) {
          case "0":
            checkPlayerAdvantage("B");
            game.playerB = "15";
            break;
          case "15":
            checkPlayerAdvantage("B");
            game.playerB = "30";
            break;
          case "30":
            checkPlayerAdvantage("B");
            game.playerB = "40";
            break;
          case "40":
            checkPlayerAdvantage("B");
            game.playerB = "A";
            break;
          case "A":
            game.playerB = "GAME";
        }
      }
    }
    return winner;
  };

  countTieBreakGame = (): Player => {
    let winner: Player | undefined = undefined;
    const game: TieBreakGame = {
      playerA: 0,
      playerB: 0,
    };

    while (true) {
      this.whichPlayerScored() === "A" ? game.playerA++ : game.playerB++;

      if (this.decideRoundWinner(7, game) === "A") {
        winner = "A";
        break;
      } else if (this.decideRoundWinner(7, game) === "B") {
        winner = "B";
        break;
      }
    }

    return winner;
  };

  countSet = (): CountScores => {
    const set: CountScores = {
      playerA: 0,
      playerB: 0,
    };

    while (true) {
      this.countGame() === "A" ? set.playerA++ : set.playerB++;

      if (this.decideRoundWinner(6, set) === "A") {
        break;
      } else if (this.decideRoundWinner(6, set) === "B") {
        break;
      } else if (set.playerA === 6 && set.playerB === 6) {
        this.countTieBreakGame() === "A" ? set.playerA++ : set.playerB++;
        break;
      }
    }

    return set;
  };

  countMatch = (setCount: SetCount): Player => {
    for (let i = 0; i < setCount; i++) {
      const set = this.countSet();
      this.scoreBoard.playerA[i] = set.playerA;
      this.scoreBoard.playerB[i] = set.playerB;
    }

    const match: CountScores = {
      playerA: 0,
      playerB: 0,
    };

    for (let i = 0; i < this.scoreBoard.playerA.length; i++) {
      this.scoreBoard.playerA[i] > this.scoreBoard.playerB[i]
        ? match.playerA++
        : match.playerB++;
    }
    console.log(match);
    return match.playerA > match.playerB ? "A" : "B";
  };
}
