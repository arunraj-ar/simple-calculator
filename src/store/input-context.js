import React from "react";

const InputContext = React.createContext({
  value: [],
  addItem: (item) => {},
  removeItem: () => {},
  calculate: () => {},
  clear: () => {},
});

export default InputContext;
