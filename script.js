"use strict";

const OPERATOR_ADDITION = "+";
const OPERATOR_SUBTRACTION = "-";
const OPERATOR_MULTIPLICATION = "*";
const OPERATOR_DIVISION = "/";
const OPERATOR_PERCENT = "%";
const OPERATOR_POINT = ".";
const OPERATOR_EQUAL = "=";
const OPERATOR_CLEAR = "C";
const OPERATOR_EMPTY_STRING = "";
const ARRAY_NUMBER_SIZE = 10;
const ARRAY_OPERATOR_SIZE = 8;

class Calculator {
  constructor(container) {
    this.container = container;
    this.calcContainer = null;
    this.buttonsContainer = null;
    this.output = null;
    this.numbersContainer = null;
    this.operatorsContainer = null;

    this.state = {
      number1: OPERATOR_EMPTY_STRING,
      number2: OPERATOR_EMPTY_STRING,
      operator: OPERATOR_EMPTY_STRING,
      specialOperator: OPERATOR_EMPTY_STRING,
      checkValue: OPERATOR_EMPTY_STRING,
      result: OPERATOR_EMPTY_STRING,
    };

    this.number = [
      {
        index: 0,
        value: 7,
      },
      {
        index: 1,
        value: 8,
      },
      {
        index: 2,
        value: 9,
      },
      {
        index: 3,
        value: 4,
      },
      {
        index: 4,
        value: 5,
      },
      {
        index: 5,
        value: 6,
      },
      {
        index: 6,
        value: 1,
      },
      {
        index: 7,
        value: 2,
      },
      {
        index: 8,
        value: 3,
      },
      {
        index: 9,
        value: 0,
      },
    ];

    this.operator = [
      {
        index: 0,
        value: OPERATOR_PERCENT,
      },
      {
        index: 1,
        value: OPERATOR_CLEAR,
      },
      {
        index: 2,
        value: OPERATOR_ADDITION,
      },
      {
        index: 3,
        value: OPERATOR_SUBTRACTION,
      },
      {
        index: 4,
        value: OPERATOR_MULTIPLICATION,
      },
      {
        index: 5,
        value: OPERATOR_DIVISION,
      },
      {
        index: 6,
        value: OPERATOR_POINT,
      },
      {
        index: 7,
        value: OPERATOR_EQUAL,
      },
    ];
  }

  createCalculator() {
    this.calcContainer = document.createElement("div");

    this.calcContainer.setAttribute("class", "calculator");

    this.container.appendChild(this.calcContainer);
  }

  createOutput() {
    this.output = document.createElement("input");

    this.output.setAttribute("type", "text");
    this.output.setAttribute("class", "output");
    this.output.setAttribute("value", "");
    this.output.setAttribute("disabled", "disabled");

    this.calcContainer.appendChild(this.output);
  }

  createButtonsContainer() {
    this.buttonsContainer = document.createElement("div");

    this.buttonsContainer.setAttribute("class", "buttons");

    this.calcContainer.appendChild(this.buttonsContainer);
  }

  createNumbersContainer() {
    this.numbersContainer = document.createElement("div");

    this.numbersContainer.setAttribute("class", "numbers");

    this.buttonsContainer.appendChild(this.numbersContainer);
  }

  createOperatorsContainer() {
    this.operatorsContainer = document.createElement("div");

    this.operatorsContainer.setAttribute("class", "operators");

    this.buttonsContainer.appendChild(this.operatorsContainer);
  }

  createNumber() {
    for (let i = 0; i < ARRAY_NUMBER_SIZE; i++) {
      this.number[i].index = document.createElement("button");

      if (i !== 9) {
        this.number[i].index.setAttribute("class", "number");
      } else this.number[9].index.setAttribute("class", "number zero");

      this.number[i].index.innerHTML = this.number[i].value;
      this.number[i].index.setAttribute("value", this.number[i].value);

      this.numbersContainer.appendChild(this.number[i].index);

      //console.log(this.number[i].index + " " + this.number[i].value);
    }
  }

  createOperator() {
    for (let i = 0; i < ARRAY_OPERATOR_SIZE; i++) {
      this.operator[i].index = document.createElement("button");

      this.operator[i].index.innerHTML = this.operator[i].value;

      this.operator[i].index.setAttribute("class", "operator");

      this.operator[i].index.setAttribute("value", this.operator[i].value);

      this.operatorsContainer.appendChild(this.operator[i].index);
    }
  }

  render() {
    this.createCalculator();
    this.createOutput();
    this.createButtonsContainer();
    this.createNumbersContainer();
    this.createOperatorsContainer();
    this.createNumber();
    this.createOperator();

    this.onclickNumber();
    this.onclickOperator();
  }

