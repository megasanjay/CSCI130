<?php

class User
{
  private $userID;
  private $userName;
  private $password;
  private $firstName;
  private $lastName;
  private $emailAddress;
  private $address;

  public function getuserID()
  {
    return $this->userID;
    //newLine();
  }

  public function getuserName()
  {
    return $this->userName;
    //newLine();
  }

  public function getpassword()
  {
    return $this->password;
    //newLine();
  }

  public function getFirstName()
  {
    return $this->firstName;
    //newLine();
  }

  public function getLastName()
  {
    return $this->lastName;
    //newLine();
  }

  public function getEmailAddress()
  {
    return $this->emailAddress;
    //newLine();
  }

  public function getAddress()
  {
    return $this->address;
    //newLine();
  }

  public function setFirstName($name)
  {
    $this->firstName = $name;
  }

  public function setLastName($name)
  {
    $this->lastName = $name;
  }

  public function setEmailAddress($email)
  {
    $this->emailAddress = $email;
  }

  public function setAddress($add)
  {
    $this->address = $add;
  }

  public function setUserID($uID)
  {
    $this->userID = $uID;
  }

  public function setUserName($name)
  {
    $this->userName = $name;
  }

  public function setPassword($pw)
  {
    $this->password = $pw;
  }

  public function displayAll()
  {
    echo "User Class";
    newLine();
    foreach ($this as $key => $value)
    {
     echo "-- User $key : $value";
     newLine();
    }
  }

  public function expose()
  {
    return get_object_vars($this);
  }

  public function toJSON()
  {
    $json = "";

    return json_encode($this->expose());
  }
}

class Book
{
  private $bookTitle;
  private $bookAuthor;
  private $bookPages;

  public function getBookTitle()
  {
    return $this->bookTitle;
  }

  public function setBookTitle($value)
  {
    $this->bookTitle = $value;
  }

  public function getBookAuthor()
  {
    return $this->bookAuthor;
  }

  public function setBookAuthor($value)
  {
    $this->bookAuthor = $value;
  }

  public function getBookPages()
  {
    return $this->bookPages;
  }

  public function setBookPages($value)
  {
    $this->bookPages = $value;
  }

  public function expose()
  {
    return get_object_vars($this);
  }

  public function toJSON()
  {
    $json = "";

    return json_encode($this->expose());
  }
}

class Video
{
  private $videoTitle;
  private $videoDuration;
  private $videoGenre;

  public function getVideoTitle()
  {
    return $this->videoTitle;
  }

  public function setVideoTitle($value)
  {
    $this->videoTitle = $value;
  }

  public function getVideoDuration()
  {
    return $this->videoDuration;
  }

  public function setVideoDuration($value)
  {
    $this->videoDuration = $value;
  }

  public function getVideoGenre()
  {
    return $this->videoGenre;
  }

  public function setVideoGenre($value)
  {
    $this->videoGenre = $value;
  }

  public function expose()
  {
    return get_object_vars($this);
  }

  public function toJSON()
  {
    $json = "";

    return json_encode($this->expose());
  }
}

class Item
{
  private $postID;
  private $postUsername;
  private $postTitle;
  private $postDescription;
  private $postImage;
  private $postDateCreated;
  private $postPrice;
  private $postDateModified;
  private $postIssaBook;
  private $subClass;

  public function createBookSubClass($bookTitle, $bookAuthor, $bookPages)
  {
    $x = new Book();

    $x->setBookTitle($bookTitle);
    $x->setBookAuthor($bookAuthor);
    $x->setBookPages($bookPages);

    $y = $x->toJSON();

    $this->subClass = $y;
  }

  public function createVideoSubClass($videoTitle, $videoDuration, $videoGenre)
  {
    $x = new Video();

    $x->setVideoTitle($videoTitle);
    $x->setVideoGenre($videoGenre);
    $x->setVideoDuration($videoDuration);

    $y = $x->toJSON();

    $this->subClass = $y;
  }

  public function getSubClass()
  {
    return $this->subClass;
  }

  public function getPostID()
  {
    return $this->postID;
  }

  public function setPostID($value)
  {
    $this->postID = $value;
  }

  public function getPostUsername()
  {
    return $this->postUsername;
  }

  public function setPostUsername($value)
  {
    $this->postUsername = $value;
  }

  public function getPostTitle()
  {
    return $this->postTitle;
  }

  public function setPostTitle($value)
  {
    $this->postTitle = $value;
  }

  public function getPostDescription()
  {
    return $this->postDescription;
  }

  public function setPostDescription($value)
  {
    $this->postDescription = $value;
  }

  public function getPostImage()
  {
    return $this->postImage;
  }

  public function setPostImage($value)
  {
    $this->postImage = $value;
  }

  public function getPostDateCreated()
  {
    return $this->postDateCreated;
  }

  public function setPostDateCreated($value)
  {
    $this->postDateCreated = $value;
  }

  public function getPostPrice()
  {
    return $this->postPrice;
  }

  public function setPostPrice($value)
  {
    $this->postPrice = $value;
  }

  public function getPostDateModified()
  {
    return $this->postDateModified;
  }

  public function setPostDateModified($value)
  {
    $this->postDateModified = $value;
  }

  public function getPostIssaBook()
  {
    return $this->postIssaBook;
  }

  public function setPostIssaBook($value)
  {
    $this->postIssaBook = $value;
  }

  public function displayAll()
  {
    echo "Item Class";
    newLine();
    foreach ($this as $key => $value)
    {
     echo "-- Item $key : $value";
     newLine();
    }
  }

  public function expose()
  {
    return get_object_vars($this);
  }

  public function toJSON()
  {
    $json = "";

    return json_encode($this->expose());
  }
}


/*$item = new Item();

$item->setPostID('3');
$item->setPostTitle('dfsdf');
$item->setPostDescription('dfsdf');
$item->setPostImage('dfsdf');
$item->setPostDateCreated('dfsdf');
$item->setPostPrice('dfsdf');
$item->setPostDateModified('dfsdf');
$item->createBookSubClass('sdfdf', 'dsfdsfdsf', 'dsfdsf');
/*
($item->getSubClass())->setBookTitle('dfsdf');
($item->getSubClass())->setBookAuthor('dfsdf');
($item->getSubClass())->setBookPages('dfsdf');


echo $item->toJSON();
*/

?>
