<head>
    <link rel='stylesheet' type='text/css' href='styles.css' />
    <script type='text/javascript' src='global.js'></script>
    <script src="jquery-1.11.1.min.js"></script>
    <script type='text/javascript' src='event.handler.js'></script>
  </head>
<?php

function makeConnection(){
	//require 'password.php';
	$password = "";
	$servername = "localhost";
	$username = "root";
	$dbname = "fil_project";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
    		die("Connection failed: " . $conn->connect_error);
	} 
	return $conn;
}
function closeConnection($conn){
	if (!$conn)
		$conn->close();
}
function insertValues($sponsor,$amount,$date){
	$conn = makeConnection();
	$sql = "Insert into Donations(sponsor,amount,date) values('$sponsor','$amount','$date')";
	$result = mysqli_query($conn,$sql) or die (mysql_error());
	echo "<br/><h1>Thank you!</h1><hr/><br/>Thanks $sponsor for your donation of \$$amount on $date!</h4><br/>
	<br/><a class='button' href='http://localhost/HW.4.5/donations.html'>Go Back!</a>";
	closeConnection($conn);
}
//for debugging only
function showData(){
	$conn = makeConnection();
	$sql = "SELECT *  FROM donations";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
    		// output data of each row
    		while($row = $result->fetch_assoc()) {
        		echo "Thank you " . $row["sponsor"]. " for your donation of " . $row["amount"]."<br>";
    		}
	}
	else {
    		echo "0 results";
	}
	closeConnection($conn);
}

?>
<?php
  if( !isset($_POST["donation"])){
	echo "Please select a donation";
	exit;
  }
switch ($_POST["donation"]){
	case "1":
		$amount = 13.30;
		break;
	case "2":
		$amount = 17.65;
		break;
	case "3":
		$amount = 39.95;
		break;
	case "4":
		$amount = 78.60;
		break;
	case "5":
		$amount = 500;
		break;
	case "6":
		$amount = 898;
		break;
	case "7":
		$amount = 1500	;
		break;
	case "8":
		$amount = $_POST["other"];
		break;
	default:
		echo "Error";
}
if( empty($_POST["sponsor"])){
	echo "Please enter your name, we will not share it with anyone.";
	exit;
  }
 else
  $sponsor = $_POST["sponsor"];
  $today = date("m/d/Y");
  insertValues($sponsor,$amount,$today);
  //showData();
?>
<footer>
<address>Created in between 2014-10-13 and 2014-10-31. <br />Written by <a href='mailto:tchen@scu.edu'>Travis Chen</a> and <a href='mailto:adiaztostado@scu.edu'>Alberto Diaz</a>.</address>
</footer>