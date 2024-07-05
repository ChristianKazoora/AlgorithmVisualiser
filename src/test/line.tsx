import React from "react";
import { Grid } from "@mui/material";
import { Left_Right } from "../controller/cellDecorations/decorators/Line/left_RightAnimation";
const Line = () => {
  const classNames: string = "bg-red-500 rounded-box";

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
          width: "20px",
          height: "20px",
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
        id={`cell-${0}-${1}`}
        item
        xs={0}
        key={1}
        data-row={0}
        data-col={0}
        style={{
          width: "80px",
          height: "80px",
          border: "1px solid black",
        }}
      >
        {/* northWestToSouthEast */}

        <div className={" flex  justify-center items-center h-full "}>
          <div
            className={`absolute mr-[.42rem]  mb-[.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[-45deg]  ${classNames} `}
            style={{
              clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
            }}
          />
          <div
            className={`absolute  ml-[.42rem] mb-[.44rem]  w-[1.0rem] h-[0.5rem] transform rotate-[225deg]  ${classNames} `}
            style={{
              clipPath: "polygon(25% 0, 100% 0, 100% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
      </Grid>
      <Grid
        id={`cell-${0}-${2}`}
        item
        xs={0}
        key={2}
        data-row={0}
        data-col={0}
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid black",
        }}
      >
        <div className={" flex  justify-center items-center h-full "}>
          <div
            className={`w-[1.6rem] h-[0.5rem] transform rotate-45 ${classNames}`}
            style={{
              clipPath:
                "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
          <div
            className={`w-[1.6rem] h-[0.5rem] transform -rotate-45 ${classNames}`}
            style={{
              clipPath:
                "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
      </Grid>
    </div>
  );
};

export default Line;
