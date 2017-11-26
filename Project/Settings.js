function saveSettings()
{
  let password = document.getElementById("passwordTextBox");
  let confirmPassword = document.getElementById("confirmPasswordTextBox");
  let firstName = document.getElementById("firstNameTextBox");
  let lastName = document.getElementById("lastNameTextBox");
  let email = document.getElementById("emailTextBox");
  let address = document.getElementById("addressTextBox");
  let errorFlag = false;

  if (email.value == '')
  {
    email.classList.remove("regularTextbox");
    email.classList.add("errorTextbox");
    alert("Please fill all the fields in the page before clicking the 'Create Account' button.");
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

  if(!validateString(firstName)){
    alert("Please enter a valid first name");
    firstName.classList.remove("regularTextbox");
    firstName.classList.add("errorTextbox");
    return;
  }

  if(!validateString(lastName)){
    alert("Please enter a valid last name");
    lastName.classList.remove("regularTextbox");
    lastName.classList.add("errorTextbox");
    return;
  }

  submitEdit(password, email, firstName, lastName, address);
}

function validateString(str){
    if(str.value == '')
    {
      return true;
    }
    var re = /^[A-Za-z]+$/;
    if(re.test(str.value))
       return true;
    else
       return false;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkPrivilege()
{
  user = sessionStorage.getItem("currentUser");

  if (user == undefined)
  {
    alert("Please log into your account.");
    window.open("Login.html", "_self", false);
  }

  loadDetails();
}

function loadDetails()
{
  let userName = document.getElementById('usernameTextBox');

  userName.value = sessionStorage.getItem("currentUser");

  loadUserInfo();
}

function loadUserInfo(){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadEdit;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  httpRequest.send('action=' + encodeURIComponent('getUserInfo') + '&postID=' +  encodeURIComponent(sessionStorage.getItem("currentUser")));
}

function submitEdit(password, email, firstName, lastName, address)
{
  var requestURL = "http://localhost:8888/makePost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_submitEdit;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  let userInfo = new Object();

  userInfo.username = sessionStorage.getItem("currentUser");
  userInfo.password = password.value;
  userInfo.email = email.value;
  userInfo.firstName = firstName.value;
  userInfo.lastName = lastName.value;
  userInfo.address = address.value;

  httpRequest.send('action=' + encodeURIComponent('update') + '&object=' + JSON.stringify(userInfo));
}

function alertContents_submitEdit()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
    		var response = httpRequest.responseText;

        if (response == "email already exists")
        {
          alert("This email is already in use by another account. Please use a different email to sign up for an account.");
          document.getElementById("emailTextBox").classList.remove("regularTextbox");
          document.getElementById("emailTextBox").classList.add("errorTextbox");
          document.getElementById("passwordTextBox").value = "";
          document.getElementById("confirmPasswordTextBox").value = "";
          return;
        }

        if (response == "settings updated")
        {
          alert("Settings successfully updated xD");
          window.open("MainPage.html", "_self", false);
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

function alertContents_loadEdit()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
    		var response = httpRequest.responseText;

        let userInfo = JSON.parse(response);

        fillInputFields(userInfo);
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

function fillInputFields(userInfo)
{
  let firstName = document.getElementById("firstNameTextBox");
  let lastName = document.getElementById("lastNameTextBox");
  let email = document.getElementById("emailTextBox");
  let address = document.getElementById("addressTextBox");

  firstName.value = userInfo.firstName;
  lastName.value = userInfo.lastName;
  email.value = userInfo.emailAddress;
  address.value = userInfo.address;
  return;
}
