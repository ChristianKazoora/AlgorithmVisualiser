import React from "react";
import { MazeModel } from "../../../Interfaces/mazeModel";
import { Board } from "../../board/board";

export class manualMazeGenarotor implements MazeModel {
  board: Board | undefined;
  grid: any | undefined;
  generateMaze(): void {
    throw new Error("Method not implemented.");
  }
  getBoard(): Board {
    return this.ifNull(this.board);
  }
  setBoard(board: Board): void {
    this.board = board;
    this.grid = this.board.grid;
  }
  ifNull(data: any): any {
    if (data) {
      return data;
    } else {
      throw new Error("Method not implemented.");
    }
  }
}
