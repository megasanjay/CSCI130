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

  //$userName = $conn->real_escape_string($userName);

  $stmt = $conn->prepare("SELECT * FROM Users WHERE username = ?");
  if ($stmt==FALSE)
  {
  	echo "There is a problem with prepare <br>";
  	echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
  }
  $stmt->bind_param("s", $userName);

  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows != 0)
  {
    $row = $result->fetch_assoc(); // Fetch a result row as an associative array
    echo json_encode($row, JSON_PRETTY_PRINT);
    return;
  }
  else
  {
    echo "Username does not exist";
  }

  $conn->close();
}
else
{
  echo "Error 2";
}

?>
