
function showImage()
{
  let modal = document.getElementById('myModal');
  let image = document.getElementById('postImage');
  let modalImg = document.getElementById("img01");

  modal.style.display = "block";
  modalImg.src = image.src;
}

function closeSpan()
{
  let modal = document.getElementById('myModal');
  modal.style.display = "none";
}

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
  let sortBy = sessionStorage.getItem("sortBy");

  if(lastViewed == undefined)
  {
    sessionStorage.setItem("lastPostViewed", -1);
  }
  if(sortBy == undefined){
    sessionStorage.setItem("sortBy", "date");
  }

  populateMainPage();
}

function populateMainPage()
{
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  httpRequest.send('action=' + encodeURIComponent('view') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + '&sort=' + encodeURIComponent(sessionStorage.getItem('sortBy')));
}

function sortBy(option){
  sessionStorage.setItem("sortBy", option);
  sessionStorage.setItem("lastPostViewed", -1);
  location.reload();
}

function loadComments(){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadComments;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  httpRequest.send('action=' + encodeURIComponent('comments') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));
}

function alertContents_loadComments(){
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;

        if(response == "Comment deleted"){
          alert("GOOD NEWS! Comment Deleted :D");
          location.reload();
          return;
        }

        comments = JSON.parse(response);
        showComments(comments);
      }
      else
      {
        alert('There was a problem with the request.');
      }
    }
	return 1;
  }
  catch(e)
  {
    alert('Caught Exception: ' + e.description);
  }
}

function searchPost(){
  let input = document.getElementById('searchTextBox');

  if(input.value == ""){
    alert("You haven't entered anything silly!");
    return;
  }

  sessionStorage.setItem("issaSearch", 1);

  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  httpRequest.send('action=' + encodeURIComponent('search') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + '&query=' + encodeURIComponent(input.value));
}

function showComments(comments){
  let table = document.getElementById("commentTable");

  table.innerHTML = "";
  document.getElementById("newComment").value = "";

  for(let i = 0; i < comments.length; i++)
  {
    let row = table.insertRow(i);
    let cell = row.insertCell(0);

    let commentInfo = document.createElement("div");
    let commentTextField = document.createElement("div");
    let deleteBtn = document.createElement("button");


    commentInfo.classList.add("commentHeader");
    commentInfo.innerHTML = "Posted by <span class='comment_header'>" + comments[i].postUsername + "</span> on <span class='comment_header'>" + comments[i].commentDate + "</span>";

    commentTextField.classList.add("commentText");
    commentTextField.innerHTML = comments[i].commentText;

    deleteBtn.innerHTML = "Delete Comment";
    deleteBtn.classList.add("menuHide");
    deleteBtn.classList.add("deleteButton");
    deleteBtn.addEventListener('click', function()
      {
        deleteComment(comments[i].commentID);
      });

    cell.appendChild(commentInfo);
    cell.appendChild(commentTextField)
    cell.appendChild(deleteBtn);

    if(comments[i].postUsername == sessionStorage.getItem("currentUser")){
      deleteBtn.classList.remove("menuHide");
      deleteBtn.classList.add("menuShow");
    }
    else if(sessionStorage.getItem("admin") == true){
      deleteBtn.classList.remove("menuHide");
      deleteBtn.classList.add("menuShow");
    }
  }

  return;
}

function deleteComment(commentID){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadComments;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  httpRequest.send('action=' + encodeURIComponent('deleteComment') + '&postID=' + encodeURIComponent(commentID));
}

