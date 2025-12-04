import { CellDecorator } from "../cellDecorator";
import { PiAirplaneTakeoffThin } from "react-icons/pi";

export class StartCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-start`} className="hidden">
        <div
          className="flex justify-center items-center"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px))",
            height: "calc(var(--dynamic-cell-size, 20px))",
          }}
        >
          <PiAirplaneTakeoffThin
            className="text-success"
            style={{
              width: "calc(var(--dynamic-cell-size, 20px) * 0.85)",
              height: "calc(var(--dynamic-cell-size, 20px) * 0.85)",
            }}
          />
        </div>
      </div>
    );
  }
}
