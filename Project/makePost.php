<?php

$servername = 'localhost'; // default server name
$serverusername = 'sanjay'; // user name that you created
$serverpassword = '0cKfzCiL7yVa2iol'; // password that you created
$dbname = 'project';

if (!empty($_POST))
{
  $username = $_POST['userName'];
  $title = $_POST['title'];
  $image = $_POST['image'];
  $desc = $_POST['desc'];

  // Create connection
  $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT userID FROM Users WHERE username = '{$username}'";
  $result = $conn->query($sql);

  if ($result->num_rows != 0)
  {
    $row = $result->fetch_assoc();
    $userID = $row["userID"];
  }

  $sql = "SELECT MAX(postID) AS pID FROM Posts";
  $result = $conn->query($sql);

  if ($result->num_rows != 0)
  {
    $row = $result->fetch_assoc();
    $postID = $row["pID"];
    $postID = $postID + 1;
  }
  else
  {
    $postID = 0;
  }

  $sql = "INSERT INTO Posts (postID, postUserID, postTitle, postDescription, postImage, postDate) VALUES ";
  $sql = $sql . "('{$postID}', '{$userID}', '{$title}', '{$desc}' , '{$image}', CURDATE())";

  if ($conn->query($sql) === TRUE)
  {
    echo "New record created successfully";
  }
  else
  {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  //$stmt = $conn->prepare("INSERT INTO Users (userID, username, password, email, fname, lname, address) VALUES (?,?,?,?,?,?,?)");

/*  if ($stmt==FALSE)
  {
  	echo "There is a problem with prepare <br>";
  	echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
  }

  $stmt->bind_param("ssssidi", $firstname, $lastname,$dob,$address,$id, $current_gpa,$current_units);
*/


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
