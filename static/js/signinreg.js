//Signinreg.js

$(document).ready(function() {
    $('#signinForm').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/signin',
            data: formData,
            success: function(response) {
                alert(response.message); 
                window.location.href = '/';
            },
            error: function(xhr, status, error) {
                var errorMessage = JSON.parse(xhr.responseText).error;
                alert(errorMessage); 
                window.location.href = '/signinreg'; 
            }
        });
    });
});


// Toggle EYe 

document.querySelectorAll('.eye-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
      var passwordInput = this.previousElementSibling;
      var iconElement = this.querySelector('i');
  
      // Toggle password visibility
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
      }
    });
  });
  