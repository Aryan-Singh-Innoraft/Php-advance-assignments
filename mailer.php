<?php 
include "FormSubmission.php";
 
 if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    header('Content-Type: application/json');
   $email = $_POST["email"];
  // Creating object and calling sendEmail function
  $formSubmission = new FormSubmission();
  $isValid = $formSubmission->sendEmail($email);
    echo json_encode($isValid);
    exit;
  }
?>
