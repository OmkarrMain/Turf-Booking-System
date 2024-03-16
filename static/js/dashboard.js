// JavaScript for dashboard functionality

// Function to toggle filter options container
document.getElementById("filterButton").addEventListener("click", function (event) {
  var filterOptionsContainer = document.querySelector(".filterOptionsContainer");
  filterOptionsContainer.style.display = filterOptionsContainer.style.display === "block" ? "none" : "block";
  event.stopPropagation(); // Prevent event propagation to avoid immediate closing
});

// Add event listener for more options buttons
document.querySelectorAll(".moreOptionsButton").forEach(function (button) {
  button.addEventListener("click", function (event) {
    var container = this.closest(".container");
    var floatingButtons = container.querySelector(".floatingButtons");
    floatingButtons.style.display = floatingButtons.style.display === "block" ? "none" : "block";
    event.stopPropagation(); // Prevent event propagation to avoid immediate closing
  });
});

// Add event listener for back button
document.getElementById("backButton").addEventListener("click", function () {
  // Redirect to home page
  window.location.href = "/"; // Change to your actual home page URL
});

// Function to filter turfs based on sport
function filterTurf(sport) {
  var containers = document.querySelectorAll(".container");
  containers.forEach(function (container) {
    var smallContainer = container.querySelector(".smallContainer");
    var dataText = smallContainer.getAttribute("data-text");
    var hourlyPrice;
    var openingHours;

    // Additional information based on the selected sport
    switch (sport) {
      case "Football":
        hourlyPrice = "₹20";
        openingHours = "9:00 AM - 10:00 PM";
        break;
      case "Cricket":
        hourlyPrice = "₹15";
        openingHours = "10:00 AM - 8:00 PM";
        break;
      case "Tennis":
        hourlyPrice = "₹25";
        openingHours = "8:00 AM - 11:00 PM";
        break;
      case "Badminton":
        hourlyPrice = "₹10";
        openingHours = "11:00 AM - 9:00 PM";
        break;
      case "Yoga":
        hourlyPrice = "₹12";
        openingHours = "7:00 AM - 9:00 PM";
        break;
      case "Swimming":
        hourlyPrice = "₹30";
        openingHours = "6:00 AM - 12:00 AM";
        break;
      case "Rugby":
        hourlyPrice = "₹18";
        openingHours = "12:00 PM - 8:00 PM";
        break;
      case "Hockey":
        hourlyPrice = "₹22";
        openingHours = "3:00 PM - 10:00 PM";
        break;
      default:
        break;
    }

    // Update container content if it matches the selected sport
    if (dataText === sport) {
      container.style.display = "block"; // Show containers that match the selected sport

      // Add heading and additional information
      container.innerHTML = `
        <h1>${sport}</h1>
        <div class="smallContainer" style="background-image: ${smallContainer.style.backgroundImage}"></div>
        <p>Hourly Price: ${hourlyPrice}</p>
        <p>Opening Hours: ${openingHours}</p>
      `;
    } else {
      container.style.display = "none"; // Hide containers that don't match the selected sport
    }
  });
}

// Function to close floating buttons when clicking anywhere on the page
document.addEventListener("click", function () {
  document.querySelectorAll(".floatingButtons").forEach(function (floatingButtons) {
    floatingButtons.style.display = "none";
  });
  document.querySelector(".filterOptionsContainer").style.display = "none"; // Close filter options container
});
