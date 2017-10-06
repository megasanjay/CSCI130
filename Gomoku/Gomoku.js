var table;
var tableSize;
var gridcell;
var gridArray;
var backColor;
var currentPlayer;
var turnCount;
var playerGameMode;
var winColor;
var startTime;
var runTimer;
var maxwincounter;
var maxRow
var maxColumn;
var winType;
var moves = [];

function timingFunction()
{
  let currentTime = Date.now();

  document.getElementById('runningTimer').innerHTML = (currentTime - startTime) / 1000;
}

function gameModeFunction(input)
{
  if (input == 1)
  {
    playerGameMode = 1;
    alert("You are now playing against a dumb student's algorithm to beat you at this stupid game. Good luck! :)");
    resizeTable(15);
  }
  else if (input == 3)
  {
    if (!tableSize)
    {
      resizeTable(15);
    }
    else
    {
      resizeTable(tableSize);
    }
    changeColor('silver');
  }
  else
  {
    playerGameMode = 2;
    alert("k. I hope you have someone next to you because you are now playing in the 1v1 mode. If you clicked this by accident, please choose the other game mode or play against yourself ;)");
    resizeTable(15);
  }
  changeColor(backColor);
}

function clickButton(i,j)
{
  //if (playerGameMode == 2)
  //{
    clickFunction(i,j);
  //}
}

function resizeTable(tsize)
{
  let row;
  let cell;
  startTime = Date.now();
  runTimer = setInterval(timingFunction, 300);
  document.getElementById("turnCounter").innerHTML = 0;

  tableSize = tsize;

  turnCount = 1;
  currentPlayer = 'p1';
  winColor = 0.5;

  gridArray = new Array(tsize);

  for (let i = 0; i < tsize; i++)
  {
    gridArray[i] = new Array(tsize);
  }

  for (let i = 0; i < tsize; i++)
  {
    for (let j = 0; j < tsize; j++)
    {
      gridArray[i][j] = 0;
    }
  }

  table = document.getElementById("gTable");
  table.classList.remove("noClick");

	table.innerHTML = " ";

	for(let i = 0; i < tableSize; i++)
	{
		row = table.insertRow(i);
		for (let j = 0; j < tableSize ; j++)
		{
			cell = row.insertCell(j);
			cell.innerHTML = '<button class = "gridCell" id= "cellr' + i + 'c' + j + '" onclick="clickButton(' + i + ',' + j + ')"></button>';
		}
	}
}

function clickFunction(i, j)
{
  let winWinNoMatterWhat;

  if (turnCount % 2 == 0)
  {
    currentPlayer = 'p2';
  }
  else
  {
    currentPlayer = 'p1';
  }

  if ((gridArray[i][j] == 1) || (gridArray[i][j] == 2))
  {
    errorFunction('taken')
    return;
  }


  if (currentPlayer == 'p1')
  {
    gridArray[i][j] = 1;
  }
  else
  {
    gridArray[i][j] = 2;
  }

  displayFunction(i,j);
  turnCount++;

  winWinNoMatterWhat = checkWin();
  if (winWinNoMatterWhat == 1)
  {
    alert("Player ❌ wins!");
    clearInterval(runTimer);
    return;
  }
  else if (winWinNoMatterWhat == 2)
  {
    alert("Player ⭕️ wins!");
    clearInterval(runTimer);
    return;
  }

  if (playerGameMode == 1 && currentPlayer == 'p2')
  {
    moves = [];
    twoVTwoResponse(i,j);
    //moves.sort(function(a,b){return b.streak - a.streak;});

    removeDuplicates();
    generateMove();
    /*console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    for(i in moves)
      {
        x = moves[i];
        console.log(x.index + " " + x.streak + " " + x.row + " " + x.column + " " + x.type);
      }
    */
  }
}

