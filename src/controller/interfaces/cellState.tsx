import { mainController } from "../interfaces/mainController";
import { AlgorithmController } from "./algorithmController";

export interface CellState extends mainController {
  setAlgorithmController(algorithmController: AlgorithmController): void;
}
