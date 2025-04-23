import {Move} from "./move.enum";
import {Result} from "./result.enum";

export interface GameResult {
  playerMove: Move;
  computerMove: Move;
  result: Result;
}
