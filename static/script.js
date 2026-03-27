let startTime;
let timerRunning = false;
let seconds, minutes, wpm, accuracy;
let fullText = "";
let myInterval;

function startTimer() {
    if (timerRunning == true) {
        return;
    }
    startTime = new Date().getTime();
    timerRunning = true;
    myInterval = setInterval(function () {
        updateResults();
    }, 1000);
}

function calculateTime() {
    let currentTime = new Date().getTime();
    let timePassed = currentTime - startTime;
    seconds = Math.floor(timePassed / 1000);
    document.querySelector("#time").innerHTML = seconds;
}

function calculateWPM(text, time) {
    let words = text.split(" ");
    if (time == 0) {
        wpm = 0;
    }
    else {
        minutes = seconds / 60;
        wpm = words.length / minutes;
    }
    document.querySelector("#wpm").innerHTML = wpm;
}

function calculateAccuracy(userText, originalText) {
    let correct = 0;
    if (userText.length == 0) {
        accuracy = 0;
    }
    else {
        for (let i = 0; i < userText.length; i++) {
            if (userText[i] == originalText[i]) {
                correct++;
            }
        }
        accuracy = (correct / userText.length) * 100;
    }
    document.querySelector("#accuracy").innerHTML = accuracy;
}

function updateResults() {
    const originalText = document.querySelector("#paragraph").innerText;

    calculateTime();
    calculateWPM(fullText, seconds);
    calculateAccuracy(fullText, originalText);

    if (fullText === originalText) {
        clearInterval(myInterval);
        timerRunning = false;
    }
}

function resetTest() {
    document.querySelector("#input").value = "";

    startTime = 0;
    clearInterval(myInterval);
    timerRunning = false;
    seconds = 0;
    minutes = 0;
    wpm = 0;
    accuracy = 0;

    document.getElementById("time").innerHTML = 0;
    document.getElementById("wpm").innerHTML = 0;
    document.getElementById("accuracy").innerHTML = 0;
}

document.querySelector("#input").addEventListener("input", function () {
    startTimer();

    const inputElement = document.querySelector("#input");
    const currentText = inputElement.value;

    if (currentText.length > 0 && currentText[currentText.length - 1] === " ") {

        // trim removes the space
        let typedWord = currentText.trim();
        if (fullText === "") {
            fullText = typedWord;
        }
        else {
            fullText = fullText + " " + typedWord;
        }
        inputElement.value = "";
    }
    updateResults();
});

document.getElementById("reset").addEventListener("click", resetTest);