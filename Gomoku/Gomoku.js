var table;
var gridcell;

function resizeTable(tableSize) 
{
    let row;
    let cell;
    
    table = document.getElementById("gTable");

	table.innerHTML = " ";
	
	for(let i = 0; i < tableSize; i++)
	{
		row = table.insertRow(i);
		for (let j = 0; j < tableSize ; j++)
		{
			cell = row.insertCell(j);
			cell.innerHTML = '<div class = "gridCell">' + i.toString() + ',' + j.toString() + '</div>';
		}
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
