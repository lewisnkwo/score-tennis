export type Player = "A" | "B";
export type GamePoint = "0" | "15" | "30" | "40" | "A" | "GAME";

export interface Game {
  playerA: GamePoint;
  playerB: GamePoint;
}

export type SetPoint = string;

export interface ScoreBoard {
  playerA: SetPoint[];
  playerB: SetPoint[];
}
