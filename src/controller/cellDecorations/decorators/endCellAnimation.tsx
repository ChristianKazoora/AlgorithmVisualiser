import { FaFlagCheckered } from "react-icons/fa";
import { CellDecorator } from "../cellDecorator";
export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-end`} className="hidden">
        <div
          className="flex justify-center "
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) )",
            height: "calc(var(--dynamic-cell-size, 20px) )",
          }}
        >
          <FaFlagCheckered className="rounded-[2px] bg-green-300  h-[1rem]" />
        </div>
      </div>
    );
  }
}
