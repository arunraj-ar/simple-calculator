import React, { useContext } from "react";
import InputContext from "../../store/input-context";
import Key from "../UI/Key";
import classes from "./Keypad.module.css";

const keys = [
  "AC",
  "open",
  "close",
  "divide",
  "7",
  "8",
  "9",
  "multiply",
  "4",
  "5",
  "6",
  "minus",
  "1",
  "2",
  "3",
  "plus",
  "0",
  ".",
  "back",
  "equal",
];

const symbols = {
  open: "(",
  close: ")",
  divide: "/",
  multiply: "*",
  minus: "-",
  plus: "+",
  back: "",
  equal: "",
};

const icon = (icon) => {
  if (Object.keys(symbols).includes(icon)) {
    return (
      <img
        src={require(`../../assets/${icon}.png`)}
        alt="plus"
        draggable="false"
      />
    );
  } else {
    return undefined;
  }
};

const Keypad = (props) => {
  const inpCtx = useContext(InputContext);
  const onClickHandler = (value) => {
    if (value === "back") {
      inpCtx.removeItem();
    } else if (value === "AC") {
      inpCtx.clear();
    } else if (value === "equal") {
      inpCtx.calculate();
    } else if (Object.keys(symbols).slice(0, -2).includes(value)) {
      inpCtx.addItem(symbols[value]);
    } else {
      inpCtx.addItem(value);
    }
  };
  return (
    <div className={classes.keypad}>
      {keys.map((key) => {
        return (
          <Key
            key={"btn-" + key}
            icon={icon(key)}
            value={key}
            onClick={onClickHandler}
          />
        );
      })}
    </div>
  );
};

export default Keypad;
