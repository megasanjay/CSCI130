<?php

$servername = 'localhost'; // default server name
$serverusername = 'sanjay'; // user name that you created
$serverpassword = '0cKfzCiL7yVa2iol'; // password that you created
$dbname = 'project';

if(!empty($_POST)){
  $postID = $_POST["postID"];
  $postUsername = $_POST["postUsername"];
  $text = $_POST["text"];

  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT MAX(commentID) AS cID FROM Comments";
  $result = $conn->query($sql);

  if ($result->num_rows != 0)
  {
    $row = $result->fetch_assoc();
    $commentID = $row["cID"];
    $commentID = $commentID + 1;
  }
  else
  {
    $commentID = 0;
  }

  $sql = "INSERT INTO Comments (commentID, postID, postUsername, commentText, commentDate) VALUES ";
  $sql = $sql . "('{$commentID}', '{$postID}', '{$postUsername}', '{$text}' , CURDATE())";

  if ($conn->query($sql) === TRUE)
  {
    echo "Good News! Comment Posted";
  }
  else
  {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();

  return;
}

?>
