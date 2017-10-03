var table;

function resizeTable(input)
{
 	table = document.getElementById('gTable');

	table.innerHTML = "";
	let row;
	let cell;

	for(let i = 0; i <input; i++)
	{
		row = table.insertRow(i);
		for (let j = 0; j < input ; j++)
		{
			cell = row.insertCell(j);
			cell.innerHTML = '+';
		}
	}
}

function changeColor(gridColor)
{
	if (gridColor == 'sb')
	{
		table.style.backgroundColor = "skyblue";
	}
	if (gridColor == 'red')
	{
		table.style.backgroundColor = "red";
	}
	if (gridColor == 'green')
	{
		table.style.backgroundColor = "green";
	}
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
