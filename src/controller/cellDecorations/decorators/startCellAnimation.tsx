import { CellDecorator } from "../cellDecorator";
import { PiAirplaneTakeoffThin } from "react-icons/pi";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-start`} className="hidden">
        <div
          className="flex justify-center items-center"
          style={{
            width: "calc(var(--dynamic-cell-size, 24px))",
            height: "calc(var(--dynamic-cell-size, 24px))",
          }}
        >
          <PiAirplaneTakeoffThin
            className="text-success"
            style={{
              width: "calc(var(--dynamic-cell-size, 24px) * 0.9)",
              height: "calc(var(--dynamic-cell-size, 24px) * 0.9)",
            }}
          />
        </div>
      </div>
    );
  }
}
