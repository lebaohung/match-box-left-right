var data = {
    components: ['子', '女', '亻', '户', '氵', '火'],
    correctCombinations: {
        '女子': '好',
        '亻子': '仔',
        '氵户': '沪',
        '火户': '炉'
    },
    correctMap : {
        '女' : {
            '女子': '好 hǎo',
            '女也': '她 tā',
            '女马': '妈 mā',
            '女未': '妹 mèi',
            '女且': '姐 jiě',
            '女生': '姓 xìng'
        },
        '亻' : {
            '亻尔':'姓 xìng',
            '亻也':'他 tā',
            '亻我':'俄 é',
            '亻言':'信 xīn ',
            '亻本':'体 tǐ',
            '亻生':'体 tǐ',
            '亻立':'位 wèi',
            '亻两':'俩 liǎ',
            '亻故':'做 zuò',
            '亻旦':'但 dān',
            '亻牛':'件 jiàn'
        },
        '口' : {
            '口马':'吗 ma',
            '口曷':'喝 hē',
            '口丩':'叫 jiào',
            '口乞':'吃 chī',
            '口卑':'啤 pí',
            '口斤':'听 tīng'
        },
        '氵' : {
            '氵又':'汉 hàn',
            '氵去':'法 fǎ',
            '氵殳':'没 méi',
            '氵气':'汽 qì'
        },
        ' 讠' : {
            ' 讠巷':'港 xiāng',
            ' 讠酉':'酒 jiǔ',
            ' 讠青':'请 qǐng',
            ' 讠射':'谢 xiè',
            ' 讠舌':'话 huà'
        },
        '又' : {
            '又隹':'难 nán',
            '又寸':'对 duì',
            '又鸟':'鸡 jī',
            '又欠':'欢 huān'
        },
        '饣' : {
            '饣反':'欢 huān',
            '饣官':'馆 guǎn',
            '饣曼':'馒 mán',
            '饣交':'饺 jiǎo'
        },
        '扌' : {
            '扌戈':'找 zhǎo',
            '扌奂':'换 huàn',
            '扌受':'授 shòu'
        },
        '日' : {
            '日月':'明 míng',
            '日乍':'昨 zuó'
        }
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

// function startGame() {
//     //arrange the board 4x5
//     for (let r = 0; r < 4; r++) {
//         let row = [];
//         for (let c = 0; c < 3; c++) {
//             let character = charList.pop();
//             row.push(character); //JS
//
//             let box = document.createElement("button");
//             box.setAttribute("id", "button2");
//             box.setAttribute("class", "button");
//             box.textContent = character;
//             box.setAttribute("disabled", true)
//            
//             box.addEventListener("click", selectComponent);
//             document.getElementById("board").append(box);
//
//         }
//         board.push(row);
//     }
// }

function startGame2() {

    for (let center in data.correctMap) {
        
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