// Add the new JavaScript code for dropdown here

document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    
    // Create "Sign Up" link
    const signUpLink = document.createElement('a');
    signUpLink.href = 'signup.html'; // Specify the URL for Sign Up
    signUpLink.innerText = 'Sign Up';
    
    // Create "Sign In" link
    const signInLink = document.createElement('a');
    signInLink.href = 'signin.html'; // Specify the URL for Sign In
    signInLink.innerText = 'Sign In';
    
    // Append links to the dropdown content
    dropdownContent.appendChild(signUpLink);
    dropdownContent.appendChild(signInLink);
    
    // Append dropdown content to the user icon
    userIcon.appendChild(dropdownContent);

    userIcon.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });
});
