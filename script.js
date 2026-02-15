// Codédex - JavaScript Course //
// Final Project: Pomodoro/To-do list app //
// script.js //

// Generates random tagline.
document.addEventListener("DOMContentLoaded", () => {
    // -- Tagline array --
    const taglineArray = [
        'Ketch-up on your goals. ✨',
        'Fresh focus, delivered in slices. 🔪',
        'Work hard, snack often. 🥗',
        'Your focus buddy for the daily grind. 😊'
    ];

    // Selects a random tagline.
    const taglineIndex = Math.floor(Math.random() * taglineArray.length);
    const randomTagline = document.getElementById("random-tagline");

    // Assigns the value of taglineIndex to randomTagline.
    randomTagline.innerText = taglineArray[taglineIndex];
});

// -- DOM elements --
const timerDisplay = document.querySelector('#timer-display span');
const minutesInput = document.getElementById('minutes-input');
const setButton = document.getElementById('set-button');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// -- Timer variables --
let timeLeft; // In seconds.
let timerId = null;

// -- Timer functions --

// Updates the timers-display.
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Sets initial time.
setButton.addEventListener('click', () => {
    const mins = parseInt(minutesInput.value);
    if (mins > 0 && mins <= 60) {
        timeLeft = mins * 60;
        updateDisplay();
    } else {
        alert("Please enter minutes between 1 and 60.");
    }
});

// Starts timer.
startButton.addEventListener('click', () => {
    if (timerId !== null) return; // Prevents multiple intervals.
    if (!timeLeft) timeLeft = 1 * 60; // Default if not set.

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alert("Time's up! ⏰ Take a break.");
        }
    }, 1000);
});

// Stops timer.
stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
});

// Resets timer.
resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 1 * 60; // Back to default.
    updateDisplay();
});

// -- Task list form --

taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from refreshing.
    
    const taskText = '📌 ' + taskInput.value;
    
    // Creates new list item.
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText} 
        <button class="delete-btn" style="margin-left: 10px;">X</button>
    `;
    
    // Adds to list.
    taskList.appendChild(li);
    
    // Clears input.
    taskInput.value = '';

    // Adds delete functionality.
    li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
});
