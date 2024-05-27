import React from "react"; // Add missing import
import { FaFlagCheckered } from "react-icons/fa";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div
        style={{ background: "red" }}
        id={`cell-${this.x}-${this.y}-end`}
        className="hidden"
      >
        <div className="bg-white w-[1.1rem] h-[1.1rem] mt-[-3px] rounded-full">
          <FaFlagCheckered className=" justify-center ml-[0.08rem] mt-[0.2rem] h-[0.8rem]" />
        </div>
      </div>
    );
  }
}
