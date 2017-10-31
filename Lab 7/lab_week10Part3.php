<?php

// Sanjay Soundarajan - 109146095

date_default_timezone_set('UTC');

class Person
{
  private $firstName;
  private $lastName;
  private $dateOfBirth;
  private $address;
  
  public function displayFirstName()
  {
    echo $this->firstName;
    newLine();
  }
  
  public function displayLastName()
  {
    echo $this->lastName;
    newLine();
  }
  
  public function displayDateOfBirth()
  {
    echo $this->dateOfBirth;
    newLine();
  }
  
  public function displayAddress()
  {
    echo $this->address;
    newLine();
  }
  
  public function setFirstName($name)
  {
    $this->firstName = $name;
  }
  
  public function setLastName($name)
  {
    $this->lastName = $name;
  }
  
  public function setDateOfBirth($dob) // Needs to be in this format: "YYYY-MM-DD"
  {
    $x = new DateTime($dob);
    $this->dateOfBirth = $x->format('Y-m-d');
  }
  
  public function setAddress($add)
  {
    $this->address = $add;
  }
  
  public function findCurrentAge()
  {
    $now = new DateTime(Date("Y-m-d", time()));
    $origin =  new DateTime($this->dateOfBirth);
    
    $difference = $origin->diff($now);
    
    echo 'Difference: ' .
          $difference->y . ' years, ' . 
          $difference->m . ' months, ' . 
          $difference->d.' days';
    
    newLine();
  }
  
  public function displayAll() 
  {
    echo "Person Class";
    newLine();
    foreach ($this as $key => $value) 
    {
     echo "-- Person $key : $value";
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

class Student
{
  private $id;
  private $currentGPA;
  private $currentUnits;
  
  public function displayID()
  {
    echo $this->id;
    newLine();
  }
  
  public function displayGPA()
  {
    echo $this->currentGPA;
    newLine();
  }
  
  public function displayUnits()
  {
    echo $this->currentUnits;
    newLine();
  }
  
  public function setID($x)
  {
    $this->id = $x;
  }
  
  public function setGPA($x)
  {
    $this->currentGPA = $x;
  }
  
  public function setUnits($x)
  {
    $this->currentUnits = $x;
  }
  
  public function  __construct()
  {
    $this->id = mt_rand(1,5000);
    $this->currentGPA = mt_rand(0,400)/100;
    $this->currentUnits = mt_rand(0, 21);
  }
  
  public function displayAll() 
  {
    echo "Student Class";
    newLine();
    foreach ($this as $key => $value) 
    {
     echo "-- Student $key : $value";
     newLine();
    }
  }
  
  public function __toString()
  {
    return "The student with ID '$this->id' currently has a GPA of '$this->currentGPA' and is  taking '$this->currentUnits' units.";
    newLine();
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

class Faculty
{
  private $classesToTeach = array();
  private $rank;
  private $department;
  private $college;
  
  public function displayClasses()
  {
    for ($i = 0; $i < count($this->classesToTeach); $i++)
    {
      echo $this->classesToTeach[$i] . ', ';
    }
    newLine();
  }
  
  public function displayRank()
  {
    echo $this->rank;
    newLine();
  }
  
  public function displayDepartment()
  {
    echo $this->department;
    newLine();
  }
  
  public function displayCollege()
  {
    echo $this->college;
    newLine();
  }
  
  public function addClass($x)
  {
    $this->classesToTeach[] = $x;
  }
  
  public function setRank($x)
  {
    $this->rank = $x;
  }
  
  public function setDepartment($x)
  {
    $this->department = $x;
  }
  
  public function setCollege($x)
  {
    $this->college = $x;
  }
  
  public function displayAll() 
  {
    echo "Faculty Class";
    echo "-- Faculty rank : " .$this->displayRank();
    echo "-- Faculty classes : " .$this->displayClasses();
    echo "-- Faculty department : " .$this->displayDepartment();
    echo "-- Faculty college : " .$this->displayCollege();
  }
  
  public function __toString()
  {
    return "This Faculty Member has rank '$this->rank', teaches classes: $this->displayClasses() in the $this->department deaprtment at $this->college college.";
    newLine();
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

function newLine() 
{
  echo "<br>";
}

?>