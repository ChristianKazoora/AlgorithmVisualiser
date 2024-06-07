import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";

export class BottomToRightTurn extends CellDecorator {
  animate(): any {
    return (
      <div className="flex justify-center items-center">
        {/* <div
          className={` ml-[4px] mt-[4px] w-[0.5rem] h-[1.3rem]  rounded-[3.5px] ${this.classNames}`}
        >
          <div
            className={` w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${this.classNames}`}
          />
        </div> */}
        <div
          className={`   w-[0.5rem] h-[1.3rem]  rounded-[3.5px] ${this.classNames}`}
        >
          <div
            className={`  w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${this.classNames}`}
          />
        </div>
      </div>
    );
  }
}
