var table;
var tableSize;
var gridcell;
var gridArray;
var currentPlayer;
var turnCount;
var playerGameMode;

function gameModeFunction(input)
{
  if (input == 1)
  {
    playerGameMode = 1;
  }
  else
  {
    playerGameMode = 2;
  }
}

function resizeTable(tsize)
{
  let row;
  let cell;

  tableSize = tsize;

  turnCount = 1;
  currentPlayer = 'p1';

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
			cell.innerHTML = '<button class = "gridCell" onclick="clickFunction(' + i + ',' + j + ')"></button>';
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
    alert("Player 1 wins!");
    return;
  }
  else if (winWinNoMatterWhat == 2)
  {
    alert("Player 2 wins!");
  }
}

function checkWin()
{
  let currentSlotPiece;
  let wincounter;

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

      if (gridArray[i][j+1] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[i][j+1];
      }

      if (wincounter == 5)
      {
        disableButtons();
        return currentSlotPiece;
      }
    }
  }

  // Vertical check
  for (let i = 0; i < tableSize; i++)
  {
    wincounter = 1;
    for (let j = 0; j < tableSize - 4; j++)
    {
      if (gridArray[j][i] == 0)
      {
        continue;
      }

      currentSlotPiece = gridArray[j][i];

      if (gridArray[j+1][i] == currentSlotPiece)
      {
        wincounter++;
      }
      else
      {
        wincounter = 1;
        currentSlotPiece = gridArray[j+1][i];
      }

      if (wincounter == 5)
      {
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
      wincounter = 1;

      let i, j;

      for (i = row, j = column; i < tableSize - 1 && j < tableSize - 1; i++, j++)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        console.log(i + " " + j + " " + wincounter);

        if (gridArray[i+1][j+1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        if (wincounter == 5)
        {
          return currentSlotPiece;
        }
      }
    }
  }

  // Left diagonal check
  for (let row = 0; row < 11; row++)
  {
    for (let column = tableSize - 1; column > 3; column--)
    {
      wincounter = 1;

      let i, j;

      for (i = row, j = column; i < tableSize - 1 && j > 0; i++, j--)
      {

        if (gridArray[i][j] == 0)
        {
          continue;
        }

        currentSlotPiece = gridArray[i][j];

        //console.log(i + " " + j + " " + wincounter);

        if (gridArray[i+1][j-1] == currentSlotPiece)
        {
          wincounter++;
        }
        else
        {
          wincounter = 1;
        }

        if (wincounter == 5)
        {
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

function displayFunction(i, j)
{
  let currentCell = document.getElementById("gTable").rows[i].cells[j];

  if (currentPlayer == 'p1')
  {
    currentCell.innerHTML = '<button class = "gridCell" onclick="clickFunction(' + i + ',' + j + ')">❌</button>';
    currentPlayer = 'p2';
  }
  else
  {
    currentCell.innerHTML = '<button class = "gridCell" onclick="clickFunction(' + i + ',' + j + ')">⭕️</button>';
    currentPlayer = 'p1';
  }
}

function changeColor(gridColor)
{
    switch (gridColor)
    {
        case 'skyblue':
            table.style.backgroundColor = "skyblue";
            break;
        case 'red':
            table.style.backgroundColor = "red";
            break;
        case 'green':
            table.style.backgroundColor = "green";
            break;
        case 'noC':
            table.style.background = "none";
            break;
        case 'fuchsia':
            table.style.backgroundColor = "fuchsia";
            break;
        case 'silver':
            table.style.backgroundColor = "silver";
            break;
    }
}

function colorDropDown() {
    document.getElementById("colorDropdown").classList.toggle("show");
}

function sizeDropDown() {
    document.getElementById("sizeDropdown").classList.toggle("show");
}

function gameModeDropDown() {
    document.getElementById("gameModeDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropdownButt")) {

    var dropdowns = document.getElementsByClassName("clickContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}
