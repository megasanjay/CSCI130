function createAccount()
{
  let username = document.getElementById("usernameTextBox");
  let password = document.getElementById("passwordTextBox");
  let confirmPassword = document.getElementById("confirmPasswordTextBox");
  let email = document.getElementById("emailTextBox");
  let errorFlag = false;

  if (username.value == '' || password.value == '' || confirmPassword.value == '' || email.value == '')
  {
      errorFlag = true;
      alert("Please fill all the fields in the page before clicking the 'Create Account' button.")
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
    if (confirmPassword.value == '')
    {
      confirmPassword.classList.remove("regularTextbox");
      confirmPassword.classList.add("errorTextbox");
    }
    if (email.value == '')
    {
      email.classList.remove("regularTextbox");
      email.classList.add("errorTextbox");
    }

    return;
  }

  if (password.value.length > 30)
  {
    alert("The password cannot be more than 30 characters");
    password.classList.remove("regularTextbox");
    password.classList.add("errorTextbox");
    return;
  }

  if (password.value != confirmPassword.value)
  {
    alert("The passwords do not match. Please retype both passwords.");
    document.getElementById("passwordTextBox").value = "";
    document.getElementById("confirmPasswordTextBox").value = "";
    password.classList.remove("regularTextbox");
    password.classList.add("errorTextbox");
    confirmPassword.classList.remove("regularTextbox");
    confirmPassword.classList.add("errorTextbox");
    return;
  }

  emailvalidation = validateEmail(email.value);

  if (emailvalidation == false)
  {
    alert("Invalid email. Please re-enter a valid email.");
    email.classList.remove("regularTextbox");
    email.classList.add("errorTextbox");
    return;
  }

  checkUserName(username.value, password.value, email.value);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkUserName(username, password, email)
{
  var requestURL = "http://localhost:8888/createValidation.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_checkUserName;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  let text = "";
  text = 'userName=' + encodeURIComponent(username);
  text = text + '&password=' + encodeURIComponent(password);
  text = text + '&email=' + encodeURIComponent(email);

  httpRequest.send(text);
}

function alertContents_checkUserName()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
    		var response = httpRequest.responseText;

        if (response == "username already exists")
        {
          alert("This username already exists. Please select a new username.")
          document.getElementById("usernameTextBox").classList.remove("regularTextbox");
          document.getElementById("usernameTextBox").classList.add("errorTextbox");
          document.getElementById("passwordTextBox").value = "";
          document.getElementById("confirmPasswordTextBox").value = "";
          return;
        }

        if (response == "email already exists")
        {
          alert("This email is already in use by another account. Please use a different email to sign up for an account.");
          document.getElementById("emailTextBox").classList.remove("regularTextbox");
          document.getElementById("emailTextBox").classList.add("errorTextbox");
          document.getElementById("passwordTextBox").value = "";
          document.getElementById("confirmPasswordTextBox").value = "";
          return;
        }

        if (response == "New record created successfully")
        {
          alert("User account created. You can log into your account now.");
          return;
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
