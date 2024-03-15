// Function to handle successful login
function handleSuccess() {
    alert("Password updated successfully");
}

// Function to handle error in login
function handleError(errorMessage) {
    alert(errorMessage);
}

// Handling form submission using AJAX
document.getElementById("resetForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            handleSuccess();
        } else {
            handleError(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        handleError("An error occurred. Please try again.");
    });
});