  onclickNumber() {
    this.buttonsContainer.addEventListener("click", (event) => {
      if (!event.target.classList.contains("number")) {
        return;
      }

      this.state.checkValue = +event.target.getAttribute("value");

      if (
        this.state.number1 === OPERATOR_EMPTY_STRING ||
        this.state.number1.toString().slice(-1) === OPERATOR_POINT ||
        this.state.operator === OPERATOR_EMPTY_STRING
      ) {
        this.state.number1 += this.state.checkValue;
      } else if (
        this.state.number1 !== OPERATOR_EMPTY_STRING &&
        this.state.operator !== OPERATOR_EMPTY_STRING
      ) {
        this.state.number2 += this.state.checkValue;
      }

      this.output.value += this.state.checkValue;

      //console.log(this.state.number1 + " " + this.state.number2);
    });
  }

  onclickOperator() {
    this.buttonsContainer.addEventListener("click", (event) => {
      if (!event.target.classList.contains("operator")) {
        return;
      }

      this.state.checkValue = event.target.getAttribute("value");
      //console.log(this.state.checkValue);

      if (this.state.number1 === OPERATOR_EMPTY_STRING) {
        this.state.checkValue = OPERATOR_EMPTY_STRING;
      } else if (this.state.checkValue !== OPERATOR_EQUAL) {
        if (
          this.state.checkValue === OPERATOR_POINT ||
          this.state.checkValue === OPERATOR_CLEAR
        ) {
          this.state.specialOperator = this.state.checkValue;
        } else if (this.state.operator !== OPERATOR_EMPTY_STRING) {
          this.state.operator = this.state.checkValue;
          this.output.value = this.state.number1;
        } else {
          this.state.operator = this.state.checkValue;
        }
      }

      this.output.value += this.state.checkValue;

      this.checkOperator();
    });
  }

  checkOperator() {
    this.checkOperatorSpecial();

    if (this.state.checkValue === OPERATOR_EQUAL) {
      this.checkOperatorUsual();

      this.finishCalculation();
    }
  }

  fixedNumber(number) {
    let numberFixed = Number(number.toFixed(6));
    return numberFixed;
  }

  finishCalculation() {
    this.output.value = this.state.result;
    this.state.number1 = this.state.result;
    this.state.number2 = OPERATOR_EMPTY_STRING;
    this.state.operator = OPERATOR_EMPTY_STRING;
    this.state.specialOperator = OPERATOR_EMPTY_STRING;
  }

  clearAll() {
    this.output.value = OPERATOR_EMPTY_STRING;
    this.state.number1 = OPERATOR_EMPTY_STRING;
    this.state.number2 = OPERATOR_EMPTY_STRING;
    this.state.operator = OPERATOR_EMPTY_STRING;
    this.state.specialOperator = OPERATOR_EMPTY_STRING;
  }

  checkOperatorSpecial() {
    switch (this.state.specialOperator) {
      case OPERATOR_CLEAR:
        this.clearAll();
        break;
      case OPERATOR_POINT:
        if (
          this.state.number1 !== OPERATOR_EMPTY_STRING &&
          !this.state.number1.toString().includes(OPERATOR_POINT) &&
          this.state.number2 === OPERATOR_EMPTY_STRING
        ) {
          this.state.number1 += OPERATOR_POINT;
        } else if (
          this.state.number2 !== OPERATOR_EMPTY_STRING &&
          !this.state.number2.toString().includes(OPERATOR_POINT)
        ) {
          this.state.number2 += OPERATOR_POINT;
        }
        break;
    }
  }

  checkOperatorUsual() {
    switch (this.state.operator) {
      case OPERATOR_ADDITION:
        this.state.result = +this.state.number1 + +this.state.number2;
        this.state.result = this.fixedNumber(this.state.result);
        break;
      case OPERATOR_SUBTRACTION:
        this.state.result = this.state.number1 - this.state.number2;
        this.state.result = this.fixedNumber(this.state.result);
        break;
      case OPERATOR_DIVISION:
        this.state.result = this.state.number1 / this.state.number2;
        this.state.result = this.fixedNumber(this.state.result);
        break;
      case OPERATOR_MULTIPLICATION:
        this.state.result = this.state.number1 * this.state.number2;
        this.state.result = this.fixedNumber(this.state.result);
        break;
      case OPERATOR_PERCENT:
        this.state.result = (this.state.number1 * this.state.number2) / 100;
        this.state.result = this.fixedNumber(this.state.result);
        break;
      default:
        this.state.result = this.state.number1;
        break;
    }
  }
}

const buttonAddCalc = document.getElementById("buttonAddCalculator");

buttonAddCalc.addEventListener("click", function (event) {
  const classCalculator = new Calculator(
    document.querySelector(".addCalculator")
  );

  classCalculator.render();
});
