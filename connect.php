<?php
$name = $_Post['fullName'];
$email = $_Post['email'];
$phone = $_Post['phone'];
$comments = $_Post['comments'];
$workshop = $_Post['workshop'];



// Create connection
$conn = new mysqli('localhost', root,'','workizdb');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
$stmt = $conn->prepare("insert into subscriptions(name,email,phone,comments,workshop)
values(?,?,?,?,?)");
$stmt->bind_param("sssss",$name,$email,$phone,$comments,$workshop);
$stmt->execute();
echo "Subscribed Successfully";
$stmt->close();
$conn->close();
}

?>
