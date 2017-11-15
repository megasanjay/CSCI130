<?php

$servername = 'localhost'; // default server name
$username = 'sanjay'; // user name that you created
$password = '0cKfzCiL7yVa2iol'; // password that you created
$dbname = 'project';

if (!empty($_POST))
{
  $userName = $_POST['username'];

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT password FROM Users WHERE username = '"  . $userName . "'";

  $result = $conn->query($sql);

  if ($result->num_rows != 0)
  {
    $row = $result->fetch_assoc(); // Fetch a result row as an associative array
    //echo $row["password"];
    echo $row["password"];

    return;
  }
  else
  {
    echo "Username does not exist";
      //echo "Error 1";
  }

  $conn->close();

	//echo 'Index value='. $index .'<br>';
}
else
{
  //$index = -1;
  echo "Error 2";
  //echo "no data supplied";
}

?>
