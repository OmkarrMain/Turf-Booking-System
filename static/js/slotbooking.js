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
                if (selectedSlotsCount < 2) {
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
        // window.location.href = "/";
    });
});

//Retriving data from frontend and storing it in backend using Jsonify
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector(".booking-form form");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get user input values
        const turfName = document.getElementById("turfName").innerText;
        const date = document.getElementById("date").value;
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;

        // Get the selected slot timing
        const selectedSlots = [];
        const selectedSlotElements = document.querySelectorAll("#availableSlotsList li.selected");
        selectedSlotElements.forEach(function (slotElement) {
            selectedSlots.push(slotElement.textContent);
        });

        // Construct the data object to send to backend
        const data = {
            turfName: turfName,
            date: date,
            name: name,
            mobile: mobile,
            selectedSlots: selectedSlots
        };

        // Print the data in console
        console.log("Booking Data:", data);

        // Send booking information to Flask backend
        fetch('/submit_booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Handle success response
                console.log('Success:', data);
                window.location.href = '/history'; // Redirect to history.html after successful booking
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Event listener to capture slot selection
        const availableSlotsList = document.getElementById("availableSlotsList");
        availableSlotsList.addEventListener("click", function (event) {
            const clickedSlot = event.target;
            if (clickedSlot.tagName === "LI") {
                // Toggle selected class and update border color
                toggleSlotSelection(clickedSlot);
            }
        });
    });

    function toggleSlotSelection(slotElement) {
        const slotIndex = Array.from(slotElement.parentNode.children).indexOf(slotElement);
        const selectedSlots = slotsByPeriod[selectedPeriod];

        const slot = selectedSlots[slotIndex];
        if (slot.selected) {
            slot.selected = false;
            selectedSlotsCount--;
        } else {
            if (selectedSlotsCount < 2) {
                slot.selected = true;
                selectedSlotsCount++;
            } else {
                alert("You can only book a maximum of 2 slots.");
                return;
            }
        }

        // Toggle selected class and update border color
        slotElement.classList.toggle("selected");
    }


});


//Radio Button Coonfitmation

function validateForm() {
    var paymentMethod = document.getElementsByName("payment");
    var isChecked = false;
    for (var i = 0; i < paymentMethod.length; i++) {
        if (paymentMethod[i].checked) {
            isChecked = true;
            break;
        }
    }
    if (!isChecked) {
        alert("Please select a mode of payment.");
        return false;
    }
    return true;
}

function toggleRadio(id) {
    var radio = document.getElementById(id);
    radio.checked = !radio.checked; // Toggle the checked state
}