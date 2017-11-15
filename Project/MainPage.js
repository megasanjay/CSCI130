function logout()
{
  sessionStorage.clear();
  window.open("Login.html", "_self", false);
}

function checkPrivilege()
{
  user = sessionStorage.getItem("currentUser");
  if (user == undefined)
  {
    alert("Please log into your account.");
    window.open("Login.html", "_self", false);
  }
}
