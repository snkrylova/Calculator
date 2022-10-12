'use strict';

let number1 = '';
let number2 = '';
let operator = '';
let specialOperator = '';
let checkValue;
let result;

const calc = document.querySelector('.buttons');
const out = document.querySelector('.output');

calc.addEventListener('click', function(event) {

  if (!event.target.classList.contains('number') &&
   !event.target.classList.contains('operator')){
    return;
  }

  checkValue = event.target.value;

  if (!isNaN(checkValue) && 
     (number1 == '' || number1.toString().slice(-1) == '.' || operator == '')){
    number1 += checkValue;
  } else if (number1 == '' && checkValue == '-'){
      number1 += '-';
  } else if (isNaN(checkValue) && checkValue != '='){
      if (checkValue == '.' || checkValue == 'clear'){
        specialOperator = checkValue;
      } else if (operator != ''){
          if (checkValue == '-'){
            number2 += '-';
          }
          else {
            operator = checkValue;
            out.value = number1;
          }
      } else {
          operator = checkValue;
      }
  } else if (isNaN(checkValue) && number1 == ''){
      out.value = '';
  } else if (!isNaN(checkValue) && number1 != '' && operator != ''){
      number2 += checkValue;
  }

  out.value += checkValue;

  switch (specialOperator){
    case 'clear':
      out.value = '';
      number1 = '';
      number2 = '';
      operator = '';
      specialOperator = '';
      break;
    case '.':
      if (number1 != '' && 
         (number1.toString().includes('.') == false) &&
          number2 == ''){
        number1 += '.';
      } else if (number2 != '' &&
                (number2.toString().includes('.') == false)){
        number2 += '.';
      }
      break;
  }

  if (checkValue == '='){
    switch (operator){
      case '+':
        result = +number1 + +number2;
        result = numberFixed(result);
        break;
    case '-':
        result = number1 - number2;
        result = numberFixed(result);
        break;
    case '/':
        result = number1 / number2;
        result = numberFixed(result);
        break;
    case '*':
        result = number1 * number2;
        result = numberFixed(result);
        break;
    case '%':
        result = number1 * number2 / 100;
        result = numberFixed(result);
        break;
    }
      
    out.value = result;
    number1 = result;
    number2 = '';
    operator = ''; 
    specialOperator = '';
  }
});

function numberFixed(result){
  result = result.toFixed(6);
  while (result.toString().includes('.') == true &&
              result.toString().slice(-1) == '0' ||
              result.toString().slice(-1) == '.'){
          result = result.toString().slice(0,-1);
  }
  return result;
}