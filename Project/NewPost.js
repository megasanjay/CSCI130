function checkPrivilege()
{
  showform('radio1');
  user = sessionStorage.getItem("currentUser");

  if (user == undefined)
  {
    alert("Please log into your account.");
    window.open("Login.html", "_self", false);
  }

  if(sessionStorage.getItem('action') == "EP")
  {
    var requestURL = "http://localhost:8888/getPost.php";
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alert_fillInputFields;
    httpRequest.open('POST', requestURL);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.send('action=' + encodeURIComponent('view') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + '&sort=' + encodeURIComponent(sessionStorage.getItem('sortBy')));
  }
}
function fillInputFields(item, subClass)
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
  let videoHours = document.getElementById('videoHoursDropdown');
  let videoMinutes = document.getElementById('videoMinutesDropdown');
  let videoSeconds = document.getElementById('videoSecondsDropdown');
  let videoGenre = document.getElementById('videoGenreDropdown');
  title.value = item['postTitle'];
  postContent.value = item['postDescription'];
  imageLink.value = item['postImage'];
  priceAmount.value = item['postPrice'];

  if(item['postIssaBook'] == 1 )
  {
    bookRadio.checked = true;
    videoRadio.disabled = true;
    bookTitle.value = subClass['bookTitle'];
    bookAuthor.value = subClass['bookAuthor'];
    bookPages.value = subClass['bookPages'];
  }
  else
  {
    bookRadio.disabled = true;
    videoRadio.checked = true;
    showform('radio2');
    videoTitle.value = subClass['videoTitle'];
    videoGenre.value = subClass['videoGenre'];

    let duration = subClass['videoDuration'];
    if (duration<=59)
    {
      videoHours.selectedIndex = 0;
      videoMinutes.selectedIndex = 0;
      videoSeconds.selectedIndex = duration;
    }
    else if (duration < 3599)
    {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      videoHours.selectedIndex = 0;
      videoMinutes.selectedIndex = minutes;
      videoSeconds.selectedIndex = seconds;
    }
    else
    {
      let hours = Math.floor(duration / 3600);
      duration = duration - hours * 3600;
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      videoHours.selectedIndex = hours;
      videoMinutes.selectedIndex = minutes;
      videoSeconds.selectedIndex = seconds;
    }
  }
}

function alert_fillInputFields()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        var response = httpRequest.responseText;
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

function validateInputInfo(){
  let title = document.getElementById("titleTextBox");
  let postContent = document.getElementById("descriptionTextBox");
  let imageLink = document.getElementById("imageTextBox");
  let priceAmount = document.getElementById('priceTextBox');
  let bookRadio = document.getElementById('r12');
  let videoRadio = document.getElementById('r22');

  let errorFlag = false;
  // info validation
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

    return false;
  }

  let username = sessionStorage.getItem("currentUser");

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
    return false;
  }

  if(bookRadio.checked)
  {
    let string = imageLink.value;
    let image = "";

    if (validateImageLink(string) == false)
    {
      alert("Invalid image link.")
      imageLink.classList.remove("regularTextarea");
      imageLink.classList.add("errorTextarea");
      return false;
    }

    if (string.indexOf(".jpg") == -1)
    {
      if (string != "")
      {
        image = string + ".jpg";
      }
    }
    else
    {
      image = string;
    }

    return validateBookInfo(image, price);
  }
  else
  {
    let string = imageLink.value;
    let link = "";

    if (validateVideoLink(string))
    {
      alert("You are only allowed to link to Youtube videos at this time.")
      imageLink.classList.remove("regularTextarea");
      imageLink.classList.add("errorTextarea");
      return false;
    }

    let x = string.indexOf(".be/");
    let y = string.indexOf("watch?v=");
    let z = string.indexOf("https://www.youtube.com/embed/");

    if (x != -1)
    {
      link = string.substring(x + 4, x + 4 + 11);
      link = "https://www.youtube.com/embed/" + link;
      return validateVideoInfo(link, price);
    }
    else if(y != -1)
    {
      link = string.substring( y + 8, y + 8 + 11);
      link = "https://www.youtube.com/embed/" + link;
      return validateVideoInfo(link, price);
    }
    else if (z != -1)
    {
      return validateVideoInfo(string, price);
    }
    else
    {
      alert("Invalid link");
      return false;
    }
  }
}