function generateMove()
{
  for(i in moves)
  {
    x = moves[i];

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(x.index + " " + x.streak + " " + x.row + " " + x.column + " " + x.type);

    if (x.streak == 1)
    {
      if (x.type == 'a')
      {
        if ((x.row + 1) < tableSize)
        {
          if (gridArray[x.row + 1][x.column] == 0)
          {
            clickFunction(x.row + 1, x.column);
            return;
          }
        }
      }
      if (x.type == 'b')
      {
        if (x.column + 1 < tableSize)
        {
          if (gridArray[x.row][x.column + 1] == 0)
          {
            clickFunction(x.row, x.column + 1);
            return;
          }
        }
      }
      if (x.type == 'c')
      {
        if (((x.row + 1) < tableSize) && ((x.column - 1) >= 0))
        {
          if (gridArray[x.row + 1][x.column - 1] == 0)
          {
            clickFunction(x.row + 1, x.column - 1);
            return;
          }
        }
      }
      if (x.type == 'd')
      {
        if (((x.row + 1) < tableSize) && ((x.column + 1) < tableSize))
        {
          if (gridArray[x.row + 1][x.column + 1] == 0)
          {
            clickFunction(x.row + 1, x.column + 1);
            return;
          }
        }
      }
    }

    if (x.streak == 2)
    {
      if (x.type == 'a')
      {
        if ((x.row + 2) < tableSize)
        {
          if (gridArray[x.row + 2][x.column] == 0)
          {
            clickFunction(x.row + 2, x.column);
            return;
          }
          else
          {
            if ((x.row - 1) >= 0)
            {
              if (gridArray[x.row - 1][x.column] == 0)
              {
                clickFunction(x.row - 1, x.column);
                return;
              }
            }
          }
        }
        else
        {
          if ((x.row - 1) >= 0)
          {
            if (gridArray[x.row - 1][x.column] == 0)
            {
              clickFunction(x.row - 1, x.column);
              return;
            }
          }
        }
      }
      if (x.type == 'b')
      {
        if ((x.column + 2) < tableSize)
        {
          if (gridArray[x.row][x.column + 2] == 0)
          {
            clickFunction(x.row, x.column + 2);
            return;
          }
          else
          {
            if ((x.column - 1) >= 0)
            {
              if (gridArray[x.row][x.column - 1] == 0)
              {
                clickFunction(x.row, x.column - 1);
                return;
              }
            }
          }
        }
        else
        {
          if ((x.column - 1) >= 0)
          {
            if (gridArray[x.row][x.column - 1] == 0)
            {
              clickFunction(x.row, x.column - 1);
              return;
            }
          }
        }
      }
      if (x.type == 'c')
      {
        if (((x.row + 2) < tableSize) && ((x.column - 2) >= 0))
        {
          if (gridArray[x.row + 2][x.column - 2] == 0)
          {
            clickFunction(x.row + 2, x.column - 2);
            return;
          }
          else
          {
            if (((x.row - 1) >= 0) && ((x.column + 1) < tableSize))
            {
              if (gridArray[x.row - 1][x.column + 1] == 0)
              {
                clickFunction(x.row - 1, x.column + 1);
                return;
              }
            }
          }
        }
        else
        {
          if (((x.row - 1) >= 0) && ((x.column + 1) < tableSize))
          {
            if (gridArray[x.row - 1][x.column + 1] == 0)
            {
              clickFunction(x.row - 1, x.column + 1);
              return;
            }
          }
        }
      }
      if (x.type == 'd')
      {
        if (((x.row + 2) < tableSize) && ((x.column + 1) < tableSize))
        {
          if (gridArray[x.row + 2][x.column + 1] == 0)
          {
            clickFunction(x.row + 2, x.column + 1);
            return;
          }
          else
          {
            if (((x.row - 1) >= 0) && ((x.column - 1) >= 0))
            {
              if (gridArray[x.row - 1][x.column - 1] == 0)
              {
                clickFunction(x.row - 1, x.column - 1);
                return;
              }
            }
          }
        }
        else
        {
          if (((x.row - 1) >= 0) && ((x.column - 1) >= 0))
          {
            if (gridArray[x.row - 1][x.column - 1] == 0)
            {
              clickFunction(x.row - 1, x.column - 1);
              return;
            }
          }
        }
      }
    }

    if (x.streak == 3 || x.streak == 4)
    {
      if (x.type == 'a')
      {
        if ((x.row + 2) < tableSize)
        {
          if (gridArray[x.row + 2][x.column] == 0)
          {
            clickFunction(x.row + 2, x.column);
            return;
          }
          else
          {
            if ((x.row - (x.streak - 1)) >= 0)
            {
              if (gridArray[x.row - (x.streak - 1)][x.column] == 0)
              {
                clickFunction(x.row - (x.streak - 1), x.column);
                return;
              }
            }
          }
        }
        else
        {
          if ((x.row - (x.streak - 1)) >= 0)
          {
            if (gridArray[x.row - (x.streak - 1)][x.column] == 0)
            {
              clickFunction(x.row - (x.streak - 1), x.column);
              return;
            }
          }
        }
      }
      if (x.type == 'b')
      {
        if (x.column + 2 < tableSize)
        {
          if (gridArray[x.row][x.column + 2] == 0)
          {
            clickFunction(x.row, x.column + 2);
            return;
          }
          else
          {
            if ((x.column - (x.streak - 1)) >= 0)
            {
              if (gridArray[x.row][x.column - (x.streak - 1)] == 0)
              {
                clickFunction(x.row, x.column - (x.streak - 1));
                return;
              }
            }
          }
        }
        else
        {
          if ((x.column - (x.streak - 1)) >= 0)
          {
            if (gridArray[x.row][x.column - (x.streak - 1)] == 0)
            {
              clickFunction(x.row, x.column - (x.streak - 1));
              return;
            }
          }
        }
      }
      if (x.type == 'c')
      {
        if (((x.row + 2) < tableSize) && ((x.column - 2) >= 0))
        {
          if (gridArray[x.row + 2][x.column - 2] == 0)
          {
            clickFunction(x.row + 2, x.column - 2);
            return;
          }
          else
          {
            if (((x.row - (x.streak - 1)) >= 0) && ((x.column + (x.streak - 1)) < tableSize))
            {
              if (gridArray[x.row - (x.streak - 1)][x.column + (x.streak - 1)] == 0)
              {
                clickFunction(x.row - (x.streak - 1), x.column + (x.streak - 1));
                return;
              }
            }
          }
        }
        else
        {
          if (((x.row - (x.streak - 1)) >= 0) && ((x.column + (x.streak - 1)) < tableSize))
          {
            if (gridArray[x.row - (x.streak - 1)][x.column + (x.streak - 1)] == 0)
            {
              clickFunction(x.row - (x.streak - 1), x.column + (x.streak - 1));
              return;
            }
          }
        }
      }
      if (x.type == 'd')
      {
        if (((x.row + 2) < tableSize) && ((x.column + 2) < tableSize))
        {
          if (gridArray[x.row + 2][x.column + 2] == 0)
          {
            clickFunction(x.row + 2, x.column + 2);
            return;
          }
          else
          {
            if (((x.row - (x.streak - 1)) >= 0) && ((x.column - (x.streak - 1)) >= 0))
            {
              if (gridArray[x.row - (x.streak - 1)][x.column - (x.streak - 1)] == 0)
              {
                clickFunction(x.row - (x.streak - 1), x.column - (x.streak - 1));
                return;
              }
            }
          }
        }
        else
        {
          if (((x.row - (x.streak - 1)) >= 0) && ((x.column - (x.streak - 1)) >= 0))
          {
            if (gridArray[x.row - (x.streak - 1)][x.column - (x.streak - 1)] == 0)
            {
              clickFunction(x.row - (x.streak - 1), x.column - (x.streak - 1));
              return;
            }
          }
        }
      }
    }
  }
}

