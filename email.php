<?php 
include "FormSubmission.php";
 
 if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    header('Content-Type: application/json');
    $email = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : '';
    if (empty($email)) {
        die("Email is required.");
    }
  // Creating object and calling emailValidate function
  $formSubmission = new FormSubmission();
  $isValid = $formSubmission->emailValidate($email);
    echo json_encode($isValid);
    exit;
  }
?>