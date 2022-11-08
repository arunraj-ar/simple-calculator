import React, { useContext } from "react";
import classes from "./Screen.module.css";
import InputContext from "../../store/input-context";

const Screen = (props) => {
  const inpCtx = useContext(InputContext);
  let screenClass = classes.screen;
  let inputLen = inpCtx.value.join("").length
  console.log(inputLen)
  if (inputLen < 10) {
    screenClass = classes.screen;
  } else if (inputLen <= 19) {
    screenClass = `${classes.screen} ${classes.rem3Font}`;
  } else if (inputLen > 19) {
    screenClass = `${classes.screen} ${classes.rem2Font}`;
  }

  return (
    <div className={screenClass}>
      <p>{inpCtx.value.toString().replace(/,/g, "")}</p>
    </div>
  );
};

export default Screen;
