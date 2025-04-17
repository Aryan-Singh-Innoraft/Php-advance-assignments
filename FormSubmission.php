<?php
require_once "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
/**
 * Handles form submission, file uploads, create marks table creates and store docs.
 */
class FormSubmission {
  /**
   * Storing email.
   * @var string
   */
  public $email;

  /**
   * Stores the api key.
   * 
   * @var string
   */
  private $apiKey = '78d05514d1b77d7cbf2dee7ecebba6db';

  /**
 * Checks email validity using mailboxlayer api.
 * 
 * @param string $email
 *   Takes user mail-id as a parameter.
 * 
 * @return array
 *   Returns an array of response.
 */
  function emailValidate($email){
    header('Content-Type: application/json'); 
    // Construct API URL
    $url = "http://apilayer.net/api/check?access_key=$this->apiKey&email=$email";
    try {
        // Initialize cURL session.
        $ch = curl_init($url);
        if ($ch === false) {
            echo "failed setup";
            throw new Exception("Failed to initialize cURL.");
        }                
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($ch);
        $responseApi =json_decode($json , true);
        $response = [
         "success"=> false,
         "message"=> ""
        ];
        // Check for cURL errors
        if (isset($responseApi['success'])) {
             echo "failed to call api";
             throw new Exception("Failed API request: " . curl_error($ch));
        }
        curl_close($ch);
        // Print validation result.
        if ($responseApi['format_valid'] === true && $responseApi['smtp_check'] === true) {
         $response["success"] = true;
         $response["message"] = "Valid email-id";
        } 
        else {
         $response["success"] = false;
         $response["message"] = "Invalid email-id";
            
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    return $response;
  } 

  /**
   * Sends mail to the recipient address.
   * 
   * @param string $email
   *   Takes user mail-id as a parameter.
   * 
   * @return boolean
   *   Returns boolean value.
   */
  public function sendEmail($email) {
    $mail = new PHPMailer(true); 
    try {
      // SMTP config
      $mail->isSMTP();
      $mail->Host = 'smtp.gmail.com';
      $mail->SMTPAuth = true;
      $mail->Username = 'aryansinghborn5@gmail.com';  
      $mail->Password = 'cpor eorb ecjx scuu';         
      $mail->SMTPSecure = 'tls';
      $mail->Port = 587;

      $mail->setFrom('aryansinghborn5@gmail.com', 'Aryan Singh');
      $mail->addAddress($email);
      $mail->isHTML(true); 
      $mail->Subject = "Shopify"; 
      $mail->Body = "<p>Thankyou for shopping.</p>"; 
      if($mail->send()) {
      return true;
      } 
    }catch(Exception $e) {
      echo "Mailer Error: " . $mail->ErrorInfo;
      return false;
    }
  }
}