function removeDuplicates()
{
  for(i in moves)
  {
    x = moves[i];
    for(j in moves)
    {
      y = moves[j];

      if (x.streak == y.streak && x.row == y.row && x.column == y.column && x.type == y.type && x.index != y.index)
      {
        moves.splice(j,1);
      }
    }
  }
  moves.sort
  (
    function(a,b)
    {
      var sorter = b.streak - a.streak;

      if (sorter)
      {
        return sorter;
      }

      var tieSorter = b.type - a.type;
      return tieSorter;
    }
  );
}

function twoVTwoResponse(inputRow, inputColumn)
{
  maxwincounter = 0;
  index = 1;

  // Right diagonal check
  for (let row = 0; row < tableSize - 1; row++)
  {
    for (let column = 0; column < tableSize - 1; column++)
    {

      let i, j;
      wincounter = 1;

      for (i = row, j = column; i < tableSize - 1 && j < tableSize - 1; i++, j++)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        if (gridArray[i + 1][j + 1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        move = new Object();
        move.index = index++;
        move.streak = wincounter;
        move.row = i;
        move.column = j;
        move.type = 'd';

        moves.push(move);
      }
    }
  }

  // Left diagonal check
  for (let row = 0; row < tableSize - 1; row++)
  {
    for (let column = tableSize - 1; column > 0; column--)
    {
      let i, j;
      wincounter = 1;

      for (i = row, j = column; i < tableSize - 1 && j > 0; i++, j--)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        if (gridArray[i + 1][j - 1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        move = new Object();
        move.index = index++;
        move.streak = wincounter;
        move.row = i;
        move.column = j;
        move.type = 'c';

        moves.push(move);
      }
    }
  }

  // horizontal check
  for (let i = 0; i < tableSize; i++)
  {
    wincounter = 1;

    for (let j = 0; j < tableSize - 1; j++)
    {
      if (gridArray[i][j] == 0)
      {
        continue;
      }

      currentSlotPiece = gridArray[i][j];

      if (gridArray[i][j + 1] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[i][j + 1];
      }

      move = new Object();
      move.index = index++;
      move.streak = wincounter;
      move.row = i;
      move.column = j;
      move.type = 'b';

      moves.push(move);
    }
  }

  // Vertical check
  for (let i = 0; i < tableSize; i++)
  {
    wincounter = 1;

    for (let j = 0; j < tableSize - 1; j++)
    {
      if (gridArray[j][i] == 0)
      {
        continue;
      }

      currentSlotPiece = gridArray[j][i];

      if (gridArray[j + 1][i] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[j + 1][i];
      }

      move = new Object();
      move.index = index++;
      move.streak = wincounter;
      move.row = j;
      move.column = i;
      move.type = 'a';

      moves.push(move);
    }
  }

}

function displayFunction(i, j)
{
  let currentCell = document.getElementById("gTable").rows[i].cells[j];
  document.getElementById("turnCounter").innerHTML = turnCount;

  if (currentPlayer == 'p1')
  {
    currentCell.innerHTML = '<button class = "gridCell" id= "cellr' + i + 'c' + j + '" onclick="clickButton(' + i + ',' + j + ')">❌</button>';
    currentPlayer = 'p2';
  }
  else
  {
    currentCell.innerHTML = '<button class = "gridCell" id= "cellr' + i + 'c' + j + '" onclick="clickButton(' + i + ',' + j + ')">⭕️</button>';
    currentPlayer = 'p1';
  }

  changeColor(backColor);
}

function checkWin()
{
  let currentSlotPiece;
  let wincounter, x, y;
  maxwincounter = 0;

  // horizontal check
  for (let i = 0; i < tableSize; i++)
  {
    wincounter = 1;

    for (let j = 0; j < tableSize; j++)
    {
      if (gridArray[i][j] == 0)
      {
        continue;
      }

      currentSlotPiece = gridArray[i][j];

      if (gridArray[i][j + 1] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[i][j + 1];
      }

      if (wincounter == 5)
      {
        {
          x = "cellr" + i + "c" + j;
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + i + "c" + (j + 1);
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + i + "c" + (j - 1);
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + i + "c" + (j - 2);
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + i + "c" + (j - 3);
          y = document.getElementById(x);
          y.style.opacity = winColor;
        }

        disableButtons();

        return currentSlotPiece;
      }
    }
  }

  // Vertical check
  for (let i = 0; i < tableSize; i++)
  {
    wincounter = 1;

    for (let j = 0; j < tableSize; j++)
    {
      if (gridArray[j][i] == 0)
      {
        continue;
      }

      currentSlotPiece = gridArray[j][i];

      if ((j + 1)  > tableSize - 1)
      {
        continue;
      }

      if (gridArray[j + 1][i] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[j + 1][i];
      }

      if (wincounter == 5)
      {
        {
          x = "cellr" + j + "c" + i;
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + (j + 1) + "c" + i;
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + (j - 1) + "c" + i;
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + (j - 2) + "c" + i;
          y = document.getElementById(x);
          y.style.opacity = winColor;

          x = "cellr" + (j - 3) + "c" + i;
          y = document.getElementById(x);
          y.style.opacity = winColor;
        }

        disableButtons();

        return currentSlotPiece;
      }
    }
  }

  // Right diagonal check
  for (let row = 0; row < tableSize - 4; row++)
  {
    for (let column = 0; column < tableSize - 4; column++)
    {

      let i, j;
      wincounter = 1;

      for (i = row, j = column; i < tableSize - 1 && j < tableSize - 1; i++, j++)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        if (gridArray[i + 1][j + 1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        if (wincounter == 5)
        {
          {
            x = "cellr" + i + "c" + j;
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i + 1) + "c" + (j + 1);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 1) + "c" + (j - 1);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 2) + "c" + (j - 2);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 3) + "c" + (j - 3);
            y = document.getElementById(x);
            y.style.opacity = winColor;
          }

          disableButtons();

          return currentSlotPiece;
        }
      }
    }
  }

  // Left diagonal check
  for (let row = 0; row < tableSize - 4; row++)
  {
    for (let column = tableSize - 1; column > 3; column--)
    {
      let i, j;
      wincounter = 1;

      for (i = row, j = column; i < tableSize - 1 && j > 0; i++, j--)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        if (gridArray[i + 1][j - 1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        if (wincounter == 5)
        {
          {
            x = "cellr" + i + "c" + j;
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i + 1) + "c" + (j - 1);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 1) + "c" + (j + 1);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 2) + "c" + (j + 2);
            y = document.getElementById(x);
            y.style.opacity = winColor;

            x = "cellr" + (i - 3) + "c" + (j + 3);
            y = document.getElementById(x);
            y.style.opacity = winColor;
          }

          disableButtons();

          return currentSlotPiece;
        }
      }
    }
  }

  return false;
}

