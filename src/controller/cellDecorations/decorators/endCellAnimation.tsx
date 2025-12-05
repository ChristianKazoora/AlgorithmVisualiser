import { PiAirplaneLandingThin } from "react-icons/pi";
import { CellDecorator } from "../cellDecorator";

export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-end`} className="hidden">
        <div
          className="flex justify-center items-center"
          style={{
            width: "calc(var(--dynamic-cell-size, 24px))",
            height: "calc(var(--dynamic-cell-size, 24px))",
          }}
        >
          <PiAirplaneLandingThin
            className="text-error"
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
