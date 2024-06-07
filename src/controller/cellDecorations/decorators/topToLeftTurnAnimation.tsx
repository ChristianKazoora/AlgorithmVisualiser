import { motion } from "framer-motion";
import { CellDecorator } from "../cellDecorator";
import { Grid } from "@mui/material";
export class TopToLeftTurn extends CellDecorator {
  animate(): any {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`  w-[0.5rem] h-[1rem]  rounded-[3.5px] ${this.classNames} `}
        >
          <div
            className={` w-[1rem]  h-[0.5rem]  rounded-[3.5px] ${this.classNames} `}
          />
        </div>
      </div>
    );
  }
}
