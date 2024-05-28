import React from "react";
import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";

export class autoMazeGenarotor implements MazeModel {
  board: Board | undefined;
  grid: any | undefined;

  generateMaze(): void {
    for (let i = 0; i < this.grid.height; i++) {
      for (let j = 0; j < this.grid.width; j++) {}
    }
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = this.board.board;
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
