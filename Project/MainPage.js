function logout()
{
  sessionStorage.clear();
  window.open("Login.html", "_self", false);
}

function checkPrivilege()
{
  user = sessionStorage.getItem("currentUser");
  admin = sessionStorage.getItem("admin");

  if (user == undefined)
  {
    alert("Please log into your account.");
    window.open("Login.html", "_self", false);
  }
  if(admin == true){
    showAdminSettings();
  }
  let lastViewed = sessionStorage.getItem("lastPostViewed");
  if(lastViewed == undefined){
    sessionStorage.setItem("lastPostViewed", 10);
  }
  populateMainPage();

}
function populateMainPage(){
  let lastViewed = sessionStorage.getItem("lastPostViewed");
  if(lastViewed == -1){   // request the latest post (ordered by date)
    // make request objecct
  }

}
function showAdminSettings(){

  let deleteBtn = document.getElementById('deletePost');
  deleteBtn.classList.remove('menuHide');
  deleteBtn.classList.add('menuShow');
}
function newPost(){
  sessionStorage.setItem("action", "NP");
}
function editPost(){
  sessionStorage.setItem("action", "EP");
  sessionStorage.setItem("postID", sessionStorage.getItem("lastPostViewed"));

  window.open("NewPost.html", "_self", false);
  alert("Butts");
}
