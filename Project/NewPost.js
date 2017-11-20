function checkPrivilege(){

  showform('radio1');
  user = sessionStorage.getItem("currentUser");

    if (user == undefined)
    {
      alert("Please log into your account.");
      window.open("Login.html", "_self", false);
    }
    if(sessionStorage.getItem('action') == "EP"){
      fillInputFields();
    }
}
function fillInputFields(){
  var requestURL = "http://localhost:8888/getPost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alert_fillInputFields;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  alert(sessionStorage.getItem('lastPostViewed'));
  httpRequest.send('action=' + encodeURIComponent('view') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')));
}

function alert_fillInputFields(){
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      alert(httpRequest.status);
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;
        alert(response);
        return;
        let item = JSON.parse(response);
        alert(item['postTitle']);
        return;
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
function showform(val)
{
  var bookform =  document.getElementById("bookform");
  var videoform =  document.getElementById("videoform");
  bookform.style.display = 'block';   // show
  videoform.style.display = 'none';// hide

  if(val == 'radio1')
  {
      bookform.style.display = 'block';
      videoform.style.display = 'none';
  }
  else if(val == 'radio2'){
       bookform.style.display = 'none';
       videoform.style.display = 'block';
  }
}

function submit()
{
  let title = document.getElementById("titleTextBox");
  let postContent = document.getElementById("descriptionTextBox");
  let imageLink = document.getElementById("imageTextBox");
  let priceAmount = document.getElementById('priceTextBox');
  let bookRadio = document.getElementById('r12');
  let videoRadio = document.getElementById('r22');
  let bookTitle = document.getElementById('bookTitleTextBox');
  let bookAuthor = document.getElementById('bookAuthorTextBox');
  let bookPages = document.getElementById('bookPagesTextBox');
  let videoTitle = document.getElementById('VideoTitleTextBox');
  let videoDuration = document.getElementById('VideoTitleTextBox');
  let videoGenre = document.getElementById('videoGenreDropdown');

  let errorFlag = false;

  if (title.value == '' | priceAmount.value == '')
  {
      alert("Please fill all the required fields before submitting the post")
      errorFlag = true;
  }

  if (errorFlag == true)
  {
    if (title.value == '')
    {
      title.classList.remove("regularTextbox");
      title.classList.add("errorTextbox");
    }
    if (priceAmount.value == '')
    {
      priceAmount.classList.remove("regularTextarea");
      priceAmount.classList.add("errorTextarea");
    }
    return;
  }

  let string = imageLink.value;

  if (validateImageLink(string))
  {
    alert("Invalid image link.")
    imageLink.classList.remove("regularTextarea");
    imageLink.classList.add("errorTextarea");
    return;
  }

  let username = sessionStorage.getItem("currentUser");
  let image = "";

  if (string.indexOf(".jpg") !== -1)
  {
    image = string + ".jpg";
  }
  else
  {
    image = string;
  }

  price = priceAmount.value

  if(isNaN(price) == false)
  {
    price = parseInt(price);
  }
  else
  {
    alert("The price contains invalid characters");
    priceAmount.classList.remove("regularTextarea");
    priceAmount.classList.add("errorTextarea");
    return;
  }

  errorFlag = false;

  if (bookRadio.checked)
  {
    if (bookTitle.value == '' || bookAuthor.value == '' || bookPages.value == '')
    {
      errorFlag = true;
    }

    if (errorFlag == true)
    {

      alert("Please fill all the required fields before submitting the post");
      if (bookTitle.value == '')
      {
        bookTitle.classList.remove("regularTextarea");
        bookTitle.classList.remove("errorTextarea");
      }
      if (bookAuthor.value == '')
      {
        bookAuthor.classList.remove("regularTextarea");
        bookAuthor.classList.remove("errorTextarea");
      }
      if (bookPages.value == '')
      {
        bookPages.classList.remove("regularTextarea");
        bookPages.classList.remove("errorTextarea");
      }
      return;
    }

    let pages = bookPages.value;

    if(isNaN(pages) == false)
    {
      pages = parseInt(pages);
    }
    else
    {
      alert("The number of pages contains invalid characters");
      bookPages.classList.remove("regularTextarea");
      bookPages.classList.add("errorTextarea");
      return;
    }

    var bookObject = new Object();
    bookObject.username = username;
    bookObject.postTitle = title.value;
    bookObject.content = postContent.value;
    bookObject.image = image;
    bookObject.price = price;
    bookObject.bookTitle = bookTitle.value;
    bookObject.bookAuthor = bookAuthor.value;
    bookObject.bookPages = pages;
    bookObject.isbook = true;

    submitPost(bookObject);
  }
  else
  {
    if (videoTitle.value == '' || videoDuration.value == '')
    {
      errorFlag = true;
    }

    if (errorFlag == true)
    {
      alert("Please fill all the required fields before submitting the post");
      if (videoTitle.value == '')
      {
        videoTitle.classList.remove("regularTextarea");
        videoTitle.classList.remove("errorTextarea");
      }
      if (videoDuration.value == '')
      {
        videoDuration.classList.remove("regularTextbox");
        videoDuration.classList.add("errorTextbox");
      }
      return;
    }

    //check duration here

    var videoObject = new Object();
    videoObject.username = username;
    videoObject.postTitle = title.value;
    videoObject.content = postContent.value;
    videoObject.image = image;
    videoObject.price = price;
    videoObject.videoTitle = videoTitle.value;
    videoObject.videoDuration = videoDuration.value;
    videoObject.videoGenre = videoGenre.value;
    videoObject.isbook = false;

    submitPost(videoObject);
  }
}

function validateImageLink(string)
{
  substring = ".com/a/";
  if (string.indexOf(substring) !== -1)
  {
    return false;
  }
  substring = "/gallery";
  if (string.indexOf(substring) !== -1)
  {
    return false;
  }
}

function submitPost(newObject)
{
  var requestURL = "http://localhost:8888/makePost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_submitPost;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  httpRequest.send(JSON.stringify(newObject))
}

function alertContents_submitPost()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;

        alert(response);
        //alert(JSON.parse(response));
        return;

        if (response == "New record created successfully")
        {
          window.opener.location.reload(true);
          alert("Your post has been submited. ^-^ Click 'Okay' to go back to browsing.");
          window.close();
          return;
        }
        else
        {
          alert(response);
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
