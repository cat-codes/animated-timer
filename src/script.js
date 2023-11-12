// Grabbing the buttons with class .timer__button from HTML file
const buttons = document.querySelectorAll(".timer__button");

// Declaring a global countdown interval
let countdown;

// Adding a separate event listener to each button that would set off a timer
buttons.forEach(button => {
    button.addEventListener("click", function(){
        timer(this.dataset.time);
    });
});

document.customForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const customTime = parseInt(this.minutes.value);
    timer(customTime * 60);
    this.reset();
})

function timer(duration) {
    // Clear previous timers
    clearInterval(countdown);

    // Getting the duration in seconds as a number 
    let currentTimeLeft = parseInt(duration);

    // Getting current time
    const date = Date.now();

    // Setting end time
    const endTime = new Date(date + currentTimeLeft * 1000);
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();
    const ampm = endHours >= 12 ? 'PM' : 'AM';

    // Setting end time text
    const endTimeText = `Be Back At ${endHours > 12 ? endHours - 12 : endHours}:${endMinutes < 10 ? '0' : ''}${endMinutes} ${ampm}`;

    // Grabbing the div class .display__end-time where the end time will show up on the page
    const container2 = document.querySelector(".display__end-time");
    container2.textContent = endTimeText;

    count(currentTimeLeft);

    // Setting an interval of 1s
    countdown = setInterval(() => {
        currentTimeLeft--; // Decrementing currentTimeLeft
        count(currentTimeLeft); // Passing the current timeLeft value to countdown function
    }, 1000);
}      

// Defining a countdown function
function count(timeLeft) {

    // Once timeLeft reaches zero, interval clears
    if (timeLeft < 0) {
        clearInterval(countdown);
        return;
    }

    // Converting seconds into hours,  minutes and seconds
    const hours = Math.floor(timeLeft / 3600);
    const remainingSeconds = timeLeft % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = (remainingSeconds % 60);

    // Grabbing the div class .display__time-left where the timer will show up on the page
    const container = document.querySelector(".display__time-left");

    // Setting timer text
    const displayHours = (hours < 10 ? "0" : "") + hours;
    const displayMinutes = (minutes < 10 ? "0" : "") + minutes;
    const displaySeconds = (seconds < 10 ? "0" : "") + seconds;
    const timerText = `${displayHours}:${displayMinutes}:${displaySeconds}`;

    // Displaying text on the web page
    container.textContent = timerText;

    // Decreasing the time left for the timer
    timeLeft--;
}