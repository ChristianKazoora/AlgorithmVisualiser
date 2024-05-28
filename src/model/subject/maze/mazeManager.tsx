import React from "react";
import { MazeModel } from "../../Interfaces/mazeModel";
import { Board } from "../board/board";

export class MazeManager implements MazeModel {
  state: MazeModel;
  constructor(state: MazeModel) {
    this.state = state;
  }
  generateMaze(): void {
    this.state.generateMaze();
  }
  getBoard(): Board {
    return this.state.getBoard();
  }
  setBoard(board: Board): void {
    this.state.setBoard(board);
  }
}
