import { PiAirplaneLandingThin } from "react-icons/pi";
import { CellDecorator } from "../cellDecorator";

export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-end`} className="hidden">
        <div
          className="flex justify-center items-center"
          style={{
            width: "calc(var(--dynamic-cell-size, 20px))",
            height: "calc(var(--dynamic-cell-size, 20px))",
          }}
        >
          <PiAirplaneLandingThin
            className="text-error"
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
