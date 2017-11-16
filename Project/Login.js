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
  GetPassword(username.value);
}

function GetPassword(username)
{
  var requestURL = "http://localhost:8888/loginValidation.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_getPassword;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send('username=' + encodeURIComponent(username));
}

function alertContents_getPassword()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;

        if (response == "Username does not exist")
        {
          document.getElementById("usernameTextBox").classList.remove("regularTextbox");
          document.getElementById("usernameTextBox").classList.add("errorTextbox");
          document.getElementById("passwordTextBox").classList.remove("regularTextbox");
          document.getElementById("passwordTextBox").classList.add("errorTextbox");
          alert("This username does not exist. Please enter the correct details or create a new account.");
          return;
        }

        response = JSON.parse(response);

        if (document.getElementById("passwordTextBox").value != response["password"])
        {
          document.getElementById("passwordTextBox").classList.remove("regularTextbox");
          document.getElementById("passwordTextBox").classList.add("errorTextbox");
          alert("Incorrect Password. Please enter the correct password");
          return;
        }

        if (document.getElementById("passwordTextBox").value == response["password"])
        {
          sessionStorage.setItem("currentUser", document.getElementById('usernameTextBox').value);
          if (response ["admin"] == 1)
          {
            sessionStorage.setItem("admin", true);
          }
          else
          {
            sessionStorage.setItem("admin", false);
          }

          window.open("MainPage.html", "_self", false);
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
