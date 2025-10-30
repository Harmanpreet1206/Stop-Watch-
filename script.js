let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps");

function timeToString(time) {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}.${milliseconds.toString().padStart(3,"0")}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = timeToString(elapsedTime);
    }, 10);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapsList.innerHTML = "";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement("li");
    li.textContent = lapTime;

    // highlight new lap
    li.style.transform = "scale(1.2)";
    li.style.background = "rgba(255,255,255,0.45)";
    setTimeout(() => {
        li.style.transform = "scale(1)";
        li.style.background = "rgba(255,255,255,0.2)";
    }, 300);

    lapsList.appendChild(li);
    li.scrollIntoView({ behavior: "smooth" }); // scroll to latest lap
}

// Event Listeners
startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
