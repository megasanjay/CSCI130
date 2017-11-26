<?php

include "projectClasses.php";

$servername = 'localhost'; // default server name
$serverusername = 'sanjay'; // user name that you created
$serverpassword = '0cKfzCiL7yVa2iol'; // password that you created
$dbname = 'project';

if (!empty($_POST))
{
  $action = $_POST['action'];
  $postID = $_POST['postID'];

  if ($action == 'view')
  {
    viewPost($postID);
    return;
  }
  if ($action == 'next')
  {
    nextPost($postID);
    return;
  }
  if ($action == 'delete')
  {
    deletePost($postID);
    return;
  }
  if ($action == 'prev')
  {
    prevPost($postID);
    return;
  }
  if ($action == 'comments')
  {
    getComments($postID);
    return;
  }
  if($action == 'deleteComment'){
    deleteComment($postID);
    return;
  }
  if($action == 'getUserInfo')
  {
    getUserInfo($postID);
    return;
  }
}

function getUserInfo($username)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT * FROM Users WHERE username = '{$username}'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  $user = new User();

  $user->setUserName($row["username"]);
  $user->setEmailAddress($row["email"]);
  $user->setFirstName($row["fname"]);
  $user->setLastName($row["lname"]);
  $user->setAddress($row["address"]);

  echo $user->toJSON();
  return;
}

function deleteComment($commentID){
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "DELETE FROM Comments WHERE commentID = '{$commentID}'";

  if ($conn->query($sql) === TRUE)
  {
    echo "Comment deleted";
  }
  else
  {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  return;
}

function getComments($postID){
  // Create connection
  $conn = mysqli_connect($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT * FROM Comments WHERE postID = '{$postID}' ORDER BY commentID ASC";
  $result = mysqli_query($conn,$sql);

  $rows = array();

  while($row = mysqli_fetch_assoc($result)){
    $rows[] = array("commentID"=>$row["commentID"],"postID"=>$row["postID"], "postUsername"=>$row["postUsername"], "commentText"=>$row["commentText"], "commentDate"=>$row["commentDate"]);
  }

  echo json_encode($rows);

  mysqli_close($conn);
}

function viewPost($postID)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT COUNT(postID) AS numPost FROM POSTS";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if($row["numPost"] == 0)
  {
    echo "no records";
    return;
  }

  if ($postID == -1)
  {
    $sql = "SELECT MAX(postID) AS pID FROM Posts ORDER BY postDateCreated DESC";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    $postID = $row["pID"];

    echo getCurrentObject($conn, $postID);

    $conn->close();

    return;
  }
  else // Case where we went to load back where the user was
  {
    echo getCurrentObject($conn, $postID);

    $conn->close();

    return;
  }
}

function nextPost($postID)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT COUNT(postID) AS numPost FROM POSTS";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if($row["numPost"] == 0)
  {
    echo "no records";
    return;
  }

  $sql = "SELECT MAX(postID) AS pID FROM Posts p WHERE p.postID < {$postID}";

  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if ($row["pID"] != null)
  {
    echo getCurrentObject($conn, $row["pID"]);
    return;
  }
  else
  {
    echo "End of list";
    return;
  }
}

function prevPost($postID)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT COUNT(postID) AS numPost FROM POSTS";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if($row["numPost"] == 0)
  {
    echo "no records";
    return;
  }

  $sql = "SELECT MIN(postID) AS pID FROM Posts p WHERE p.postID > {$postID}";

  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if ($row["pID"] != null)
  {
    echo getCurrentObject($conn, $row["pID"]);
    return;
  }
  else
  {
    echo "End of list";
    return;
  }
}

function deletePost($postID)
{
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['serverusername'], $GLOBALS['serverpassword'], $GLOBALS['dbname']);

  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT MIN(postID) AS pID FROM Posts";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  $pID = $row["pID"];

  $sql = "DELETE FROM Books WHERE postID = {$postID}";

  if ($conn->query($sql) === TRUE)
  {
    $sql = "DELETE FROM Posts WHERE postID = {$postID}";

    if ($conn->query($sql) === TRUE)
    {
      $sql = "DELETE FROM Comments WHERE postID = {$postID}";

      if($conn->query($sql) === TRUE){
        if ($pID == $postID)
        {
          echo "Record deletedp";
        }
        else {
          echo "Record deletedn";
        }
      }
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
}

function getCurrentObject($conn, $postID)
{
  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT * FROM Posts WHERE postID = {$postID}";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();

  if ($row["postIssaBook"] == '1')
  {
    $book = new Book();

    $sql = "SELECT * FROM Books WHERE postID = {$postID}";
    $result = $conn->query($sql);
    $bookRow = $result->fetch_assoc();

    $item = new Item();

    $item->setPostID($postID);
    $item->setPostUsername($row["postUsername"]);
    $item->setPostTitle($row["postTitle"]);
    $item->setPostDescription($row["postDescription"]);
    $item->setPostImage($row["postImage"]);
    $item->setPostDateCreated($row["postDateCreated"]);
    $item->setPostPrice($row["postPrice"]);
    $item->setPostIssaBook($row["postIssaBook"]);
    $item->setPostDateModified($row["postDateModified"]);
    $item->createBookSubClass($bookRow["bookTitle"], $bookRow["bookAuthor"], $bookRow["bookPages"]);
  }
  else
  {
    $video = new Video();

    $sql = "SELECT * FROM Videos WHERE postID = {$postID}";
    $result = $conn->query($sql);
    $videoRow = $result->fetch_assoc();

    $item = new Item();

    $item->setPostID($postID);
    $item->setPostUsername($row["postUsername"]);
    $item->setPostTitle($row["postTitle"]);
    $item->setPostDescription($row["postDescription"]);
    $item->setPostImage($row["postImage"]);
    $item->setPostDateCreated($row["postDateCreated"]);
    $item->setPostPrice($row["postPrice"]);
    $item->setPostIssaBook($row["postIssaBook"]);
    $item->setPostDateModified($row["postDateModified"]);
    $item->createVideoSubClass($videoRow["videoTitle"], $videoRow["videoDuration"], $videoRow["videoGenre"]);
  }

  return $item->toJSON();
}




/*

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
  $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);
  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed: " . $conn->connect_error ."<br>");
  }

  $sql = "SELECT MAX(postID) AS pID FROM Posts";

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
  $isbook = 1;

  // Create connection
  $conn = new mysqli($servername, $serverusername, $serverpassword, $dbname);

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

*/

?>
