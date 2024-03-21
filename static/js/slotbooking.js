// Main Turf Slots and Logic
var slotsByPeriod = {
    "Mid-Night": [
        { slot: "Slot 1: 12:00 AM - 1:00 AM", selected: false },
        { slot: "Slot 2: 1:00 AM - 2:00 AM", selected: false },
        { slot: "Slot 3: 2:00 AM - 3:00 AM", selected: false },
        { slot: "Slot 4: 3:00 AM - 4:00 AM", selected: false },
        { slot: "Slot 5: 4:00 AM - 5:00 AM", selected: false },
        { slot: "Slot 6: 5:00 AM - 6:00 AM", selected: false }
    ],
    "Morning": [
        { slot: "Slot 1: 6:00 AM - 7:00 AM", selected: false },
        { slot: "Slot 2: 7:00 AM - 8:00 AM", selected: false },
        { slot: "Slot 3: 8:00 AM - 9:00 AM", selected: false },
        { slot: "Slot 4: 9:00 AM - 10:00 AM", selected: false },
        { slot: "Slot 5: 10:00 AM - 11:00 AM", selected: false },
        { slot: "Slot 6: 11:00 AM - 12:00 PM", selected: false }
    ],
    "Afternoon": [
        { slot: "Slot 1: 12:00 PM - 1:00 PM", selected: false },
        { slot: "Slot 2: 1:00 PM - 2:00 PM", selected: false },
        { slot: "Slot 3: 2:00 PM - 3:00 PM", selected: false }
    ],
    "Evening": [
        { slot: "Slot 1: 4:00 PM - 5:00 PM", selected: false },
        { slot: "Slot 2: 5:00 PM - 6:00 PM", selected: false }
    ],
    "Night": [
        { slot: "Slot 1: 6:00 PM - 7:00 PM", selected: false },
        { slot: "Slot 2: 7:00 PM - 8:00 PM", selected: false },
        { slot: "Slot 3: 8:00 PM - 9:00 PM", selected: false },
        { slot: "Slot 4: 9:00 PM - 10:00 PM", selected: false },
        { slot: "Slot 5: 10:00 PM - 11:00 PM", selected: false },
        { slot: "Slot 6: 11:00 PM - 12:00 AM", selected: false }
    ]
};

// Counter to keep track of selected slots
var selectedSlotsCount = 0;

// Get current date
var currentDate = new Date().toISOString().split("T")[0];
document.getElementById("date").setAttribute("min", currentDate);

// Add buttons after date selection
document.getElementById("date").addEventListener("change", function () {
    var buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    var buttons = ["Mid-Night", "Morning", "Afternoon", "Evening", "Night"];
    buttons.forEach(function (buttonName) {
        var button = document.createElement("button");
        button.textContent = buttonName;
        buttonContainer.appendChild(button);
        button.addEventListener("click", function () {
            toggleSlots(buttonName);
        });
    });
});

document
    .getElementById("availabilityForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        // Add animation when checking availability
        var availabilitySlots = document.getElementById("availabilitySlots");
        availabilitySlots.style.animation = "fadeIn 1s ease-out";
    });

function toggleSlots(period) {
    var availableSlots = slotsByPeriod[period];
    var availableSlotsList = document.getElementById("availableSlotsList");

    // Check if the selected period is already displayed
    if (availableSlotsList.getAttribute("data-selected-period") === period) {
        availableSlotsList.innerHTML = ""; // Deselect the period
        availableSlotsList.removeAttribute("data-selected-period");
    } else {
        // Clear selected slots count when selecting a new period
        selectedSlotsCount = 0;
        availableSlotsList.setAttribute("data-selected-period", period);
        displayAvailableSlots(availableSlots);
    }
}

function displayAvailableSlots(slots) {
    var availableSlotsList = document.getElementById("availableSlotsList");
    availableSlotsList.innerHTML = ""; // Clear previous slots

    slots.forEach(function (slot, index) {
        var li = document.createElement("li");
        li.textContent = slot.slot;

        // Check if the slot is selected
        if (slot.selected) {
            li.classList.add("selected");
        }

        // Add click event to toggle slot selection
        li.addEventListener("click", function () {
            if (slot.selected) {
                slot.selected = false;
                selectedSlotsCount--;
            } else {
                if (selectedSlotsCount < 2) { // Allow maximum 2 slots to be booked
                    slot.selected = true;
                    selectedSlotsCount++;
                } else {
                    alert("You can only book a maximum of 2 slots.");
                    return;
                }
            }

            // Toggle selected class and update border color
            this.classList.toggle("selected");
        });

        availableSlotsList.appendChild(li);
    });
}



// Logic for fetching names of Turfs in Slotbooking.html

document.addEventListener("DOMContentLoaded", function () {
    // Get the turf name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const turfName = urlParams.get('name');
    // Insert the turf name into the h1 tag
    document.getElementById('turfName').innerText = turfName;
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Get the place name from URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const placeName = urlParams.get('name');
//     // Insert the place name into the h1 tag
//     document.getElementById('placeName').innerText = placeName;
// });



//Logic for frtchig Price and Multiplying it 

document.addEventListener("DOMContentLoaded", function () {
    // Get the turf name and price from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const turfName = urlParams.get('name');
    const turfPrice = urlParams.get('price');

    // Insert the turf name into the h1 tag
    document.getElementById('turfName').innerText = turfName;

    // Display the turf price in the total amount container
    document.getElementById('totalAmount').innerText = turfPrice;
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Get the turf name and price from URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const placeName = urlParams.get('name');
//     const placePrice = parseInt(urlParams.get('price')); // Convert price to integer

//     // Insert the place name into the h1 tag
//     document.getElementById('placeName').innerText = placeName;

//     // Display the place price in the total amount container
//     document.getElementById('totalAmount').innerText = '₹' + placePrice;
// });

//Storing Data in History.html

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector(".booking-form form");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get user input values
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;

        // Display success message with booked turf, date, and name
        const successMessage = `Turf Booked Successfully!!\nTurf: ${document.getElementById("turfName").textContent}\nDate: ${date}\nName: ${name}`;
        alert(successMessage);

        // Redirect user to index.html
        window.location.href = "/";
    });
});
