import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class LeftToTopTurn extends CellDecorator {
  animate(): any {
    return (
      <div>
        <div
          className={`ml-[5px] mt-[-4px] w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames}`}
          // transition={{ duration: this.posFromStart * 0.01 }} // transition duration
        >
          <div
            className={` ml-[-8px] mt-[9px]  w-[1rem]  h-[0.5rem] rounded-[3.5px] ${this.classNames}`}
            // transition={{ duration: this.posFromStart * 0.01 }} // transition duration
          />
        </div>
      </div>
    );
  }
}
