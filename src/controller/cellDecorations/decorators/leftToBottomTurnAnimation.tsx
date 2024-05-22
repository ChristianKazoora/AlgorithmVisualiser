import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class LeftToBottomTurn extends CellDecorator {
  animate(): any {
    return (
      <div>
        <div
          className={` ml-[5px] mt-[5px]  w-[0.5rem] h-[1rem] rounded-[3.5px] ${this.classNames}`}
        >
          <div
            className={` ml-[-10px] w-[1rem] h-[0.5rem]  rounded-[3.5px] ${this.classNames}`}
          />
        </div>
      </div>
    );
  }
}
