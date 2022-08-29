import React, { useContext } from "react";
import classes from "./Screen.module.css";
import InputContext from "../../store/input-context";

const Screen = (props) => {
  const inpCtx = useContext(InputContext);
  let screenClass = classes.screen;
  if (inpCtx.value.length < 10) {
    screenClass = classes.screen;
  } else if (inpCtx.value.length <= 19) {
    screenClass = `${classes.screen} ${classes.rem3Font}`;
  } else if (inpCtx.value.length > 19) {
    screenClass = `${classes.screen} ${classes.rem2Font}`;
  }

  return (
    <div className={screenClass}>
      <p>{inpCtx.value.toString().replace(/,/g, "")}</p>
    </div>
  );
};

export default Screen;
