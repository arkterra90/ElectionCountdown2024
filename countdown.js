// Countdown function for Election Day
function updateCountdown() {
    const eventDate = new Date("November 5, 2024 20:00:00 GMT-0600"); // Central Time
    const now = new Date();
    const timeRemaining = eventDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Election Day is here!";
    }
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
