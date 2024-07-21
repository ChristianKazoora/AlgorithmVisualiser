import React from "react";
import { MazeModel } from "../../Interfaces/mazeModel";
import { Board } from "../board/board";
import { Cell } from "../Cell";
import { Stack } from "../../../shared/stack";

export class MazeManager implements MazeModel {
  state: MazeModel;
  constructor(state: MazeModel) {
    this.state = state;
  }
  getOrderVisited(): Stack<Cell> {
    return this.state.getOrderVisited();
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
