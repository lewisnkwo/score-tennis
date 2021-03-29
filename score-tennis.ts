import { ScoreBoard, Player, Game } from "./types";

export default class ScoreTennis {
  scoreBoard: ScoreBoard = {
    playerA: [],
    playerB: [],
  };

  constructor() {
    console.log(this.countGame());
  }

  playerScored = (): Player =>
    Math.floor(Math.random() * 2) + 1 === 1 ? "A" : "B";

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

      if (this.playerScored() === "A") {
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
}

/* POINTS */
// Each point will be 15 -> 30 -> 40 -> GAME

/* WINNING A GAME */
// Player has to win 4 points
// If Player 1's points === 40 && Player 2's points === 40 => 'Duece'
// The player who wins the next point => A (Advantage)
// If the same player wins the next point => GAME (Complete)
// If not, the score returns to 40 - 40 (Need 2 consecutive points to win from a deuce to win)

/* WINNING A SET */
// First person to win 6 games wins
// Only if they win by two clear games (e.g 6-4, 7-5)
// If scores are 6-6 -
