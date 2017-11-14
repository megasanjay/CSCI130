function submit()
{
  let username = document.getElementById("usernameTextBox");
  let password = document.getElementById("passwordTextBox");
  let errorFlag = false;
  
  if (username.value == '' || password.value == '')
  {
      errorFlag = true;
      alert("Please fill all the fields in the page before clicking the 'Login' button.")
  }
  
  if (errorFlag == true)
  {
    if (username.value == '')
    {
      username.classList.remove("regularTextbox");
      username.classList.add("errorTextbox");
    }
    if (password.value == '')
    {
      password.classList.remove("regularTextbox");
      password.classList.add("errorTextbox");
    }
    
    return;
  }
  
  validateLogin(username, password);
}

function validateLogin(username, password)
{
  GetPassword(username); 
}

function GetPassword(username)
{
  var requestURL = "ValidateLogin.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_getPassword; 	
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send('username =' + encodeURIComponent(username));
  goodindex=httpRequest.onreadystatechange;
}

function alertContents_getPassword() 
{
  try 
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE) 
    {
      if (httpRequest.status === 200) 
      {
    	// alert(httpRequest.responseText);  // Just for debugging purposes
		var response = JSON.parse(httpRequest.responseText);  
		mydata = JSON.parse(JSON.stringify(response));
		
		if (mydata.hasOwnProperty('password')) 
        {
			let receivedPassword = mydata['password'];
            //do something
		}
		else 
        {
		alert('This username is not in the Database.');
		return 0;
		}
	  } 
      else 
      {
        alert('There was a problem with the request.');
      }
    }
	return 1;
  }
  catch(e) // Always deal with what can happen badly, client-server applications --> there is always something that can go wrong on one end of the connection
  {
    alert('Caught Exception: ' + e.description);
  }
}

