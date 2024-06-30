const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0



document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence();
        started = true
    }
})

for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", (e)=>{
        let chosenColor = e.target.id
        console.log(chosenColor);
        userClickedPattern.push(chosenColor)
        pressAnimation(chosenColor)
        let audio = new Audio(`./sounds/${chosenColor}.mp3`)
        audio.play()
        checkAnswer()
    })
}

function pressAnimation(currentColor) {
    let activeBtn = document.querySelector(`.${currentColor}`);
    activeBtn.classList.add('pressed');
    setTimeout(() => {activeBtn.classList.remove('pressed')}, 200);
}


// userClickedPattern.length - 1
function checkAnswer() {
    // check if the user input is the same as game pattern in each press  //currentLevel
    let lastClickIndex = userClickedPattern.length - 1
    if (gamePattern[lastClickIndex] === userClickedPattern[lastClickIndex]) {
        // if the user input all the btns correctly then the size of the userClickedPattern should be equal to the 
        // game pattern length then we get to next sequence 
        console.log(gamePattern);
        console.log(userClickedPattern);
        
        if (userClickedPattern.length === gamePattern.length) {
            // should add timeout so game can be playable   
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        let audio = new Audio(`./sounds/wrong.mp3`)
        audio.play()
        document.querySelector("body").classList.add("game-over");

        document.querySelector("#level-title").innerHTML = "Game Over, press any key to restart";
        
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence(){
    // reset all clicked btns arry
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = 'Level '+ level;

    let randomChosenColor = buttonColors[Math.floor(Math.random() * buttonColors.length)]
    console.log(randomChosenColor);
    // random color from 0 to 3 that gonna select an element in the buttonColors array

    gamePattern.push(randomChosenColor)
    document.querySelector(`#${randomChosenColor}`).classList.add('pressed')
    // set timeout to animate the pressing action 
    setTimeout(() => {
        document.querySelector(`#${randomChosenColor}`).classList.remove('pressed')
    }, 200);
    
    let audio = new Audio(`./sounds/${randomChosenColor}.mp3`)
    audio.play()
}


function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []
    started = false;
}