function fillInputFields(item, subClass)
{
  let title = document.getElementById("postTitleBox");
  let postContent = document.getElementById("postDescription");
  let priceAmount = document.getElementById('postPrice');
  let itemInfo1 = document.getElementById('itemInfo1');
  let itemInfo2 = document.getElementById('itemInfo2');
  let itemInfo3 = document.getElementById('itemInfo3');
  let img = document.getElementById("postImage");
  let vid = document.getElementById("dsfdsf");
  let username = document.getElementById("postUsername");
  let postDate = document.getElementById("postDate");

  sessionStorage.setItem('lastPostViewed', item['postID']);
  //alert(item['postID']);
  username.innerHTML = item['postUsername'];
  postDate.innerHTML = item['postDateCreated'];
  title.innerHTML = item['postTitle'];
  postContent.innerHTML = item['postDescription'];
  priceAmount.innerHTML = "Price: " + item['postPrice'];

  if(item['postIssaBook']==1)
  {
    img.removeAttribute("hidden");
    img.src = item['postImage'];
    vid.setAttribute("hidden", true);
    itemInfo1.innerHTML = "Book Title: " + subClass['bookTitle'];
    itemInfo2.innerHTML = "Author: " + subClass['bookAuthor'];
    itemInfo3.innerHTML = "Pages: " + subClass['bookPages'];
  }
  else
  {
    vid.removeAttribute("hidden");
    vid.setAttribute('src', item['postImage']);
    img.setAttribute("hidden", true);
    itemInfo1.innerHTML = "Video Title: " + subClass['videoTitle'];
    itemInfo3.innerHTML = "Genre: " + subClass['videoGenre'];

    let duration = subClass['videoDuration'];
    if (duration <= 59)
    {
      itemInfo2.innerHTML = "Duration: 0:0:" + duration;
    }
    else if (duration < 3599)
    {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      itemInfo2.innerHTML = "Duration: 0:" + minutes + ":"+ seconds;
    }
    else
    {
      let hours = Math.floor(duration / 3600);
      duration = duration - hours * 3600;
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      itemInfo2.innerHTML = "Duration: " + hours + ":" + minutes + ":" + seconds;
    }

  }

  if (item['postUsername'] == sessionStorage.getItem("currentUser"))
  {
    showUserButtons();
  }
  else
  {
    hideUserButtons();
  }

  loadComments();
}

function alertContents_loadMain()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;

        if(sessionStorage.getItem("issaSearch") == 1)
        {
          sessionStorage.setItem("issaSearch", 0);
          document.getElementById("nextPost").style.display = "none";
          document.getElementById("prevPost").style.display = "none";
        }
        else {
          document.getElementById("nextPost").style.display = "block";
          document.getElementById("prevPost").style.display = "block";
        }

        if(response == "End of list")
        {
          alert("There are no more posts to view at this time.");
          return;
        }

        if (response == "no records"){
          let itemBox = document.getElementById('no');
          itemBox.innerHTML = "<img id='travolta' src='https://thumbs.gfycat.com/UntidyPlumpDore-small.gif'/>";
          sessionStorage.setItem('lastPostViewed', -1);
          return;
        }

        if(response == "Record deletedn"){
          navigateTo('next');
          return;
        }

        if(response == "Record deletedp"){
          navigateTo('prev');
          return;
        }

        if(response == "Good News! Comment Posted")
        {
          location.reload();
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
  catch(e)
  {
    alert('Caught Exception: ' + e.description);
  }
}

function showAdminSettings()
{
  let deleteBtn = document.getElementById('deletePost');
  deleteBtn.classList.remove('menuHide');
  deleteBtn.classList.add('menuShow');
}

function showUserButtons()
{
  let deleteBtn = document.getElementById('deletePost');
  let editBtn = document.getElementById('editPost');
  deleteBtn.classList.remove('menuHide');
  deleteBtn.classList.add('menuShow');
  editBtn.classList.remove('menuHide');
  editBtn.classList.add('menuShow');
}

function hideUserButtons()
{
  let deleteBtn = document.getElementById('deletePost');
  let editBtn = document.getElementById('editPost');
  editBtn.classList.remove('menuShow');
  editBtn.classList.add('menuHide');
  deleteBtn.classList.remove('menuShow');
  deleteBtn.classList.add('menuHide');

  if (sessionStorage.getItem("admin") == true)
  {
    showAdminSettings();
  }
}

function newPost()
{
  sessionStorage.setItem("action", "NP");
  window.open("NewPost.html", "_self", false);
}

function editPost()
{
  sessionStorage.setItem("action", "EP");
  sessionStorage.setItem("postID", sessionStorage.getItem("lastPostViewed"));

  window.open("NewPost.html", "_self", false);
}

function navigateTo(action)
{
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  httpRequest.send('action=' + encodeURIComponent(action) + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + '&sort=' + encodeURIComponent(sessionStorage.getItem('sortBy')));
}
function addComment(){
  let text = document.getElementById("newComment");
  if(text.value == ''){
    alert("Please enter a comment");
    return;
  }
  var requestURL = "http://localhost:8888/postComment.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  httpRequest.send('postID='+ encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + "&postUsername=" + encodeURIComponent(sessionStorage.getItem('currentUser'))+ "&text=" + encodeURIComponent(text.value));
}
function deletePost(){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_loadMain;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  httpRequest.send('action=' + encodeURIComponent('delete') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));
}
