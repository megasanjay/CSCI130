var iteration = 1;
var num1 = "";
var num2 = "";
var initialInput = "";
var operation = '';

function clickevent(input)
{
  let inputChar = input.toString();

  switch (inputChar)
  {
    case 'a':
      inputChar = '+';
      operation = '+';
      break;
    case 's':
      inputChar = '-';
      operation = '-';
      break;
    case 'd':
      inputChar = '/';
      operation = '/';
      break;
    case 'x':
      inputChar = 'x';
      operation = '*';
      break;
    case 'e':
      inputChar = '=';
      break;
    case 'p':
      inputChar = '.';
      break;
    default:
  }

  initialInput = initialInput + inputChar;
  document.getElementById("initalOutput").value = initialInput;

  if (inputChar == '+' || inputChar == '/' || inputChar == '-' || inputChar == 'x' || inputChar == '=')
  {
    operatorfunction(inputChar);
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

function operatorfunction(input)
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

    document.getElementById("finalOutput").value = total.toString();
    num1 = "";
    num2 = "";
  }
}

function clearbutton()
{
  initialInput = "";
  document.getElementById("finalOutput").value = "";
  document.getElementById("initalOutput").value = "";
  num1 = "";
  num2 = "";
}
