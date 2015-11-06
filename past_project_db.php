<?php
$con = mysqli_connect("localhost","root","", "fil_project");
// mysql_connect("dbserver.engr.scu.edu","username","password"); 
if (!$con)
{
die('Could not connect: ' . mysql_error());
}

$sql=file_get_contents('./past_projects.sql', FILE_USE_INCLUDE_PATH);

if (!mysqli_query($con, $sql))
{
die('Error: ' . mysql_error());
}
echo "1 record added";

mysqli_close($con)

?>