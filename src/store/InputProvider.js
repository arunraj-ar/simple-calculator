import React, { useReducer } from "react";
import InputContext from "./input-context";

const defaultInputState = {
  value: [],
  bracketCounter: 0,
};
const symbols = ["+", "-", "*", "/","."];
const operators = ["+","-","*","/"]


//////////////////////fix the below methods

const infixToPostfix = (infixArray) => {
  let stack = [];
  let result = [];

  for(let i=0; i< infixArray.length ; i++){
    let item = infixArray[i];
    if(isNumericString(item)){
      result.push(item)
    } else if( item === "("){
      stack.push(item)
    } else if(item === ")"){
      while(stack[stack.length - 1] !== "("){
        result.push(stack.pop());
      }
      stack.pop();
    } else {
      while(stack.length !== 0 && getPrecedence(item) <= getPrecedence(stack[stack.length - 1]) ){
        result.push(stack.pop())
      }
      stack.push(item)
    }
  }
  while (stack.length !== 0){
    result.push(stack.pop())
  }
  console.log("postfixArray: ",result)
  return result;
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
  postfixString = infixToPostfix(postfixString);
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


const fixInfix = (inputArray) => {
  let infixArray = [];
  let n = inputArray.length;
  for (let i = 0; i < n; i++) {
    const current = inputArray[i];
    const next = inputArray[i+1];
    const next1 = inputArray[i+2];
    if((isNumericString(current) && next === "(") || (current === ")" && isNumericString(next))){
      infixArray.push(current);
      infixArray.push("*");
    }
    else if((current === "*" || current === "/" ) && (next === "+" || next === "-")){
      infixArray.push(current);
      infixArray.push("(");
      infixArray.push("0");
      infixArray.push(next);
      infixArray.push(next1);
      infixArray.push(")");
      i++;
      i++;
    }else if((current === "+" && next === "-") || (current === "-" && next === "+")){
      infixArray.push("-");
      i++;
    } else if((current === "+" && next === "+") || (current === "-" && next === "-")){
      infixArray.push("+");
      i++;
    }
    else {
      infixArray.push(current);
    }
  }
  console.log("infixArray: ",infixArray)
  return infixArray;
}

const canSucceed = (previous, current ) => {
  const cantSucceed = {
    "+": ["*","/"],
    "-": ["*","/"],
    "*": ["*","/"],
    "/": ["*","/"],
    ".": ["(",")","*","/","-","+"]
  }
  if(!cantSucceed[previous]){
    return true;
  }
  return  !cantSucceed[previous].includes(current)
}

const canAppendToPrevious = (previous, current) => {
  return ( (isNumericString(previous) && isNumericString(current)) || (isNumericString(previous) && current === ".") || (previous === "." && isNumericString(current)))
}

const inputReducer = (state, action) => {
  if (action.type === "ADD") {
    if(state.value.length === 1 && (state.value[0] === "Infinity" || state.value[0] === "-Infinity" || state.value[0] === "NaN")){ //make this to replace the string with new value instead of clearing
      return {
        value: [],
        bracketCounter: 0,
      };
    }
    if(action.item === "."){
      if(state.value.at(-1) && state.value.at(-1).split(".").length - 1 >= 1){
        return {
          value: state.value,
          bracketCounter: state.bracketCounter,
        };
      }
    }
    if(state.value.at(-1) === "(" && !isNumericString(action.item) ){
      let updatedValue = state.value;
      let bracketCounter = state.bracketCounter
      if(action.item === "."){
        updatedValue = updatedValue.concat(action.item);
      } else if( operators.includes(action.item)){
        if(operators.includes(state.value.at(-3))){
          updatedValue = state.value.slice(0,-3).concat(action.item);
        }
        else if(operators.includes(state.value.at(-2))){
          updatedValue = state.value.slice(0,-2).concat(action.item);
        } else {
          updatedValue = state.value.slice(0,-1).concat(action.item);
        }
        bracketCounter--;
      } else if(action.item === ")"){
        if(bracketCounter > 1){
          updatedValue = state.value.slice(0,-1).concat(action.item);
          bracketCounter-=2;
        }
      }
      return {
        value: updatedValue,
        bracketCounter: bracketCounter,
      };
    }
    if(state.value.length > 0){
      console.log("decimal length: ",state.value.at(-1).split(".").length - 1)
      if(state.value.at(-1).split(".").length - 1 > 1){
        return {
          value: state.value,
          bracketCounter: state.bracketCounter,
        };
      }
    }
    let noOfBrackets = state.bracketCounter
    if(action.item === "("){
      noOfBrackets++
    } else if (action.item === ")"){
      noOfBrackets--
    }
    console.log(">>>>>>>>>BRACKET COUNT: ",noOfBrackets,)
    const previous = state.value[state.value.length - 1]
    const current = action.item
    console.log(previous, current);
    if(current === ")"){
      if(state.bracketCounter <= 0){
        return {
          value: state.value,
          bracketCounter: state.bracketCounter,
        };
      }
    }
    console.log("can succeed check: ",state.value.at(-2),!(symbols.includes(current) && symbols.includes(previous) && symbols.includes(state.value.at(-2))));
    let isThirdOperator = false;
    if(symbols.includes(current) && symbols.includes(previous) && symbols.includes(state.value.at(-2))){
      isThirdOperator = true;
    }
    if(canSucceed(previous,current) && !isThirdOperator){
      if(canAppendToPrevious(previous,current)) {
        const updatedValue = state.value.slice(0, -1).concat(state.value[state.value.length - 1] + action.item);
        return {
          value: updatedValue,
          bracketCounter: noOfBrackets,
        };
      } 
      else {
        const updatedValue = state.value.concat(action.item);
        return {
          value: updatedValue,
          bracketCounter: noOfBrackets,
        };
      }
    } 
    else {
      if(canSucceed(state.value.at(-2),action.item)){
        const updatedValue = state.value.slice(0, -1).concat(action.item);
        return {
          value: updatedValue,
          bracketCounter: noOfBrackets,
        };
      } else{
        const updatedValue = state.value.slice(0, -2).concat(action.item);
        return {
          value: updatedValue,
          bracketCounter: noOfBrackets,
        };
      }
    }
  }
  if (action.type === "CLEAR") {
    const updatedValue = [];
    return {
      value: updatedValue,
      bracketCounter: 0,
    };
  }
  if (action.type === "REMOVE") {
    if(state.value.length === 1 && (state.value[0] === "Infinity" || state.value[0] === "-Infinity" || state.value[0] === "NaN")){
      return {
        value: [],
        bracketCounter: 0,
      };
    }
    if(state.value.length > 0 && state.value.at(-1).length > 1){
      const updatedValue = [...state.value.slice(0, -1),state.value.at(-1).slice(0,-1)];
      return {
        value: updatedValue,
        bracketCounter: state.bracketCounter,
      };
    }
    const updatedValue = state.value.slice(0, -1);
    let noOfBrackets = state.bracketCounter;
    const totalBrackets = state.value.filter( item => item === "(" || item === ")")
    if(state.value.at(-1) === "(" && totalBrackets !==0 ){
      noOfBrackets--
    } else if(state.value.at(-1) === ")" && totalBrackets !==0){
      noOfBrackets++
    }
    return {
      value: updatedValue,
      bracketCounter: noOfBrackets,
    };
  }
  if (action.type === "CALCULATE") {
    if(state.value.length === 1 && (state.value[0] === "Infinity" || state.value[0] === "-Infinity" || state.value[0] === "NaN")){
      return {
        value: [],
        bracketCounter: 0,
      };
    }
    console.log("calculating: ",state.value, "\nbracketCounter: ",state.bracketCounter, "\nnumber counter", state.value.filter(item =>isNumericString(item)).length);
    if(state.bracketCounter<0 || state.value.filter(item =>isNumericString(item)).length < 2){
      return {
        value: state.value,
        bracketCounter: state.bracketCounter,
      };
    }
    let expression = operators.includes(state.value.at(-1)) || state.value.at(-1) === "(" ? state.value.concat("0") : state.value
    expression = operators.includes(expression[0]) ? ["0"].concat(expression) : expression
    expression = state.value.at(-1).at(-1) === "." ? state.value.slice(0,-1).concat(state.value.at(-1)+"0"): expression
    console.log("expression: ",expression)
    expression = fixInfix(expression);
    const updatedValue = [solvePostFix(expression)[0].toString()]
    console.log("updated value = ",updatedValue)
    return {
      value: updatedValue,
      bracketCounter: 0,
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
