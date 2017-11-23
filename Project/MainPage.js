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
    sessionStorage.setItem("lastPostViewed", -1);
  }
  populateMainPage();

}
function populateMainPage(){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  if(sessionStorage.getItem('lastPostViewed') == -1){
    httpRequest.send('action=' + encodeURIComponent('view') + '&postID=' + encodeURIComponent(-1));
  }
  else{
    httpRequest.send('action=' + encodeURIComponent('view') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));
  }
}

function fillInputFields(item, subClass){
  sessionStorage.setItem('lastPostViewed', item['postID']);
  let title = document.getElementById("postTitleBox");
  let postContent = document.getElementById("postDescription");
  let priceAmount = document.getElementById('postPrice');
  let itemInfo1 = document.getElementById('itemInfo1');
  let itemInfo2 = document.getElementById('itemInfo2');
  let itemInfo3 = document.getElementById('itemInfo3');


  let img = document.getElementById("postImage");
  img.src = item['postImage'];

  title.innerHTML = item['postTitle'];
  postContent.innerHTML = item['postDescription'];
  priceAmount.innerHTML = "Price: " + item['postPrice'];
  alert(item['postIssaBook']);
  if(item['postIssaBook']==1){
    itemInfo1.innerHTML = "Book Title: " + subClass['bookTitle'];
    itemInfo2.innerHTML = "Author: " + subClass['bookAuthor'];
    itemInfo3.innerHTML = "Pages: " + subClass['bookPages'];
  }
  else{
    itemInfo1.innerHTML = "Video Title: " + subClass['videoTitle'];
    itemInfo2.innerHTML = "Duration: " + subClass['videoDuration'];
    itemInfo3.innerHTML = "Genre: " + subClass['videoGenre'];
  }

}

function alertContents_loadMain(){
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      alert(httpRequest.status);
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;
        if(response == "End of list"){
          alert("End of List");
          return;
        }


        let item = JSON.parse(response);
        let subClass = JSON.parse(item['subClass']);

        fillInputFields(item, subClass);
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
function navigateTo(action){
  if(action == 'p'){
    var requestURL = "http://localhost:8888/getPost.php";
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContents_loadMain;
    httpRequest.open('POST', requestURL);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.send('action=' + encodeURIComponent('prev') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));

  }
  else{
    var requestURL = "http://localhost:8888/getPost.php";
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContents_loadMain;
    httpRequest.open('POST', requestURL);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.send('action=' + encodeURIComponent('next') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));
  }
}
