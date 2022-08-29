import React, { useReducer } from "react";
import InputContext from "./input-context";

const defaultInputState = {
  value: [],
};
const symbols = ["+", "-", "*", "/", "^", "%"];
const inputReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(state.value[state.value.length - 1], action.item);
    if (state.value.length === 0 && symbols.includes(action.item)) {
      console.log(state.value.length);
      return {
        value: [],
      };
    } else if (
      symbols.includes(action.item) &&
      symbols.includes(state.value[state.value.length - 1])
    ) {
      const updatedValue = state.value.slice(0, -1).concat(action.item);
      return {
        value: updatedValue,
      };
    } else {
      const updatedValue = state.value.concat(action.item);
      return {
        value: updatedValue,
      };
    }
  }
  if (action.type === "CLEAR") {
    const updatedValue = [];
    return {
      value: updatedValue,
    };
  }
  if (action.type === "REMOVE") {
    const updatedValue = state.value.slice(0, -1);
    return {
      value: updatedValue,
    };
  }
  if (action.type === "CALCULATE") {
    console.log(state.value);
  }
  return defaultInputState;
};

const InputProvider = (props) => {
  const [inputState, dispatchInputAction] = useReducer(
    inputReducer,
    defaultInputState
  );
  const addItemHandler = (item) => {
    dispatchInputAction({ type: "ADD", item: item });
  };
  const removeItemHandler = () => {
    dispatchInputAction({ type: "REMOVE" });
  };
  const calculateHandler = () => {
    dispatchInputAction({ type: "CALCULATE" });
  };
  const clearHandler = () => {
    dispatchInputAction({ type: "CLEAR" });
  };
  const inputContext = {
    value: inputState.value,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    calculate: calculateHandler,
    clear: clearHandler,
  };
  return (
    <InputContext.Provider value={inputContext}>
      {props.children}
    </InputContext.Provider>
  );
};

export default InputProvider;
