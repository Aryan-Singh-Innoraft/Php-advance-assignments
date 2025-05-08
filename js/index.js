$(document).ready(function() {
  $.ajax({
    url: './apiCall.php',
    type: 'GET',
    dataType: "json",
    success: function (response) {
      $('#our-key-services').html  (response.data);
      
      $('img').each(function () {
        let src = $(this).attr('src');
        if (src && src.startsWith('/themes/')) {
          let encodedSrc = encodeURI(src);
          let fullUrl = 'https://www.innoraft.ai' + encodedSrc;
          $(this).attr('src', fullUrl);
        }
      });
    },
    error: function (xhr, status, error) {
      console.log("AJAX Error: " + status + " - " + error);
      console.log(xhr.responseText);
    }
  });
})
