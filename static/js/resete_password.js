document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Display success message
            window.location.href = '/signinreg'; // Redirect to signinreg.html page
        } else {
            alert(data.error); // Display error message
        }
    })
    .catch(error => console.error('Error:', error));
});