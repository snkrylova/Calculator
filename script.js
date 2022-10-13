"use strict";

const OPERATOR_ADDITION = "+";
const OPERATOR_SUBTRACTION = "-";
const OPERATOR_MULTIPLICATION = "*";
const OPERATOR_DIVISION = "/";
const OPERATOR_PERCENT = "%";
const OPERATOR_POINT = ".";
const OPERATOR_EQUAL = "=";
const OPERATOR_CLEAR = "clear";
const OPERATOR_EMPTY_STRING = "";

const state = {
  number1: OPERATOR_EMPTY_STRING,
  number2: OPERATOR_EMPTY_STRING,
  operator: OPERATOR_EMPTY_STRING,
  specialOperator: OPERATOR_EMPTY_STRING,
  checkValue: OPERATOR_EMPTY_STRING,
  result: OPERATOR_EMPTY_STRING,
};

const buttons = document.querySelector(".buttons");
const output = document.querySelector(".output");

buttons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("number")) {
    return;
  }

  state.checkValue = event.target.value;

  if (
    state.number1 === OPERATOR_EMPTY_STRING ||
    state.number1.toString().slice(-1) === OPERATOR_POINT ||
    state.operator === OPERATOR_EMPTY_STRING
  ) {
    state.number1 += state.checkValue;
  } else if (
    state.number1 !== OPERATOR_EMPTY_STRING &&
    state.operator !== OPERATOR_EMPTY_STRING
  ) {
    state.number2 += state.checkValue;
  }

  output.value += state.checkValue;
});

buttons.addEventListener("click", function (event) {
  if (!event.target.classList.contains("operator")) {
    return;
  }

  state.checkValue = event.target.value;

  if (state.number1 === OPERATOR_EMPTY_STRING) {
    state.checkValue = OPERATOR_EMPTY_STRING;
  } else if (state.checkValue !== OPERATOR_EQUAL) {
    if (
      state.checkValue === OPERATOR_POINT ||
      state.checkValue === OPERATOR_CLEAR
    ) {
      state.specialOperator = state.checkValue;
    } else if (state.operator !== OPERATOR_EMPTY_STRING) {
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

  if (state.checkValue === OPERATOR_EQUAL) {
    checkOperatorUsual();

    finishCalculation();
  }
}

function fixedNumber(number) {
  let numberFixed = Number(number.toFixed(6));
  return numberFixed;
}

function finishCalculation() {
  output.value = state.result;
  state.number1 = state.result;
  state.number2 = OPERATOR_EMPTY_STRING;
  state.operator = OPERATOR_EMPTY_STRING;
  state.specialOperator = OPERATOR_EMPTY_STRING;
}

function clearAll() {
  output.value = OPERATOR_EMPTY_STRING;
  state.number1 = OPERATOR_EMPTY_STRING;
  state.number2 = OPERATOR_EMPTY_STRING;
  state.operator = OPERATOR_EMPTY_STRING;
  state.specialOperator = OPERATOR_EMPTY_STRING;
}

function checkOperatorSpecial() {
  switch (state.specialOperator) {
    case OPERATOR_CLEAR:
      clearAll();
      break;
    case OPERATOR_POINT:
      if (
        state.number1 !== OPERATOR_EMPTY_STRING &&
        !state.number1.toString().includes(OPERATOR_POINT) &&
        state.number2 === OPERATOR_EMPTY_STRING
      ) {
        state.number1 += OPERATOR_POINT;
      } else if (
        state.number2 !== OPERATOR_EMPTY_STRING &&
        !state.number2.toString().includes(OPERATOR_POINT)
      ) {
        state.number2 += OPERATOR_POINT;
      }
      break;
  }
}

function checkOperatorUsual() {
  switch (state.operator) {
    case OPERATOR_ADDITION:
      state.result = +state.number1 + +state.number2;
      state.result = fixedNumber(state.result);
      break;
    case OPERATOR_SUBTRACTION:
      state.result = state.number1 - state.number2;
      state.result = fixedNumber(state.result);
      break;
    case OPERATOR_DIVISION:
      state.result = state.number1 / state.number2;
      state.result = fixedNumber(state.result);
      break;
    case OPERATOR_MULTIPLICATION:
      state.result = state.number1 * state.number2;
      state.result = fixedNumber(state.result);
      break;
    case OPERATOR_PERCENT:
      state.result = (state.number1 * state.number2) / 100;
      state.result = fixedNumber(state.result);
      break;
    default:
      state.result = state.number1;
      break;
  }
}
