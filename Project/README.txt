---------------------------------------------------------
Apache and mySql connections
---------------------------------------------------------
The database connection info is highlighted below
$servername = 'localhost';
$serverusername = 'sanjay';
$serverpassword = '0cKfzCiL7yVa2iol';
$dbname = 'project';

We had a bug with our apache server with port numbers.
We had to specify the port of local host when calling the localhost to check for the php files. An example is highlighted below:
var requestURL = "http://localhost:8888/getPost.php";
httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = alert_fillInputFields;
httpRequest.open('POST', requestURL);

Therefore we recommend that the port number for the Apache server be changed to 8888 before running the website.
---------------------------------------------------------
---------------------------------------------------------
The sql file provided should fill the tables with all the data needed to run the program. You are free to provide your own to test the usability of the website. A few user accounts have already been predefined in this file as well. There are two different types of accounts: a regular user and admin. The admin and user accounts and passwords for these accounts are listed below. However though, you are free to create your own user accounts through the website itself to test the functionality.
---------------------------
Admin Accounts
---------------------------

---------------------------
User Accounts
---------------------------
---------------------------------------------------------
---------------------------------------------------------

