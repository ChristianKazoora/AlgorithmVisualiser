import { PiAirplaneLandingThin } from "react-icons/pi";
import { CellDecorator } from "../cellDecorator";
export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-end`} className="hidden">
        <div
          className="flex justify-center  "
          style={{
            width: "calc(var(--dynamic-cell-size, 20px) )",
            height: "calc(var(--dynamic-cell-size, 20px) )",
          }}
        >
          <PiAirplaneLandingThin className="rounded-[2px] h-[1rem] " />
        </div>
      </div>
    );
  }
}
