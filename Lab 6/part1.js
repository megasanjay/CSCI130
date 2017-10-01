var iteration = 1;
var num1 = "";
var num2 = "";
var initialInput = "";
var operation = '';

function clickEvent(input)
{
  let inputChar = input.toString();

  switch (inputChar)
  {
    case 'a':
      inputChar = '+';
      input = ' plus ';
      operation = '+';
      break;
    case 's':
      inputChar = '-';
      input = ' minus ';
      operation = '-';
      break;
    case 'd':
      input = ' divided by ';
      inputChar = '/';
      operation = '/';
      break;
    case 'x':
      input = ' times ';
      inputChar = 'x';
      operation = '*';
      break;
    case 'e':
      input = ' equals ';
      inputChar = '=';
      break;
    case 'p':
      inputChar = '.';
      break;
    default:
  }

  initialInput = initialInput + input;
  document.getElementById("betterOutput").placeholder = " ";
  document.getElementById("betterOutput").placeholder = initialInput;

  if (inputChar == '+' || inputChar == '/' || inputChar == '-' || inputChar == 'x' || inputChar == '=')
  {
    operatorFunction(inputChar);
    return;
  }

  if (iteration % 2 == 0)
  {
    num2 = num2 + inputChar.toString();
  }
  else
  {
    num1 = num1 + inputChar.toString();
  }

}

function operatorFunction(input)
{
  let total = 0;

  iteration++;

  if (input == '=')
  {
    switch (operation)
    {
      case '+':
        total = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        total = parseFloat(num1) - parseFloat(num2);
        break;
      case '*':
        total = parseFloat(num1) * parseFloat(num2);
        break;
      case '/':
        total = parseFloat(num1) / parseFloat(num2);
        break;
      default:
    }

    document.getElementById("betterOutput").value = total.toString();
    num1 = "";
    num2 = "";
  }
}

function clearButton()
{
  initialInput = "";
  document.getElementById("betterOutput").value = "";
  document.getElementsById("betterOutput").placeholder = "";

  iteration = 1;
  num1 = "";
  num2 = "";
}
