import React from "react";
import classes from "./Key.module.css";

const Key = (props) => {
  const onClickHandler = () => {
    props.onClick(props.value);
    window.navigator.vibrate(5);
  };
  return (
    <button
      className={classes.btn}
      value={props.value}
      onClick={onClickHandler}
    >
      {props.icon ? props.icon : props.value}
    </button>
  );
};

export default Key;
