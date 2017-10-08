var table;
var tableSize;
var gridcell;
var gridArray;
var gridColor;
var currentPlayer;
var turnCount = 0;
var playerGameMode;
var player1Color;
var player2Color;
var winColor;
var startTime;
var suggestFlash;
var maxwincounter;
var maxRow;
var runTimer;
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
  if (input == 1) // Computer vs You
  {
    playerGameMode = 1;
    alert("You are now playing against a dumb student's algorithm to beat you at this stupid game. Good luck! :)");

    resizeTable(15);

    gridColor = 'white';
    changeGridColor(gridColor);
    player1Color = player2Color = 'red';
    changeP1Color(player1Color);
    changeP2Color(player2Color)
  }
  else if (input == 3) // Reset
  {
    if (!tableSize)
    {
      resizeTable(15);

      gridColor = 'white';
      changeGridColor(gridColor);
      player1Color = player2Color = 'red';
      changeP1Color(player1Color);
      changeP2Color(player2Color);
    }
    else
    {
      resizeTable(tableSize);
      changeGridColor(gridColor);
      changeP1Color(player1Color);
      changeP2Color(player2Color);
    }
  }
  else // 2v2
  {
    playerGameMode = 2;
    alert("k. I hope you have someone next to you because you are now playing in the 1v1 mode. If you clicked this by accident, please choose the other game mode or play against yourself ;)");

    resizeTable(15);

    gridColor = 'white';
    changeGridColor(gridColor);
    player1Color = player2Color = 'red';
    changeP1Color(player1Color);
    changeP2Color(player2Color);
  }
}

function suggestMoveFunction()
{
  if (turnCount == 0)
  {
    alert("You need to start a game for me to be able to suggest a move stupid! 🙄")
    return;
  }

  table = document.getElementById('gTable');
  moves = [];

  twoVTwoResponse();
  removeDuplicates();
  x = generateMove();

  y = "cellr" + x.row + "c" + x.column;
  document.getElementById(y).classList.add("flashClass");

  //table.rows[x.row].cells[x.column].style.backgroundColor = "red";
}

function clickButton(i,j)
{
  //if (playerGameMode == 2)
  //{
 x = document.getElementsByClassName("flashClass");
 if (x.length == 0)
 {
   clickFunction(i,j);
 }
 else
 {
   x[0].classList.remove("flashClass");
   clickFunction(i,j);
 }


  //}
}

function resizeTable(tsize)
{
  let row;
  let cell;
  document.getElementById("turnCounter").innerHTML = 0;

  tableSize = tsize;

  turnCount = 1;
  currentPlayer = 'p1';
  winColor = 0.5;

  gridArray = new Array(tsize);

  startTime = Date.now();
  runTimer = setInterval(timingFunction, 300);

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

  document.getElementById('totalPieceCounter').innerHTML = turnCount;

  if (turnCount % 2 == 0)
  {
    currentPlayer = 'p2';
    document.getElementById('p2PieceCounter').innerHTML = parseInt(turnCount/2);
  }
  else
  {
    document.getElementById('p1PieceCounter').innerHTML = parseInt(turnCount/2) + 1;
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
    clearInterval(runTimer);
    alert("Player ❌ wins!");
    return;
  }
  else if (winWinNoMatterWhat == 2)
  {
    clearInterval(runTimer);
    alert("Player ⭕️ wins!");
    return;
  }

  if (playerGameMode == 1 && currentPlayer == 'p2')
  {
    moves = [];
    twoVTwoResponse();
    //moves.sort(function(a,b){return b.streak - a.streak;});

    removeDuplicates();
    x = generateMove();

    makeAIMove(x.row, x.column);
  }
}

