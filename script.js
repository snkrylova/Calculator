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

class Calculator {
  constructor(container) {
    this.container = container;
    document.body.appendChild(this.container);
  }

  createCalculator() {
    this.calc = document.createElement("div");

    //this.calc.setAttribute("class", "calculator");

    let value = document.getElementById("buttonAddCalculator").value;
    this.calc.setAttribute("class", "calculator" + " " + value);

    this.container.appendChild(this.calc);

    document.getElementById("buttonAddCalculator").value++;
  }

  createInput() {
    this.input = document.createElement("input");

    this.input.setAttribute("type", "text");
    this.input.setAttribute("class", "output");
    this.input.setAttribute("value", "");
    this.input.setAttribute("disabled", "disabled");

    this.calc.appendChild(this.input);
  }

  createButtons() {
    this.buttons = document.createElement("div");

    this.buttons.setAttribute("class", "buttons");

    this.calc.appendChild(this.buttons);
  }

  createNumbers() {
    this.numbers = document.createElement("div");

    this.numbers.setAttribute("class", "numbers");

    this.buttons.appendChild(this.numbers);
  }

  createOperators() {
    this.operators = document.createElement("div");

    this.operators.setAttribute("class", "operators");

    this.buttons.appendChild(this.operators);
  }

  createNumber() {
    this.number = new Array(10);

    for (let i = 0; i < 10; i++) {
      this.number[i] = document.createElement("button");
    }

    this.number[9].innerHTML = 0;
    this.number[8].innerHTML = 3;
    this.number[7].innerHTML = 2;
    this.number[6].innerHTML = 1;
    this.number[5].innerHTML = 6;
    this.number[4].innerHTML = 5;
    this.number[3].innerHTML = 4;
    this.number[2].innerHTML = 9;
    this.number[1].innerHTML = 8;
    this.number[0].innerHTML = 7;

    for (let i = 0; i < 9; i++) {
      this.number[i].setAttribute("class", "number");
    }
    this.number[9].setAttribute("class", "number zero");

    this.number[9].setAttribute("value", 0);
    this.number[8].setAttribute("value", 3);
    this.number[7].setAttribute("value", 2);
    this.number[6].setAttribute("value", 1);
    this.number[5].setAttribute("value", 6);
    this.number[4].setAttribute("value", 5);
    this.number[3].setAttribute("value", 4);
    this.number[2].setAttribute("value", 9);
    this.number[1].setAttribute("value", 8);
    this.number[0].setAttribute("value", 7);

    for (let i = 0; i < 10; i++) {
      this.numbers.appendChild(this.number[i]);
    }
  }

  createOperator() {
    this.operator = new Array(8);

    for (let i = 0; i < 8; i++) {
      this.operator[i] = document.createElement("button");
    }

    this.operator[0].innerHTML = "%";
    this.operator[1].innerHTML = "C";
    this.operator[2].innerHTML = "+";
    this.operator[3].innerHTML = "-";
    this.operator[4].innerHTML = "*";
    this.operator[5].innerHTML = "/";
    this.operator[6].innerHTML = ".";
    this.operator[7].innerHTML = "=";

    for (let i = 0; i < 8; i++) {
      this.operator[i].setAttribute("class", "operator");
      if (i === 0) {
        this.operator[i].setAttribute("value", "%");
      } else if (i === 1) {
        this.operator[i].setAttribute("class", "operator clear");
        this.operator[i].setAttribute("value", "clear");
      } else if (i === 2) {
        this.operator[i].setAttribute("value", "+");
      } else if (i === 3) {
        this.operator[i].setAttribute("value", "-");
      } else if (i === 4) {
        this.operator[i].setAttribute("value", "*");
      } else if (i === 5) {
        this.operator[i].setAttribute("value", "/");
      } else if (i === 6) {
        this.operator[i].setAttribute("value", ".");
      } else {
        this.operator[i].setAttribute("class", "operator result");
        this.operator[i].setAttribute("value", "=");
      }
    }

    for (let i = 0; i < 8; i++) {
      this.operators.appendChild(this.operator[i]);
    }
  }
}

const buttonAddCalc = document.getElementById("buttonAddCalculator");

buttonAddCalc.addEventListener("click", function (event) {
  const classCalculator = new Calculator(
    document.querySelector(".addCalculator")
  );
  classCalculator.createCalculator();
  classCalculator.createInput();
  classCalculator.createButtons();
  classCalculator.createNumbers();
  classCalculator.createOperators();
  classCalculator.createNumber();
  classCalculator.createOperator();

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
});
