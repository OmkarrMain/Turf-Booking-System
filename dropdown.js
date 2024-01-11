

document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    
    //"Sign Up" link
    const signUpLink = document.createElement('a');
    signUpLink.href = 'signup.html';
    signUpLink.innerText = 'Register';
    
    // "Sign In" link
    const signInLink = document.createElement('a');
    signInLink.href = 'signin.html'; 
    signInLink.innerText = 'Login';
    
    // Append links to the dropdown content
    dropdownContent.appendChild(signUpLink);
    dropdownContent.appendChild(signInLink);
    
    // Append dropdown content to the user icon
    userIcon.appendChild(dropdownContent);

    userIcon.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });
});
