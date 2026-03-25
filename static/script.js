let startTime;
let timerRunning = false;
let seconds, minutes, wpm, accuracy;

function startTimer() {
    if (timerRunning == false)
    {
        startTime = new Date().getTime();
        timerRunning = true;
    }
    else
    {
        return;
    }
}

function calculateTime() {
    let currentTime = new Date().getTime();
    let timePassed = currentTime - startTime;
    seconds = Math.floor(timePassed / 1000); 
    document.querySelector("#time").innerHTML = seconds;
}

function calculateWPM(text, time) {
    let words = text.split(" ");
    if (time == 0)
    {
        wpm = 0;   
    }
    else
    {
        minutes = seconds / 60;
        wpm = words.length / minutes;
    }
    document.querySelector("#wpm").innerHTML = wpm; 
}

function calculateAccuracy(userText, originalText) {
    let correct = 0;
    if (userText.length == 0)
    {
        accuracy = 0;
    }
    else
    {
        for (let i = 0; i < userText.length; i++)
        {
            if (userText[i] == originalText[i])
            {
                correct++;
            }
        }
        accuracy = (correct / userText.length) * 100;
    }
    document.querySelector("#accuracy").innerHTML = accuracy; 
}

function updateResults() {
    const userText = document.querySelector("#input").value;
    const originalText = document.querySelector("#paragraph").innerText;

    calculateTime();
    calculateWPM(userText, seconds);
    calculateAccuracy(userText, originalText);
}

function resetTest() {
    document.querySelector("#input").value = "";

    startTime = 0;
    timerRunning = false;
    seconds = 0;
    minutes = 0;
    wpm = 0;
    accuracy = 0;

    document.getElementById("time").innerHTML = 0;
    document.getElementById("wpm").innerHTML = 0;
    document.getElementById("accuracy").innerHTML = 0;
}

document.querySelector("#input").addEventListener("input", function() {
    startTimer();
    updateResults();
});

document.getElementById("reset").addEventListener("click", resetTest);