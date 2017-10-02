var iteration = 1;
var num1 = "";
var num2 = "";
var initialInput = "";
var operation = '';

function clickEvent(input)
{
  if ((document.getElementById('operationsScreen').innerHTML.length) > 20)
  {
    if ((document.getElementById('operationsScreen').innerHTML.length) > 45)
    {
      document.getElementById('operationsScreen').classList.add("smallerText");
      document.getElementById('operationsScreen').classList.remove("bigText");
      document.getElementById('operationsScreen').classList.remove("smallText");
    }
    else
    {
      document.getElementById('operationsScreen').classList.add("smallText");
      document.getElementById('operationsScreen').classList.remove("bigText");
      document.getElementById('operationsScreen').classList.remove("smallerText");
    }
  }
  else
  {
    document.getElementById('operationsScreen').classList.remove("smallText");
    document.getElementById('operationsScreen').classList.add("bigText");
    document.getElementById('operationsScreen').classList.remove("smallerText");
  }

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
      input = '.';
      break;
    default:
  }

  initialInput = initialInput + input;
  document.getElementById("operationsScreen").innerHTML = initialInput;

  if (inputChar == '+' || inputChar == '/' || inputChar == '-' || inputChar == 'x' || inputChar == '=')
  {
    operatorFunction(inputChar);
    return;
  }

  if (iteration > 2)
  {
    num2 = num2 + inputChar.toString();
  }
  else
  {
    if (iteration % 2 == 0)
    {
      num2 = num2 + inputChar.toString();
    }
    else
    {
      num1 = num1 + inputChar.toString();
    }
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

    document.getElementById("answerScreen").innerHTML = total.toString();

    if (iteration < 3)
    {
      num1 = "";
      num2 = "";
    }
    else
    {
      num1 = total;
      num2 = "";
    }
  }
}

function clearButton()
{
  initialInput = "";
  document.getElementById("answerScreen").innerHTML = "";
  document.getElementById("operationsScreen").innerHTML = "";

  iteration = 1;
  num1 = "";
  num2 = "";
}
