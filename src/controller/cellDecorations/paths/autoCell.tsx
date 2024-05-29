import { CellDecorator } from "../cellDecorator";
import { StartCellAnimation } from "../decorators/startCellAnimation";
import { EndCellAnimation } from "../decorators/endCellAnimation";
import { WallCellAnimation } from "../decorators/wallCellAnimation";
import { Line } from "./line";

export class AutoCell extends CellDecorator {
  animate(): JSX.Element {
    return (
      <div
        id={`cell-${this.x}-${this.y}`}
        key={this.y}
        style={{
          width: "20px",
          height: "20px",
          // borderTop: this.northW ? "1px solid black" : "none",
          // borderBottom: this.southW ? "1px solid black" : "none",
          // borderLeft: this.westW ? "1px solid black" : "none",
          // borderRight: this.eastW ? "1px solid black" : "none",
        }}
      >
        {new StartCellAnimation(this).animate()}
        {new EndCellAnimation(this).animate()}
        {new WallCellAnimation(this).animate()}
        <div id={`cell-${this.x}-${this.y}-path`}>
          {new Line(this).animate()}
        </div>
        <div
          id={`cell-${this.x}-${this.y}-current`}
          style={{ height: "1rem", background: "yellow" }}
          className="hidden"
        />
        <div
          id={`cell-${this.x}-${this.y}-visited`}
          style={{
            background: "grey",
            height: "1.13rem",
            borderRadius: "20%",
          }}
          className="hidden"
        />
      </div>
    );
  }
}

export default AutoCell;
