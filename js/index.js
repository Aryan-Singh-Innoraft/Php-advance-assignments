$(document).ready(function() {
  $.ajax({
    url: './apiCall.php',
    type: 'GET',
    dataType: "json",
    success: function (response) {
      $('#our-key-services').html  (response.data);
      
      $('.our-key-services .row:first-child div:nth-of-type(2) .service img.icon-hover-filter').attr('src', 'https://www.innoraft.ai/themes/custom/innoraft/images/icons/custom_icons/Web design - blue.svg');

      $('.our-key-services .row:last-child div:nth-of-type(1) .service img.icon-hover-filter').attr('src', 'https://www.innoraft.ai/themes/custom/innoraft/images/icons/custom_icons/Web development - blue.svg');

      $('.our-key-services .row:last-child div:nth-of-type(2) .service img.icon-hover-filter').attr('src', 'https://www.innoraft.ai/themes/custom/innoraft/images/icons/custom_icons/Progressive web app - blue.svg');

      $('.our-key-services .row:last-child div:nth-of-type(3) .service img.icon-hover-filter').attr('src', 'https://www.innoraft.ai/themes/custom/innoraft/images/icons/custom_icons/Support and maintenance - blue.svg');

      $('.our-key-services .row:last-child div:nth-of-type(4) .service img.icon-hover-filter').attr('src', 'https://www.innoraft.ai/themes/custom/innoraft/images/icons/custom_icons/Web app development - blue.svg');
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error: " + status + " - " + error);
      console.log(xhr.responseText);
    }
  });
  
})