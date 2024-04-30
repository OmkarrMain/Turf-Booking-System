
// Toggle EYe 

document.querySelectorAll('.eye-icon').forEach(function (icon) {
  icon.addEventListener('click', function () {
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
