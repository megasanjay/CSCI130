<?php

$servername = 'localhost'; // default server name
$serverusername = 'sanjay'; // user name that you created
$serverpassword = '0cKfzCiL7yVa2iol'; // password that you created
$dbname = 'project';

if(!empty($_POST)){
  $action = $_POST["action"];
  $object = json_decode($_POST["object"], true);

  if($action == "new"){
    newPost($object);
  }
  if($action == "update"){
    update($object);
  }
  if($action == "edit")
  {
    $postID = $_POST["postID"];
    editPost($object, $postID);
  }
}

function update($object)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT * FROM Users WHERE email = '{$email}'";
  $result = $conn->query($sql);

  if ($result->num_rows != 0)
  {
    echo "email already exists";
    return;
  }

  $sql = "UPDATE Users SET password='" . $object["password"] . "', email='" . $object["email"] . "', fname='" . $object["firstName"] . "', lname='" . $object["lastName"] . "', address='" . $object["address"] . "' WHERE username='" . $object["username"] . "'";

  if ($conn->query($sql) === TRUE)
  {
    echo "settings updated";
  }
  else
  {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

function editPost($object, $postID){
  //echo "TEST";
  //return;
  if($object["isbook"]){
    $username = $object["username"];
    $postTitle = $object["postTitle"];
    $content = $object["content"];
    $image = $object["image"];
    $price = $object["price"];
    $bookTitle = $object["bookTitle"];
    $bookAuthor = $object["bookAuthor"];
    $bookPages = $object["bookPages"];

    // Create connection
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error ."<br>");
    }
    $sql = "UPDATE Posts SET postTitle='{$postTitle}', postDescription='{$content}', postImage='{$image}', postPrice='{$price}', postDateModified= CURDATE() WHERE postID = '{$postID}' ";

    if ($conn->query($sql) === TRUE) {
      $sql = "UPDATE Books SET bookTitle='{$bookTitle}', bookAuthor='{$bookAuthor}', bookPages='{$bookPages}' WHERE postID = '{$postID}'";
      if ($conn->query($sql) === TRUE) {
        echo "record updated";
      }
      else {
        echo "Error updating record: " . $conn->error;
      }
    }
    else {
      echo "Error updating record: " . $conn->error;
    }

    $conn->close();
  }
  else{
    $username = $object["username"];
    $postTitle = $object["postTitle"];
    $content = $object["content"];
    $image = $object["image"];
    $price = $object["price"];
    $videoTitle = $object["videoTitle"];
    $videoDuration = $object["videoDuration"];
    $videoGenre = $object["videoGenre"];

    // Create connection
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error ."<br>");
    }

    $sql = "UPDATE Posts SET postTitle='{$postTitle}', postDescription='{$content}', postImage='{$image}', postPrice='{$price}', postDateModified= CURDATE() WHERE postID = '{$postID}' ";

    if ($conn->query($sql) === TRUE) {
      $sql = "UPDATE Videos SET videoTitle='{$videoTitle}', videoDuration='{$videoDuration}', videoGenre='{$videoGenre}' WHERE postID = '{$postID}'";
      if ($conn->query($sql) === TRUE) {
        echo "record updated";
      }
      else {
        echo "Error updating record: " . $conn->error;
      }
    }
    else {
      echo "Error updating record: " . $conn->error;
    }
  }
}


function newPost($object){
  if ($object["isbook"] == true)
  {
    $username = $object["username"];
    $postTitle = $object["postTitle"];
    $content = $object["content"];
    $image = $object["image"];
    $price = $object["price"];
    $bookTitle = $object["bookTitle"];
    $bookAuthor = $object["bookAuthor"];
    $bookPages = $object["bookPages"];
    $isbook = 1;

    // Create connection
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error ."<br>");
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

    $sql = "INSERT INTO Posts (postID, postUsername, postTitle, postDescription, postImage, postDateCreated, postPrice, postDateModified, postIssaBook) VALUES ";
    $sql = $sql . "('{$postID}', '{$username}', '{$postTitle}', '{$content}' , '{$image}', CURDATE(), '{$price}', CURDATE(), '{$isbook}')";

    if ($conn->query($sql) === TRUE)
    {
      $sql = "INSERT INTO Books (postID, bookTitle, bookAuthor, bookPages) VALUES ";
      $sql = $sql . "('{$postID}', '{$bookTitle}', '{$bookAuthor}', '{$bookPages}')";

      if ($conn->query($sql) === TRUE)
      {
        echo "New record created successfully";
      }
      else
      {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }
    }
    else
    {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

    return;
  }
  else
  {
    $username = $object["username"];
    $postTitle = $object["postTitle"];
    $content = $object["content"];
    $image = $object["image"];
    $price = $object["price"];
    $videoTitle = $object["videoTitle"];
    $videoDuration = $object["videoDuration"];
    $videoGenre = $object["videoGenre"];
    $isbook = 0;

    // Create connection
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

    // Check connection
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error ."<br>");
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

    $sql = "INSERT INTO Posts (postID, postUsername, postTitle, postDescription, postImage, postDateCreated, postPrice, postDateModified, postIssaBook) VALUES ";
    $sql = $sql . "('{$postID}', '{$username}', '{$postTitle}', '{$content}' , '{$image}', CURDATE(), '{$price}', CURDATE(), '{$isbook}')";

    if ($conn->query($sql) === TRUE)
    {
      $sql = "INSERT INTO Videos (postID, videoTitle, videoDuration, videoGenre) VALUES ";
      $sql = $sql . "('{$postID}', '{$videoTitle}', '{$videoDuration}', '{$videoGenre}')";

      if ($conn->query($sql) === TRUE)
      {
        echo "New record created successfully";
      }
      else
      {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }
    }
    else
    {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

    return;
  }
}


?>
