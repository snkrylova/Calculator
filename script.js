"use strict";

const state = {
  number1: "",
  number2: "",
  operator: "",
  specialOperator: "",
  checkValue: "",
  result: "",
};

const buttons = document.querySelector(".buttons");
const output = document.querySelector(".output");

buttons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("number")) {
    return;
  }

  state.checkValue = event.target.value;

  if (
    state.number1 === "" ||
    state.number1.toString().slice(-1) === "." ||
    state.operator === ""
  ) {
    state.number1 += state.checkValue;
  } else if (state.number1 === "" && state.checkValue === "-") {
    state.number1 += "-";
  } else if (state.number1 !== "" && state.operator !== "") {
    state.number2 += state.checkValue;
  }

  output.value += state.checkValue;
});

buttons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("operator")) {
    return;
  }

  state.checkValue = event.target.value;

  if (state.number1 === "") {
    state.checkValue = "";
  } else if (state.checkValue !== "=") {
    if (state.checkValue === "." || state.checkValue === "clear") {
      state.specialOperator = state.checkValue;
    } else if (state.operator !== "") {
      state.operator = state.checkValue;
      output.value = state.number1;
    } else {
      state.operator = state.checkValue;
    }
  }

  output.value += state.checkValue;

  checkOperator();
});

function checkOperator() {
  checkOperatorSpecial();

  if (state.checkValue === "=") {
    checkOperatorUsual();

    finishCalculation();
  }
}

function fixedNumber(result) {
  result = result.toFixed(6);
  while (
    (result.toString().includes(".") && result.toString().slice(-1) === "0") ||
    result.toString().slice(-1) === "."
  ) {
    result = result.toString().slice(0, -1);
  }
  return result;
}

function finishCalculation() {
  output.value = state.result;
  state.number1 = state.result;
  state.number2 = "";
  state.operator = "";
  state.specialOperator = "";
}

function clearAll() {
  output.value = "";
  state.number1 = "";
  state.number2 = "";
  state.operator = "";
  state.specialOperator = "";
}

function checkOperatorSpecial() {
  switch (state.specialOperator) {
    case "clear":
      clearAll();
      break;
    case ".":
      if (
        state.number1 !== "" &&
        !state.number1.toString().includes(".") &&
        state.number2 === ""
      ) {
        state.number1 += ".";
      } else if (
        state.number2 !== "" &&
        !state.number2.toString().includes(".")
      ) {
        state.number2 += ".";
      }
      break;
  }
}

function checkOperatorUsual() {
  switch (state.operator) {
    case "+":
      state.result = +state.number1 + +state.number2;
      state.result = fixedNumber(state.result);
      break;
    case "-":
      state.result = state.number1 - state.number2;
      state.result = fixedNumber(state.result);
      break;
    case "/":
      state.result = state.number1 / state.number2;
      state.result = fixedNumber(state.result);
      break;
    case "*":
      state.result = state.number1 * state.number2;
      state.result = fixedNumber(state.result);
      break;
    case "%":
      state.result = (state.number1 * state.number2) / 100;
      state.result = fixedNumber(state.result);
      break;
    default:
      state.result = state.number1;
      break;
  }
}
