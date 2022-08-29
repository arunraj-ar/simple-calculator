import React from "react";
import classes from "./BackgroundCard.module.css"

const BackgroundCard = (props) => {
  return <div className={classes.background}>{props.children}</div>;
};

export default BackgroundCard;
