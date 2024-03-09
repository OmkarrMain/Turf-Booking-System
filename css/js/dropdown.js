

document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    
    //"Sign Up" link
    const signUpLink = document.createElement('a');
    signUpLink.href = 'signinreg.html';
    signUpLink.innerText = 'Register';
    
    // Append links to the dropdown content
    dropdownContent.appendChild(signUpLink);
    // Append dropdown content to the user icon
    userIcon.appendChild(dropdownContent);

    userIcon.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });
});
// for drop down animation

document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('user-icon');
    const dropdownContent = document.querySelector('.dropdown-content');

    userIcon.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });

    userIcon.addEventListener('mouseenter', function () {
        dropdownContent.classList.add('show');
    });

    userIcon.addEventListener('mouseleave', function () {
        dropdownContent.classList.remove('show');
    });
});

