import React, { useReducer } from "react";
import InputContext from "./input-context";

const defaultInputState = {
  value: [],
  bracketCounter: 0,
};
const symbols = ["+", "-", "*", "/"];
const neverAtStart = ["*", "/",")","0",0];


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
/////////////remove the convert to postfix function and fix the add ITEM scenario
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


const canSucceed = (previous, current ) => {
  const cantSucceed = {
    "+": ["*","/","+"],
    "-": ["*","/","-"],
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
  return ( (isNumericString(previous) && isNumericString(current)) || (isNumericString(previous) && current === ".") || (previous === "." && isNumericString(current)) )
}

const inputReducer = (state, action) => {
  if (action.type === "ADD") {
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




    
    // if(action.item === "("){
    //   bracketCounter++
    // } else if (action.item === ")"){
    //   bracketCounter--
    // }
    // if (state.value.length === 0 && neverAtStart.includes(action.item)) {
    //   console.log(state.value.length);
    //   return {
    //     value: [],
    //   };
    // } else if (
    //   symbols.includes(action.item) &&
    //   symbols.includes(state.value[state.value.length - 1])
    // ) {
    //   const updatedValue = state.value.slice(0, -1).concat(action.item);
    //   return {
    //     value: updatedValue,
    //   };
    // } else {
    //   if(state.value.length !== 0 && (isNumericString(action.item) || action.item === "." ) && (isNumericString(state.value[state.value.length - 1]) || state.value[state.value.length - 1] === "." )){
    //     console.log("action.item from if: ",action.item)
    //     const updatedValue = state.value.slice(0, -1).concat(state.value[state.value.length - 1] + action.item);
    //       return {
    //         value: updatedValue,
    //       };
    //   } else {
    //     const updatedValue = state.value.concat(action.item);
    //     return {
    //       value: updatedValue,
    //     };
    //   }
    // }
  }
  if (action.type === "CLEAR") {
    const updatedValue = [];
    return {
      value: updatedValue,
      bracketCounter: 0,
    };
  }
  if (action.type === "REMOVE") {
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
    console.log("calculating: ",state.value, "\nbracketCounter: ",state.bracketCounter, "\nnumber counter", state.value.filter(item =>isNumericString(item)).length);
    if(state.bracketCounter!==0 || state.value.filter(item =>isNumericString(item)).length === 0){
      return {
        value: state.value,
        bracketCounter: state.bracketCounter,
      };
    }
    let expression = symbols.includes(state.value[state.value.length - 1]) ? state.value.slice(0, -1) : state.value
    expression = symbols.includes(expression[0]) ? ["0"].concat(expression) : expression
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
