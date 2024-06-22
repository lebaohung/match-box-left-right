var data = {
    components: ['子', '女', '亻', '户', '氵', '火'],
    correctCombinations: {
        '女子': '好',
        '亻子': '仔',
        '氵户': '沪',
        '火户': '炉'
    },
    selectedComponents: [],
    result: ''
}
let timerInterval;
let remainingTime = 60000; // 5 minutes in milliseconds

let correctPair = [];

function updateTime() {
    if (remainingTime > 0) {
        remainingTime -= 1000; // Decrement by 1 second (1000 milliseconds)
    } else {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        disableButtonsInDiv('board')
        document.getElementById('message').textContent = 'Time is up!';
        document.getElementById("score2").innerHTML  = "Score: " + correctPair.length;
        remainingTime = 0;
    }

    let minutes = Math.floor(remainingTime / 60000);
    let seconds = Math.floor((remainingTime % 60000) / 1000);

    // Format numbers to always have two digits
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTime, 1000);
        document.getElementById('message').textContent = ''; // Clear any previous message
    }
    enableButtonsInDiv('board');
    hideStartButton();
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    remainingTime = 60000; // Reset to 5 minutes
    document.getElementById('timer').textContent = '01:00';
    document.getElementById('message').textContent = ''; // Clear any previous message
    disableButtonsInDiv('board');
}


function selectComponent(event) { 
    const selected = event.target.innerHTML;
    const selectedComponents = data.selectedComponents;
    const correctCombinations = data.correctCombinations;

    if (selectedComponents.length < 2) {
        selectedComponents.push(selected);
        data.selectedComponents = selectedComponents;
    }

    if (selectedComponents.length === 2) {
        const combined = selectedComponents.join('');
        let result = correctCombinations[combined];
        if (result) {
            if (!correctPair.includes(result)) {
                correctPair.push(result);
            }
            document.getElementById("score").innerHTML  = "Correct: " + correctPair.join(" ,");
        } else {
           result = '错误组合'; 
        }
        
        data.result = result;
        document.getElementById("result").innerHTML  = result;
        
        disableButtonsInDiv("board");
        resetSelection();
    }
}

function resetSelection() {
    setTimeout(() => {
        data.selectedComponents = [];
        data.result = '';
        document.getElementById("result").innerHTML  = data.result;
        enableButtonsInDiv('board')
    }, 500);
}


var charList;
var board = [];

window.onload = function () {
    resetTimer();
    shuffleCards();
    startGame();
}

function shuffleCards() {
    charList = Array(2).fill(data.components).reduce((a, b) => a.concat(b));
    //shuffle
    for (let i = 0; i < charList.length; i++) {
        let j = Math.floor(Math.random() * charList.length); //get random index
        //swap
        let temp = charList[i];
        charList[i] = charList[j];
        charList[j] = temp;
    }
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < 4; r++) {
        let row = [];
        for (let c = 0; c < 3; c++) {
            let character = charList.pop();
            row.push(character); //JS

            let box = document.createElement("button");
            box.setAttribute("id", "button2");
            box.setAttribute("class", "button");
            box.textContent = character;
            box.setAttribute("disabled", true)
            
            box.addEventListener("click", selectComponent);
            document.getElementById("board").append(box);

        }
        board.push(row);
    }
}

function disableButtonsInDiv(divId) {
    const div = document.getElementById(divId);
    const buttons = div.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

function enableButtonsInDiv(divId) {
    const div = document.getElementById(divId);
    const buttons = div.querySelectorAll('button');
    buttons.forEach(button => button.disabled = false);
}

function hideStartButton() {
    const startButton = document.getElementById('startButton');
    startButton.style.display = 'none';
}