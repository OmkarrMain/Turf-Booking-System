// Function to create a user
function createUser(name, email,password) {
    $.ajax({
        url: "http://127.0.0.1:8000/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ username: name, email: email, user_password:password }),
        success: function(response) {
            console.log("User created successfully:", response);
            // Handle success response here
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Failed to create user:", xhr.status, errorThrown);
            // Handle error response here
        }
    });
}

// Function to read all users
function readUsers() {
    $.ajax({
        url: "http://127.0.0.1:8000/users",
        method: "GET",
        success: function(response) {
            console.log("Users:", response);
            // Display users in readResults element
            $("#readResults").html(JSON.stringify(response));
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Failed to read users:", xhr.status, errorThrown);
            // Handle error response here
        }
    });
}

// Function to update a user
function updateUser(userId, newName) {
    $.ajax({
        url: `http://127.0.0.1:8000/users/${userId}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ username: newName }),
        success: function(response) {
            console.log("User updated successfully:", response);
            // Handle success response here
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Failed to update user:", xhr.status, errorThrown);
            // Handle error response here
        }
    });
}

// Function to delete a user
function deleteUser(userId) {
    $.ajax({
        url: `http://127.0.0.1:8000/users/${userId}`,
        method: "DELETE",
        success: function(response) {
            console.log("User deleted successfully:", response);
            // Handle success response here
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("Failed to delete user:", xhr.status, errorThrown);
            // Handle error response here
        }
    });
}

// Event listener for createForm submission
$("#createForm").submit(function(event) {
    event.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#user_password").val();
    createUser(name, email);
});

// Event listener for updateForm submission
$("#updateForm").submit(function(event) {
    event.preventDefault();
    const userId = $("#userId").val();
    const newName = $("#newName").val();
    updateUser(userId, newName);
});

// Event listener for deleteForm submission
$("#deleteForm").submit(function(event) {
    event.preventDefault();
    const userId = $("#deleteUserId").val();
    deleteUser(userId);
});

// Initial read of users when the page loads
readUsers();
