<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $to = "autopts@bigpond.net.au";
    $subject = "New Quote Request from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nService: $service\nMessage:\n$message";
    $headers = "From: noreply@aprauto.com.au\r\n";
    $headers .= "Reply-To: $email\r\n";

    if(mail($to, $subject, $body, $headers)){
        echo "Thank you for your request. We will get back to you soon.";
    } else {
        echo "There was an error sending your request. Please try again later.";
    }
} 
?>