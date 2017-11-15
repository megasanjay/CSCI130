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