function errorFunction(errorCode)
{
  switch (errorCode)
  {
    case 'taken':
      alert("This cell has already been filled. Choose another unfilled spot");
      break;
  }
}

function disableButtons()
{
  document.getElementById('gTable').classList.add("noClick");
}

function changeColor(gridColor)
{
    switch (gridColor)
    {
        case 'skyblue':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.backgroundColor ="skyblue";
            }
            backColor = 'skyblue';
            break;
        case 'red':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="red";
            }
            backColor = 'red';
            break;
        case 'green':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="green";
            }
            backColor = 'green';
            break;
        case 'noC':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="none";
            }
            backColor = 'noC';
            reak;
        case 'fuchsia':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="fuchsia";
            }
            backColor = 'fuchsia';
            break;
        case 'silver':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="silver";
            }
            backColor = 'silver';
            break;
    }
}

function colorDropDown()
{
    document.getElementById("colorDropdown").classList.toggle("show");
}

function sizeDropDown()
{
    document.getElementById("sizeDropdown").classList.toggle("show");
}

function gameModeDropDown()
{
    document.getElementById("gameModeDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event)
{
  if (!event.target.matches(".dropdownButt"))
  {
    var dropdowns = document.getElementsByClassName("clickContent");
    var i;
    for (i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show"))
      {
        openDropdown.classList.remove("show");
      }
    }
  }
}
