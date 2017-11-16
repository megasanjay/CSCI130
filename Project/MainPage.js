function logout()
{
  sessionStorage.clear();
  window.open("Login.html", "_self", false);
}

function checkPrivilege()
{
  user = sessionStorage.getItem("currentUser");
  admin = sessionStorage.getItem("admin");
  //alert(admin);
  if (user == undefined)
  {
    alert("Please log into your account.");
    window.open("Login.html", "_self", false);
  }
  if(admin){
    //showAdminSettings();
  }

}
/* function showAdminSettings(){

}
*/
