import React from "react"; // Add missing import
import { FaFlagCheckered } from "react-icons/fa";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class EndCellAnimation extends CellDecorator {
  animate(): any {
    return (
      <div id={`cell-${this.x}-${this.y}-end`} className="hidden">
        <div className="flex justify-center ">
          <FaFlagCheckered className=" bg-green-300 mt-[0.1rem] h-[1rem]" />
        </div>
      </div>
    );
  }
}
