function submit()
{
  let title = document.getElementById("titleTextBox");
  let postContent = document.getElementById("descriptionTextBox");
  let imageLink = document.getElementById("imageTextBox");
  let errorFlag = false;

  if (title.value == '')
  {
      alert("All posts need a title at the very minimum to be accepted.")
      title.classList.remove("regularTextbox");
      title.classList.add("errorTextbox");
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

  submitPost(username, title.value, postContent.value, image);
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

function submitPost(username, title, postContent, imageLink)
{
  var requestURL = "http://localhost:8888/makePost.php";
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents_submitPost;
  httpRequest.open('POST', requestURL);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  let text = "";
  text = 'userName=' + encodeURIComponent(username);
  text = text + '&title=' + encodeURIComponent(title);
  text = text + '&image=' + encodeURIComponent(imageLink);
  text = text + '&desc=' + encodeURIComponent(postContent);

  httpRequest.send(text);
}

function alertContents_getPassword()
{
  try
  {
    if (httpRequest.readyState === XMLHttpRequest.DONE)
    {
      if (httpRequest.status === 200)
      {
        /*
        function refreshParent()
{
    window.opener.location.reload(true);
}

<body onunload="javascript:refreshParent()">
        */

        var response = httpRequest.responseText;

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
