import { CellDecorator } from "../cellDecorator";
import { SlRocket } from "react-icons/sl";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-start`} className="hidden">
        <div
          className="flex justify-center "
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) )",
            height: "calc(var(--dynamic-cell-size, 20px) )",
          }}
        >
          <SlRocket className="rounded-[2px] bg-red-300   h-[1rem]" />
        </div>
      </div>
    );
  }
}
