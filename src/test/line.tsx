import React from "react";
import { Grid } from "@mui/material";
import { Left_Right } from "../controller/cellDecorations/decorators/left_RightAnimation";
const Line = () => {
  const classNames: string = "bg-red-500";

  return (
    <div className="flex justify-center items-center gap-3 mt-[10rem]">
      <Grid
        id={`cell-${0}-${0}`}
        item
        xs={0}
        key={0}
        data-row={0}
        data-col={0}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        <div className={" flex  justify-center items-center h-full "}>
          <div
            className={`   w-[0.5rem] h-[1.3rem]  rounded-box ${classNames}`}
          >
            <div
              className={`  w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${classNames}`}
            />
          </div>
        </div>
      </Grid>
      <Grid
        id={`cell-${0}-${0}`}
        item
        xs={0}
        key={0}
        data-row={0}
        data-col={0}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        <div className={" flex  justify-center items-center h-full "}>
          <div className={`  w-[0.5rem] h-[1.3rem]  rounded-box  bg-red-500 `}>
            <div
              className={` mt-[.8rem]  w-[1.5rem]  h-[0.5rem] rounded-[3.5px] ${classNames}`}
            />
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Line;
