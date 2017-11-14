function submit()
{
  let username = document.getElementById("usernameTextBox");
  let password = document.getElementById("passwordTextBox");
  let errorFlag = false;
  
  if (username.value == '' || password.value == '')
  {
      errorFlag = true;
      alert("Please fill all the fields in the page before clicking the 'Login' button")
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
