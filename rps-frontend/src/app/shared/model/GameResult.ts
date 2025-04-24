import {Move} from "./move.enum";
import {Result} from "./result.enum";

export interface GameResult {
  playerMove: Move | null;
  computerMove: Move | null;
  result: Result | null;
}
