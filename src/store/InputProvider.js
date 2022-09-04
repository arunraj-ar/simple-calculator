import React, { useReducer } from "react";
import InputContext from "./input-context";

const defaultInputState = {
  value: [],
};
const symbols = ["+", "-", "*", "/", "^", "%"];

//////////////////////fix the below methods
function convertToPostfix(infix) {
  var output = [];
  var stack = [];
  for (var i = 0; i < infix.length; i++) {
     var ch = infix.charAt(i);
     if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
        while (stack.length !== 0 && stack[stack.length - 1] !== '(' &&
        getPrecedence(ch) <= getPrecedence(stack[stack.length - 1])) {
           output += stack.pop();
           output += ' ';
        }
        stack.push(ch);
     }
     else if (ch === '(') {
        stack.push(ch);
     }
     else if (ch === ')') {
        while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
           output += stack.pop();
           output += ' ';
        }
        stack.pop();
     } else {
        output+=ch;
     }
  }
  while (stack.length !== 0) {
     output += stack.pop();
     output += ' ';
  }
  console.log("output: ",output)
  return output;
}
function getPrecedence(ch) {
  if (ch === '+' || ch === '-') {
     return 1;
  }
  else if (ch === '*' || ch === '/') {
     return 2;
  } else {
     return 0;
  }
}

function isNumericString(str) {
  return (!isNaN(parseFloat(str)) && isFinite(str));
}

function solvePostFix(postfixString) {
  postfixString = convertToPostfix(postfixString.join(""));
  // postfixString = postfixString.split(" ");
  let resultArr = [];
  let max = postfixString.length;
  for (let i = 0; i < max; i++) {
      if (isNumericString(postfixString[i])) resultArr.push(parseFloat(postfixString[i]));
      else {
          if (postfixString[i] === "_") {
              let a = resultArr.pop();
              resultArr.push(a * (-1));
          } else if (postfixString[i] === "+") {
              let b = resultArr.pop(),
                  a = resultArr.pop();
              resultArr.push(a + b);
          } else if (postfixString[i] === "-") {
              let b = resultArr.pop(),
                  a = resultArr.pop();
              resultArr.push(a - b);
          } else if (postfixString[i] === "*") {
              let b = resultArr.pop(),
                  a = resultArr.pop();
              resultArr.push(a * b);
          } else if (postfixString[i] === "/") {
              let b = resultArr.pop(),
                  a = resultArr.pop();
              resultArr.push(a / b);
          } else if (postfixString[i] === "^") {
              let b = resultArr.pop(),
                  a = resultArr.pop();
              resultArr.push(Math.pow(a, b));
          }
      }
  }
  console.log("result: ",resultArr)
  return resultArr;
}


/////////////////////////////////fix the above methods


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
      if(state.value.length !== 0 && !symbols.includes(action.item) && !symbols.includes(state.value[state.value.length - 1])){
        console.log("action.item from if: ",action.item)
        const updatedValue = state.value.slice(0, -1).concat(state.value[state.value.length - 1] + action.item);
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
    console.log("calculating: ",state.value,"\nvalue: ",solvePostFix(state.value));
    const updatedValue = solvePostFix(state.value)
    return {
      value: updatedValue,
    };
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