function validateBookInfo(image, price)
{
  let title = document.getElementById("titleTextBox");
  let postContent = document.getElementById("descriptionTextBox");
  let bookTitle = document.getElementById('bookTitleTextBox');
  let bookAuthor = document.getElementById('bookAuthorTextBox');
  let bookPages = document.getElementById('bookPagesTextBox');

  errorFlag = false;

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
    return false;
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
    return false;
  }

  var bookObject = new Object();
  bookObject.username = sessionStorage.getItem("currentUser");
  bookObject.postTitle = title.value;
  bookObject.content = postContent.value;
  bookObject.image = image;
  bookObject.price = price;
  bookObject.bookTitle = bookTitle.value;
  bookObject.bookAuthor = bookAuthor.value;
  bookObject.bookPages = pages;
  bookObject.isbook = 1;

  submitPost(bookObject);
  return true;

}
function validateVideoInfo(image, price){
  let title = document.getElementById("titleTextBox");
  let postContent = document.getElementById("descriptionTextBox");
  let videoTitle = document.getElementById('VideoTitleTextBox');
  let videoGenre = document.getElementById('videoGenreDropdown');
  let videoHours = document.getElementById('videoHoursDropdown');
  let videoMinutes = document.getElementById('videoMinutesDropdown');
  let videoSeconds = document.getElementById('videoSecondsDropdown');

  let errorFlag;

  if (videoTitle.value == '')
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

    return false;
  }

  if (videoHours.value == 0 && videoMinutes.value == 0 && videoSeconds.value == 0)
  {
    alert("A valid video duration must be selected.");
    return false;
  }

  let duration = (parseInt(videoHours.value) * 60 * 60) + (parseInt(videoMinutes.value) * 60) + (parseInt(videoSeconds.value));

  var videoObject = new Object();
  videoObject.username = sessionStorage.getItem("currentUser");
  videoObject.postTitle = title.value;
  videoObject.content = postContent.value;
  videoObject.image = image;
  videoObject.price = price;
  videoObject.videoTitle = videoTitle.value;
  videoObject.videoDuration = duration;
  videoObject.videoGenre = videoGenre.value;
  videoObject.isbook = 0;

  submitPost(videoObject);

  return true;
}
function submit()
{
  validateInputInfo();
}

function validateImageLink(string)
{
  substring = ".com/a/";
  if (string.indexOf(substring) != -1)
  {
    return false;
  }
  substring = "/gallery";
  if (string.indexOf(substring) != -1)
  {
    return false;
  }
  return true
}

function validateVideoLink(string)
{
  substring = "youtube";
  if(string.indexOf(substring) != -1)
  {
    return false;
  }
  substring = "youtu.be";
  if(string.indexOf(substring) != -1)
  {
    return false;
  }
  return true;
}

function submitPost(newObject)
{
  var requestURL = "http://localhost:8888/makePost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_submitPost;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  if(sessionStorage.getItem('action') == 'NP'){
    httpRequest.send('action=' + encodeURIComponent('new') + '&object=' + JSON.stringify(newObject));
  }
  else{
    httpRequest.send('action=' + encodeURIComponent('edit') + '&postID=' + encodeURIComponent(sessionStorage.getItem('lastPostViewed')) + '&object=' + JSON.stringify(newObject));
  }
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

        if (response == "New record created successfully")
        {
          sessionStorage.setItem('lastPostViewed', -1);
          alert("Your post has been submited. ^-^ Click 'Okay' to go back to browsing.");
          window.open("MainPage.html", "_self", false);
          return;
        }
        else if (response == "record updated")
        {
          alert("Your edits have been submited. Click 'Okay' to go back to browsing where you left off.");
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
