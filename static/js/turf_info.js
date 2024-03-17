

// Function to handle click event on navigate button
document.addEventListener('DOMContentLoaded', function () {
    const navigateButtons = document.querySelectorAll('.button');

    navigateButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const turfLocation = event.currentTarget.closest('.container').querySelector('.location p').innerText;
            navigateToLocation(turfLocation);
        });
    });

    function navigateToLocation(location) {
        // Replace spaces with '+' for the Google Maps URL
        const formattedLocation = location.replace(/ /g, '+');
        const mapsURL = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;

        // Open the Google Maps URL in a new tab
        window.open(mapsURL, '_blank');
    }
});


//search box
function searchTurf() {
    // Your search functionality here
    console.log("Search button clicked");
    // You can add your search logic here
  }

  
  
// Back Button
function goBack() {
    window.history.back();
  }
  
 