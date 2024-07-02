import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";

export class BottomToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <div className={`mt-[.7rem]  w-[0.5rem] h-[1.2rem]   ${this.classNames}`}>
        <div
          className={` mb-[.8rem]  w-[1.5rem]  h-[0.5rem] ${this.classNames}`}
        />
      </div>
    );
  }
}