function makeAIMove(i, j)
{
  clickFunction(i,j);
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
            y.row = x.row + 1;
            y.column = x.column;
            return y;
          }
        }
      }
      if (x.type == 'b')
      {
        if (x.column + 1 < tableSize)
        {
          if (gridArray[x.row][x.column + 1] == 0)
          {
            y.row = x.row;
            y.column = x.column + 1;
            return y;
          }
        }
      }
      if (x.type == 'c')
      {
        if (((x.row + 1) < tableSize) && ((x.column - 1) >= 0))
        {
          if (gridArray[x.row + 1][x.column - 1] == 0)
          {
            y.row = x.row + 1;
            y.column = x.column - 1;
            return y;
          }
        }
      }
      if (x.type == 'd')
      {
        if (((x.row + 1) < tableSize) && ((x.column + 1) < tableSize))
        {
          if (gridArray[x.row + 1][x.column + 1] == 0)
          {
            y.row = x.row + 1;
            y.column = x.column + 1;
            return y;
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
            y.row = x.row + 2;
            y.column = x.column;
            return y;
          }
          else
          {
            if ((x.row - 1) >= 0)
            {
              if (gridArray[x.row - 1][x.column] == 0)
              {
                y.row = x.row - 1;
                y.column = x.column;
                return y;
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
              y.row = x.row - 1;
              y.column = x.column;
              return y;
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
            y.row = x.row;
            y.column = x.column + 2;
            return y;
          }
          else
          {
            if ((x.column - 1) >= 0)
            {
              if (gridArray[x.row][x.column - 1] == 0)
              {
                y.row = x.row;
                y.column = x.column - 1;
                return y;
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
              y.row = x.row;
              y.column = x.column - 1;
              return y;
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
            y.row = x.row + 2;
            y.column = x.column - 2;
            return y;
          }
          else
          {
            if (((x.row - 1) >= 0) && ((x.column + 1) < tableSize))
            {
              if (gridArray[x.row - 1][x.column + 1] == 0)
              {
                y.row = x.row - 1;
                y.column = x.column + 1;
                return y;
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
              y.row = x.row - 1;
              y.column = x.column + 1;
              return y;
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
            y.row = x.row + 2;
            y.column = x.column + 1;
            return y;
          }
          else
          {
            if (((x.row - 1) >= 0) && ((x.column - 1) >= 0))
            {
              if (gridArray[x.row - 1][x.column - 1] == 0)
              {
                y.row = x.row - 1;
                y.column = x.column - 1;
                return y;
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
              y.row = x.row - 1;
              y.column = x.column - 1;
              return y;
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
            y.row = x.row + 2;
            y.column = x.column;
            return y;
          }
          else
          {
            if ((x.row - (x.streak - 1)) >= 0)
            {
              if (gridArray[x.row - (x.streak - 1)][x.column] == 0)
              {
                y.row = x.row - (x.streak - 1);
                y.column = x.column;
                return y;
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
              y.row = x.row - (x.streak - 1);
              y.column = x.column;
              return y;
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
            y.row = x.row ;
            y.column = x.column + 2;
            return y;
          }
          else
          {
            if ((x.column - (x.streak - 1)) >= 0)
            {
              if (gridArray[x.row][x.column - (x.streak - 1)] == 0)
              {
                y.row = x.row;
                y.column = x.column - (x.streak - 1);
                return y;
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
              y.row = x.row;
              y.column = x.column - (x.streak - 1);
              return y;
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
            y.row = x.row + 2;
            y.column = x.column - 2;
            return y;
          }
          else
          {
            if (((x.row - (x.streak - 1)) >= 0) && ((x.column + (x.streak - 1)) < tableSize))
            {
              if (gridArray[x.row - (x.streak - 1)][x.column + (x.streak - 1)] == 0)
              {
                y.row = x.row - (x.streak - 1);
                y.column = x.column + (x.streak - 1);
                return y;
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
              y.row = x.row - (x.streak - 1);
              y.column = x.column + (x.streak - 1);
              return y;
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
            y.row = x.row + 2;
            y.column = x.column + 2;
            return y;
          }
          else
          {
            if (((x.row - (x.streak - 1)) >= 0) && ((x.column - (x.streak - 1)) >= 0))
            {
              if (gridArray[x.row - (x.streak - 1)][x.column - (x.streak - 1)] == 0)
              {
                y.row = x.row - (x.streak - 1);
                y.column = x.column - (x.streak - 1);
                return y;
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
              y.row = x.row - (x.streak - 1);
              y.column = x.column - (x.streak - 1);
              return y;
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

function twoVTwoResponse()
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
    currentCell.innerHTML = '<button class = "gridCell player1" id= "cellr' + i + 'c' + j + '" onclick="clickButton(' + i + ',' + j + ')">X</button>';
    currentPlayer = 'p2';
  }
  else
  {
    currentCell.innerHTML = '<button class = "gridCell player2" id= "cellr' + i + 'c' + j + '" onclick="clickButton(' + i + ',' + j + ')">O</button>';
    currentPlayer = 'p1';
  }

  changeGridColor(gridColor);
  changeP1Color(player1Color);
  changeP2Color(player2Color);
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
        highlightWinningCells('h', i , j);
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
        highlightWinningCells('v', i, j);
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
          highlightWinningCells('rd', i, j);
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
          highlightWinningCells('ld', i, j);
          disableButtons();

          return currentSlotPiece;
        }
      }
    }
  }

  return false;
}

function highlightWinningCells(input, i, j)
{
  if (input == 'h')
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

  if (input == 'v')
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

  if (input == 'ld')
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

  if (input == 'rd')
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

function changeGridColor(gridColorInput)
{
    if (gridColorInput == player1Color || gridColorInput == player2Color)
    {
      choice = confirm("One of the pieces on the grid has the same color as the background you are choosing. Do you still want to go through with the current selection?");
      if (!choice)
      {
        return;
      }
    }
    switch (gridColorInput)
    {
        case 'skyblue':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.backgroundColor ="skyblue";
            }
            gridColor = 'skyblue';
            break;
        case 'red':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="red";
            }
            gridColor = 'red';
            break;
        case 'green':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="green";
            }
            gridColor = 'green';
            break;
        case 'white':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="white";
            }
            gridColor = 'white';
            break;
        case 'fuchsia':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="fuchsia";
            }
            gridColor = 'fuchsia';
            break;
        case 'silver':
            list = document.getElementsByClassName("gridCell");
            for (index = 0; index < list.length; ++index)
            {
              list[index].style.background ="silver";
            }
            gridColor = 'silver';
            break;
    }
}

function changeP1Color(p1ColorInput)
{
  //alert(gridColor);
  //alert(p1ColorInput);
  if (gridColor == p1ColorInput)
  {
    choice = confirm("Your choice of color for player ❌ is the same as the current background. Do you still want to go through with the current selection?");
    if (!choice)
    {
      return;
    }
  }
  switch (p1ColorInput)
  {
    case 'skyblue':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="skyblue";
        }
        player1Color = 'skyblue';
        break;
    case 'red':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="red";
        }
        player1Color = 'red';
        break;
    case 'green':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="green";
        }
        player1Color = 'green';
        break;
    case 'white':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="white";
        }
        player1Color = 'white';
        break;
    case 'fuchsia':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="fuchsia";
        }
        player1Color = 'fuchsia';
        break;
    case 'silver':
        list = document.getElementsByClassName("player1");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="silver";
        }
        player1Color = 'silver';
        break;
  }
}

function changeP2Color(p2ColorInput)
{
  if (gridColor == p2ColorInput)
  {
    choice = confirm("Your choice of color for player ⭕️ is the same as the current background. Do you still want to go through with the current selection?");
    if (!choice)
    {
      return;
    }
  }
  switch (p2ColorInput)
  {
    case 'skyblue':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="skyblue";
        }
        player2Color = 'skyblue';
        break;
    case 'red':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="red";
        }
        player2Color = 'red';
        break;
    case 'green':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="green";
        }
        player2Color = 'green';
        break;
    case 'white':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="white";
        }
        player2Color = 'white';
        break;
    case 'fuchsia':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="fuchsia";
        }
        player2Color = 'fuchsia';
        break;
    case 'silver':
        list = document.getElementsByClassName("player2");
        for (index = 0; index < list.length; ++index)
        {
          list[index].style.color ="silver";
        }
        player2Color = 'silver';
        break;
  }
}

function gridColorDropDown()
{
    document.getElementById("gridcolorDropdown").classList.toggle("show");
}

function playerOneColorDropDown()
{
    document.getElementById("p1colorDropdown").classList.toggle("show");
}

function playerTwoColorDropDown()
{
    document.getElementById("p2colorDropdown").classList.toggle("show");
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

/*
1 - p1
2 - p2
3 - p1
4 - p2
5 - p1
6 - p2
7 - p1
*/
