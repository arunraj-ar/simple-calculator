const infixToPostfix = (infixArray) => {
  let stack = [];
  let result = [];

  for (let i = 0; i < infixArray.length; i++) {
    let item = infixArray[i];
    if (isNumericString(item)) {
      result.push(item);
    } else if (item === "(") {
      stack.push(item);
    } else if (item === ")") {
      while (stack[stack.length - 1] !== "(") {
        result.push(stack.pop());
      }
      stack.pop();
    } else {
      while (
        stack.length !== 0 &&
        getPrecedence(item) <= getPrecedence(stack[stack.length - 1])
      ) {
        result.push(stack.pop());
      }
      stack.push(item);
    }
  }
  while (stack.length !== 0) {
    result.push(stack.pop());
  }
  console.log("postfixArray: ", result);
  return result;
};

const getPrecedence = (ch) => {
  if (ch === "+" || ch === "-") {
    return 1;
  } else if (ch === "*" || ch === "/") {
    return 2;
  } else {
    return 0;
  }
};

export const isNumericString = (str) => {
  return !isNaN(parseFloat(str)) && isFinite(str);
};

export const solvePostFix = (postfixString) => {
  postfixString = infixToPostfix(postfixString);
  // postfixString = postfixString.split(" ");
  let resultArr = [];
  let max = postfixString.length;
  for (let i = 0; i < max; i++) {
    if (isNumericString(postfixString[i]))
      resultArr.push(parseFloat(postfixString[i]));
    else {
      if (postfixString[i] === "_") {
        let a = resultArr.pop();
        resultArr.push(a * -1);
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
  console.log("result: ", resultArr);
  return resultArr;
};

export const fixInfix = (inputArray) => {
  let infixArray = [];
  let n = inputArray.length;
  for (let i = 0; i < n; i++) {
    const current = inputArray[i];
    const next = inputArray[i + 1];
    const next1 = inputArray[i + 2];
    if (
      (isNumericString(current) && next === "(") ||
      (current === ")" && isNumericString(next))
    ) {
      infixArray.push(current);
      infixArray.push("*");
    } else if (
      (current === "*" || current === "/") &&
      (next === "+" || next === "-")
    ) {
      infixArray.push(current);
      infixArray.push("(");
      infixArray.push("0");
      infixArray.push(next);
      infixArray.push(next1);
      infixArray.push(")");
      i++;
      i++;
    } else if (
      (current === "+" && next === "-") ||
      (current === "-" && next === "+")
    ) {
      infixArray.push("-");
      i++;
    } else if (
      (current === "+" && next === "+") ||
      (current === "-" && next === "-")
    ) {
      infixArray.push("+");
      i++;
    } else {
      infixArray.push(current);
    }
  }
  console.log("infixArray: ", infixArray);
  return infixArray;
};

export const canSucceed = (previous, current) => {
  const cantSucceed = {
    "+": ["*", "/"],
    "-": ["*", "/"],
    "*": ["*", "/"],
    "/": ["*", "/"],
    ".": ["(", ")", "*", "/", "-", "+"],
  };
  if (!cantSucceed[previous]) {
    return true;
  }
  return !cantSucceed[previous].includes(current);
};

export const canAppendToPrevious = (previous, current) => {
  return (
    (isNumericString(previous) && isNumericString(current)) ||
    (isNumericString(previous) && current === ".") ||
    (previous === "." && isNumericString(current))
  );
};
