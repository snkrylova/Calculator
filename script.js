"use strict";

const OPERATOR_ADDITION = "+";
const OPERATOR_SUBTRACTION = "-";
const OPERATOR_MULTIPLICATION = "*";
const OPERATOR_DIVISION = "/";
const OPERATOR_PERCENT = "%";
const OPERATOR_POINT = ".";
const OPERATOR_RESULT = "=";
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
        value: OPERATOR_RESULT,
      },
    ];

    this.nameClass = {
      CALCULATOR: "calculator",
      OUTPUT: "output",
      BUTTONS: "buttons",
      NUMBERS: "numbers",
      OPERATORS: "operators",
      NUMBER: "number",
      NUMBER_ZERO: "zero",
      OPERATOR: "operator",
      OPERATOR_CLEAR: "clear",
      OPERATOR_RESULT: "result",
    };
  }

  createCalculator() {
    this.calcContainer = document.createElement("div");

    this.calcContainer.classList.add(this.nameClass.CALCULATOR);

    this.container.appendChild(this.calcContainer);
  }

  createOutput() {
    this.output = document.createElement("input");

    this.output.classList.add(this.nameClass.OUTPUT);

    this.output.setAttribute("type", "text");
    this.output.setAttribute("value", "");
    this.output.setAttribute("disabled", "disabled");

    this.calcContainer.appendChild(this.output);
  }

  createButtonsContainer() {
    this.buttonsContainer = document.createElement("div");

    this.buttonsContainer.classList.add(this.nameClass.BUTTONS);

    this.calcContainer.appendChild(this.buttonsContainer);
  }

  createNumbersContainer() {
    this.numbersContainer = document.createElement("div");

    this.numbersContainer.classList.add(this.nameClass.NUMBERS);

    this.buttonsContainer.appendChild(this.numbersContainer);
  }

  createOperatorsContainer() {
    this.operatorsContainer = document.createElement("div");

    this.operatorsContainer.classList.add(this.nameClass.OPERATORS);

    this.buttonsContainer.appendChild(this.operatorsContainer);
  }

  createNumber() {
    for (let i = 0; i < this.number.length; i++) {
      const number = document.createElement("button");

      number.classList.add(this.nameClass.NUMBER);
      if (this.number[i].value === 0) {
        number.classList.add(this.nameClass.NUMBER_ZERO);
      }

      number.innerHTML = this.number[i].value;

      number.setAttribute("value", this.number[i].value);

      this.numbersContainer.appendChild(number);
    }
  }

  createOperator() {
    for (let i = 0; i < this.operator.length; i++) {
      const operator = document.createElement("button");

      operator.classList.add(this.nameClass.OPERATOR);
      if (this.operator[i].value === OPERATOR_CLEAR) {
        operator.classList.add(this.nameClass.OPERATOR_CLEAR);
      } else if (this.operator[i].value === OPERATOR_RESULT) {
        operator.classList.add(this.nameClass.OPERATOR_RESULT);
      }

      operator.innerHTML = this.operator[i].value;

      operator.setAttribute("value", this.operator[i].value);

      this.operatorsContainer.appendChild(operator);
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
      if (!event.target.classList.contains(this.nameClass.NUMBER)) {
        return;
      }

      this.state.checkValue = +event.target.getAttribute("value");

      if (
        this.state.number1 === OPERATOR_EMPTY_STRING ||
        this.state.number1.toString().slice(-1) === OPERATOR_POINT ||
        this.state.operator === OPERATOR_EMPTY_STRING
      ) {
        if (
          this.state.number1 === OPERATOR_EMPTY_STRING &&
          this.state.checkValue === 0
        ) {
          this.state.checkValue = OPERATOR_EMPTY_STRING;
        } else {
          this.state.number1 += this.state.checkValue;
        }
      } else if (
        this.state.number1 !== OPERATOR_EMPTY_STRING &&
        this.state.operator !== OPERATOR_EMPTY_STRING
      ) {
        this.state.number2 += this.state.checkValue;
      }

      this.output.value += this.state.checkValue;
    });
  }

  onclickOperator() {
    this.buttonsContainer.addEventListener("click", (event) => {
      if (!event.target.classList.contains(this.nameClass.OPERATOR)) {
        return;
      }

      this.state.checkValue = event.target.getAttribute("value");

      if (this.state.number1 === OPERATOR_EMPTY_STRING) {
        this.state.checkValue = OPERATOR_EMPTY_STRING;
      } else if (this.state.checkValue !== OPERATOR_RESULT) {
        if (
          this.state.checkValue === OPERATOR_POINT ||
          this.state.checkValue === OPERATOR_CLEAR
        ) {
          this.state.specialOperator = this.state.checkValue;
        } else if (this.state.operator !== OPERATOR_EMPTY_STRING) {
          this.state.operator = this.state.checkValue;
          this.output.value = this.state.number1;
          this.state.number2 = OPERATOR_EMPTY_STRING;
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

    if (this.state.checkValue === OPERATOR_RESULT) {
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
        console.log("clear");
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
