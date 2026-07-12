// ==============================
// Digital Clock
// ==============================

const time = document.getElementById("time");
const ampm = document.getElementById("ampm");
const date = document.getElementById("date");

function updateClock() {

    const now = new Date();

    // Time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    time.textContent = `${hours}:${minutes}:${seconds}`;
    ampm.textContent = period;

    // Date
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    date.textContent =
        `${days[now.getDay()]}, ${String(now.getDate()).padStart(2,"0")} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

updateClock();
setInterval(updateClock, 1000);


// ==============================
// Stopwatch
// ==============================

const stopwatch = document.getElementById("stopwatch");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;
let lapNumber = 1;


// Format Time
function formatTime(milliseconds){

    let hrs = Math.floor(milliseconds / 3600000);
    let mins = Math.floor((milliseconds % 3600000) / 60000);
    let secs = Math.floor((milliseconds % 60000) / 1000);
    let ms = milliseconds % 1000;

    hrs = String(hrs).padStart(2,"0");
    mins = String(mins).padStart(2,"0");
    secs = String(secs).padStart(2,"0");
    ms = String(ms).padStart(3,"0");

    return `${hrs}:${mins}:${secs}.${ms}`;

}


// Update Stopwatch
function updateStopwatch(){

    elapsedTime = Date.now() - startTime;

    stopwatch.textContent = formatTime(elapsedTime);

}


// ==============================
// Start
// ==============================

startBtn.addEventListener("click",()=>{

    if(!running){

        startTime = Date.now() - elapsedTime;

        timer = setInterval(updateStopwatch,10);

        running = true;

    }

});


// ==============================
// Pause
// ==============================

pauseBtn.addEventListener("click",()=>{

    if(running){

        clearInterval(timer);

        running = false;

    }

});


// ==============================
// Reset
// ==============================

resetBtn.addEventListener("click",()=>{

    clearInterval(timer);

    running = false;

    elapsedTime = 0;

    stopwatch.textContent = "00:00:00.000";

    lapList.innerHTML = "";

    lapNumber = 1;

});


// ==============================
// Lap
// ==============================
lapBtn.addEventListener("click", () => {

    if (!running) return;

    // Get the latest elapsed time
    const currentTime = Date.now() - startTime;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapNumber}</span>
        <span>${formatTime(currentTime)}</span>
    `;

    lapList.prepend(li);

    lapNumber++;

});

// ==============================
// Button Enable / Disable
// ==============================

pauseBtn.disabled = false;
lapBtn.disabled = false;