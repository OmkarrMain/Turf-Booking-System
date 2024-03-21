// Searching Turf

const turfs = document.querySelectorAll('.turf');


function filterTurfs(searchInput) {
    const searchTerm = searchInput.toLowerCase();

    // Filter turfs based on search term
    const filteredTurfs = Array.from(turfs).filter(turf => {
        const turfName = turf.querySelector('h1').textContent.toLowerCase();
        return turfName.includes(searchTerm);
    });

    // Reorder turfs
    const container = document.querySelector('.container');
    container.innerHTML = '';

    // Append filtered turfs to container
    filteredTurfs.forEach(turf => {
        container.appendChild(turf);
    });
}

// Event listener for search input changes
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    filterTurfs(this.value);
});

// Function to highlight the first matching turf
function highlightFirstMatchingTurf() {
    const searchTerm = searchInput.value.toLowerCase();


    const matchingTurf = Array.from(turfs).find(turf => {
        const turfName = turf.querySelector('h1').textContent.toLowerCase();
        return turfName.startsWith(searchTerm);
    });


    turfs.forEach(turf => {
        turf.classList.remove('highlighted');
    });


    if (matchingTurf) {
        matchingTurf.classList.add('highlighted');
    }
}


turfs.forEach(turf => {
    turf.addEventListener('mouseenter', highlightFirstMatchingTurf);
});


turfs.forEach(turf => {
    turf.addEventListener('mouseleave', function () {
        turfs.forEach(turf => {
            turf.classList.remove('highlighted');
        });
    });
});

//Football Turf Searching

function searchPlace() {

    var input = document.getElementById('footballSearchInput').value.toUpperCase();


    var turfs = document.getElementsByClassName('turf');

    // Loop through turfs
    for (var i = 0; i < turfs.length; i++) {


        var name = turfs[i].getElementsByClassName('turf-info')[0].getElementsByTagName('h1')[0].innerText.toUpperCase();

        if (name.indexOf(input) > -1) {
            turfs[i].parentNode.insertBefore(turfs[i], turfs[0]);
            break;
        }
    }
}

//Tennis Search turf Code
function searchTennisTurf() {
    var input = document.getElementById('TennissearchInput').value.toLowerCase();

    var places = document.querySelectorAll('.place');

    for (var i = 0; i < places.length; i++) {
        var placeName = places[i].querySelector('.place-info h1').innerText.toLowerCase();

        if (placeName.includes(input)) {
            places[i].style.display = 'block';
        } else {
            places[i].style.display = 'none';
        }
    }
}

//Yoga Search turf Code

function searchYogaPlace() {
    var input = document.getElementById('YogasearchInput').value.toLowerCase();

    var places = document.querySelectorAll('.place');

    for (var i = 0; i < places.length; i++) {
        var placeName = places[i].querySelector('.place-info h1').innerText.toLowerCase();

        if (placeName.includes(input)) {
            places[i].style.display = 'block';
        } else {
            places[i].style.display = 'none';
        }
    }
}

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

// .see-more button functionality


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

