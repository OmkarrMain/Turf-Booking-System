// JavaScript to toggle filter options container
document
.getElementById("filterButton")
.addEventListener("click", function () {
  var filterOptionsContainer = document.querySelector(
    ".filterOptionsContainer"
  );
  filterOptionsContainer.style.display =
    filterOptionsContainer.style.display === "block" ? "none" : "block";
});

// Add event listener for more options button
document
.querySelectorAll(".moreOptionsButton")
.forEach(function (button) {
  button.addEventListener("click", function () {
    var container = this.closest(".container");
    var floatingButtons = container.querySelector(".floatingButtons");
    floatingButtons.style.display =
      floatingButtons.style.display === "block" ? "none" : "block";
  });
});

// Add event listener for back button
document
.getElementById("backButton")
.addEventListener("click", function () {
  // Redirect to home page
  window.location.href = "/"; // Change "home.html" to your actual home page URL
});

// Function to filter turfs based on sport
function filterTurf(sport) {
var containers = document.querySelectorAll(".container");
containers.forEach(function (container) {
  var smallContainer = container.querySelector(".smallContainer");
  var dataText = smallContainer.getAttribute("data-text");
  if (dataText !== sport) {
    container.style.display = "none"; // Hide containers that don't match the selected sport
  } else {
    container.style.display = "block"; // Show containers that match the selected sport
  }
});
}