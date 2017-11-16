function showform(val)
{
  var radios = document.getElementsByName("radios");
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

  submitPost(username, title.value, postContent.value, image, price);
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

function submitPost(username, title, postContent, imageLink, price)
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
  text = text + '&price=' + encodeURIComponent(price);

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
