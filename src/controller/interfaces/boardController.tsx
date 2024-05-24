import { mainController } from "./mainController";

export interface BoardController extends mainController {
  animatePath(): void;
  addEventListeners(): void;
}
