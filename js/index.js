/**
 * Performs syntax verification of email.
 * 
 * @returns boolean
 *   Returns boolean value based on number validation.
 */
function validateEmailSyntax() {
  // Validation for email 
  let validEmailSyntax = true;
  let emailError = document.getElementById("emailError");
  emailError.textContent = "";
  let email = document.getElementById("email").value;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
      emailError.textContent = "Email is required."
      $('#load').css('opacity','0');
      $('#emailError').css({'opacity':'1','color':'red'});
      validEmailSyntax = false;
  }
  else if (!emailRegex.test(email)) {
      emailError.textContent = "Invalid email syntax."
      $('#load').css('opacity','0');
      $('#emailError').css({'opacity':'1','color':'red'});
      validEmailSyntax = false;
  }
  return validEmailSyntax;
}

/**
 * Uses ajax for getting backend responses.
 * 
 * @returns boolean
 *   Returns boolean based on email validity.
 */
async function validateEmail() {
  return new Promise(function (resolve, reject) {
      const emailJ = $('#email').val();
      $.ajax({
          url: 'email.php',
          type: 'POST',
          data: { email: emailJ },
          dataType: 'json',
          success: function (response) {
              if (response.success === true) {
                  resolve(true);
              }
              else {
                  resolve(false);
              }
          },
          error: function () {
              reject("error");
          }
  });
}
)}

/**
 * Uses ajax for receiving response after sending mail.
 * 
 * @returns boolean
 *   Returns boolean based on email validity.
 */
async function sendMail() {
  return new Promise(function (resolve, reject) {
      const emailJ = $('#email').val();
      // console.log(emailJ);
      $.ajax({
          url: 'mailer.php',
          type: 'POST',
          data: { email: emailJ },
          dataType: 'json',
          success: function (response) {
              if (response === true) {
                  resolve(true);
              }
              else {
                  resolve(false);
              }
          },
          error: function () {
              reject("error");
          }
      });
  }
)}

/**
 * Validates the entire form.
 * 
 * @param {*} event
 *   Takes event as parameter.
 * 
 * @returns boolean 
 *   Returns boolean value to the form after validation.
 */
async function validateForm(event) {
  if(event)event.preventDefault();
  $('#load').css('opacity','1');
  let validEmailSyntax = validateEmailSyntax();
  let validEmail = false;
  let mail_sent =  false;
  if(validEmailSyntax === true) {
      try{
          // Wait for the AJAX to finish
          var response = await validateEmail(); 
          let emailError = document.getElementById("emailError");
          if (response === true) {
              console.log(response);
              validEmail = true;
          } else {
              emailError.textContent = "Invalid email";
              $('#load').css('opacity','0');
              $('#emailError').css({'opacity':'1','color':'red'});
              validEmail = false;
          }
      } catch (error) {
          console.error("AJAX Error:", error);
          emailError.textContent = "Server error";
          $('#load').css('opacity','0');
          $('#emailError').css({'opacity':'1','color':'red'});
          validEmail = false;
      }
  }
  if(validEmail === true) {
    try{
      // Wait for the AJAX to finish
      var response = await sendMail(); 
      let emailError = document.getElementById("emailError");
      if (response === true) {
          emailError.textContent = "Mail sent";
          $('#load').css('opacity','0');
          $('#emailError').css({'opacity':'1','color':'green'});
          mail_sent = true;
      } 
      else {
          emailError.textContent = "Mail not sent";
          mail_sent = false;
      }
    } catch (error) {
      console.error("AJAX Error:", error);
      emailError.textContent = "Server error";
      $('#load').css('opacity','0');
      $('#emailError').css({'opacity':'1','color':'red'});
      mail_sent = false;
    }
  }

}
