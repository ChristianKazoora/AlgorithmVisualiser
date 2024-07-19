import { MazeManager } from "../../../model/subject/maze/mazeManager";
import { autoMazeGenarator } from "../../../model/subject/maze/auto/autoMazeGenarator";
import { CellStateHelper } from "../cellStateHelper";
export class AutoCellState extends CellStateHelper {
  ganarateMaze(): void {
    const ganarator = new MazeManager(new autoMazeGenarator());
    ganarator.setBoard(this.ifNull(this.board));
    ganarator.generateMaze();
    this.setBoard(ganarator.getBoard());
    this.algorithmController?.reRenderBoard();
  }

  addEventListeners(): void {
    this.algorithmController?.reRenderBoard();
    const gridLength = this.ifNull(this.grid).length;
    const gridWidth = this.ifNull(this.grid)[0].length;
    let isDragging = false;
    for (let i = 0; i < gridLength; i++) {
      for (let j = 0; j < gridWidth; j++) {
        let cell = this.ifNull(this.grid)[i][j];
        let currentElement = document.getElementById(
          `cell-${cell.x}-${cell.y}`
        );
        if (currentElement) {
          this.ifNull(currentElement).onmousedown = (e: any) => {
            e.preventDefault();
            isDragging = true;
            if (cell.isStart || cell.isEnd) {
              this.currentPressedCell = cell;
            }

            this.algorithmController?.reRenderBoard();
          };
          this.ifNull(currentElement).onmouseup = (e: any) => {
            e.preventDefault();
            isDragging = false;
            this.draggingStart_End = "";
            if (this.currentPressedCell) {
              if (this.currentPressedCell.isStart) {
                this.setStart({ x: i, y: j });
              } else if (this.currentPressedCell.isEnd) {
                this.setEnd({ x: i, y: j });
              }
            }
            this.algorithmController?.getData();
            this.algorithmController?.reRenderBoard();
            this.algorithmController?.reRunAnimatePath();
          };
          this.ifNull(currentElement).onmouseenter = (e: any) => {
            e.preventDefault();

            if (isDragging && this.currentPressedCell) {
              if (this.draggingStart_End === "start") {
                this.setStart({ x: i, y: j });
              } else if (this.draggingStart_End === "end") {
                this.setEnd({ x: i, y: j });
              }
              this.algorithmController?.reRenderBoard();
            }
          };
          this.ifNull(currentElement).onmouseleave = (e: any) => {
            e.preventDefault();
            if (isDragging && this.currentPressedCell) {
              if (
                this.draggingStart_End === "start" ||
                this.currentPressedCell.isStart
              ) {
                this.draggingStart_End = "start";
                this.removeStart({ x: i, y: j });
              } else if (
                this.currentPressedCell.isEnd ||
                this.draggingStart_End === "end"
              ) {
                this.draggingStart_End = "end";
                this.removeEnd({ x: i, y: j });
              }
              this.algorithmController?.reRenderBoard();
            }
          };
        }
      }
    }
  }
}
