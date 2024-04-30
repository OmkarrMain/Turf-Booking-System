//Form Alert Message
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var email = document.getElementById('emailInput').value;

    alert("Thank you for providing your Email!, You will receive updates from Us!!");
    emailInput.value = "";
});


document.addEventListener('DOMContentLoaded', function () {
    // Show success message
    var successContainer = document.getElementById('success-container');
    if (successContainer) {
        successContainer.style.display = 'block';
        setTimeout(function () {
            successContainer.style.display = 'none';
        }, 3000);
    }

    // Show error message
    var errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.style.display = 'block';
        setTimeout(function () {
            errorContainer.style.display = 'none';
        }, 3000);
    }
});


// var locationPrompted = false;

// // Function to prompt user for location permission
// function promptForLocation() {
//     if (!locationPrompted) {
//         var allowLocation = confirm("Do you want to allow this website to know your location?");
//         if (allowLocation) {
//             detectUserLocation();
//         }
//         locationPrompted = true;
//     }
// }

// // Function to detect user's location using Geolocation API
// function detectUserLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             function (position) {
//                 var latitude = position.coords.latitude;
//                 var longitude = position.coords.longitude;
//                 var locationText = "Latitude: " + latitude + ", Longitude: " + longitude;
//                 // Update location in navigation bar
//                 document.getElementById('location').innerText = locationText;
//             },
//             function (error) {
//                 console.error('Error getting user location:', error);
//             }
//         );
//     } else {
//         alert('Geolocation is not supported by this browser.');
//     }
// }

// // Event listener for page load
// window.onload = function () {
//     promptForLocation();
// };

// Drop Down 

document.addEventListener("DOMContentLoaded", function () {
    const registerLi = document.querySelector(".register");
    const logoutDropdown = document.querySelector(".logout-dropdown");
    const userinfo = document.querySelector(".userinfo");

    // Check if user is logged in
    const userLoggedIn = '{{ user_name }}' !== '';

    if (userLoggedIn) {
        if (registerLi) {
            registerLi.classList.add("hidden");
        }
        if (logoutDropdown) {
            logoutDropdown.classList.remove("hidden");
        }
    } else {
        if (registerLi) {
            registerLi.classList.remove("hidden");
        }
        if (logoutDropdown) {
            logoutDropdown.classList.add("hidden");
        }
    }

    // Toggle logout dropdown visibility
    if (userinfo) {
        userinfo.addEventListener("click", function () {
            logoutDropdown.classList.toggle("show");
        });
    }

    // Hide logout dropdown when clicking anywhere on the homepage
    document.body.addEventListener("click", function (event) {
        const isUserinfoClicked = userinfo.contains(event.target);
        if (!isUserinfoClicked && logoutDropdown.classList.contains("show")) {
            logoutDropdown.classList.remove("show");
        }
    });
});



// SIgninreg.js
function signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var user_password = document.getElementById("password").value;
}
// Function to create a user
function createUser(name, email, password) {
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: name,
            email: email,
            user_password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return response.json();
        })
        .then(data => {
            console.log('User created successfully:', data);
            // Handle success response here
        })
        .catch(error => {
            console.error('Error creating user:', error);
            // Handle error response here
        });
}

// Function to read a user by ID
function readUser(userId) {
    fetch(`/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        })
        .then(data => {
            console.log('User:', data);
            // Display user data
            document.getElementById('readResults').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            // Handle error response here
        });
}


