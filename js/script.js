//  global variables declaration
var CardsArray = document.getElementById('Cards') // shuffle on its elements
var flipCardItemArray = Array.from(document.getElementsByClassName('flip-card__item'));
var flipCardInnerArray = Array.from(document.getElementsByClassName('flip-card-inner'));
var checkArray = [] // array will hold two sections contents
var usersRates = [];
var userRate;
//timer and score variables
var cardsRemovedArray = [];
var timer;
var counter = 60;
var GameTimer;
// object id counter
var count = 0;


//*********************************************************************//events//*************************************************
//call click event
addClickEvent();
//random cards positions when page refreshed
for (var i = 0; i < flipCardInnerArray.length; i++) {
    window.onload = Randomization(flipCardItemArray);

}
//*********************************************************************//Functions//*************************************************
function addClickEvent() {
    for (var i = 0; i < flipCardItemArray.length; i++) {
        flipCardItemArray[i].addEventListener('click', rotateflipCard)
    }
}
// reload Page function 
function playAgain() {
    location.reload()
}

//***************************************//click Event function//******************************************************************* */
function rotateflipCard() {
    this.firstChild.nextSibling.classList.toggle('rotate')
    createObject(this)
    checkArray.push(createObject(this)); //this presents section on clicked
    if (checkArray.length == 2) {
        removeafterEvent()
        check()
    }
    removeEvent() // after secnod click remove event
}
//*************************************//Create Object//********************************************************************* */
function createObject(card) {
    return obj = {
        id: count++,
        name: card.lastElementChild.lastElementChild.lastElementChild.alt
    }
}
//************************************//Check function//********************************************************************** */
function check() {
    if (checkArray[0].name == checkArray[1].name) {
        clapping();
        //add animation
        for (var i = 0; i < flipCardInnerArray.length; i++) {
            if (flipCardInnerArray[i].classList.contains('rotate')) {
                flipCardInnerArray[i].lastElementChild.lastElementChild.classList.add('similarity')
            }
        }
        // use timer to handle invisiblity  when 2 card are same
        timer = setTimeout(() => {
            for (var i = 0; i < flipCardInnerArray.length; i++) {
                if (flipCardInnerArray[i].lastElementChild.lastElementChild.alt == checkArray[0].name) {
                    cardsRemovedArray.push("1")
                    flipCardInnerArray[i].remove()
                    removeEvent()
                }
            }
            checkArray.length = 0;
        }, 1000);
        addClickEvent() // to add event after third click removing event
    } else {
        timer = setTimeout(() => {
            for (var i = 0; i < flipCardInnerArray.length; i++) {
                flipCardInnerArray[i].classList.remove('rotate')
                checkArray.length = 0;
                addClickEvent() // add event after second click removing event
            }
            //  Randomization(flipCardItemArray)
        }, 700);
    }
}
//****************************************//removeClick Event//****************************************************************** */
function removeEvent() {
    for (var i = 0; i < flipCardInnerArray.length; i++) {
        if (flipCardInnerArray[i].classList.contains('rotate')) {
            flipCardItemArray[i].removeEventListener('click', rotateflipCard)
        }
    }
}
//to handle third click use removeafterEvent
function removeafterEvent() {
    for (var i = 0; i < flipCardInnerArray.length; i++) {
        if (flipCardInnerArray[i]) {
            flipCardItemArray[i].removeEventListener('click', rotateflipCard)
        }
    }
}
//*********************************************//Randomization//*************************************************************
function Randomization(arr) {
    var generation = arr[Math.floor(Math.random() * arr.length)]
    CardsArray.firstElementChild.firstElementChild.appendChild(generation);
}
console.log(CardsArray.firstElementChild.firstElementChild);

// ************************************************** Game Audio *****************************************************************

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
function clapping() {
    var myMusic = new sound("audio/clapping.mp3");
    myMusic.play();
}
function gameSong() {
    var mySound = new sound("audio/gameSound.mp3");
    mySound.play();
}
function stopGameSong() {
    var mySound = new sound("audio/gameSound.mp3");
    mySound.stop();
}
function gameWinning() {
    var winning = new sound("audio/winner.mp3");
    winning.play();
}
function gameFailed() {
    var failed = new sound("audio/failed.mp3");
    failed.play();
}

// ************************************************** Game Controls *****************************************************************
//Timer
function gameTimer() {
    document.getElementById('timer').innerText = counter;
    GameTimer = setInterval(() => {
        document.getElementById('timer').innerText = counter;
        counter--;
        console.log(counter);
        if (cardsRemovedArray.length == "8" || counter == "-1") {
            calculateScore(counter)
            clearInterval(GameTimer);
            setTimeout(() => {
                $('#endModal').modal('show')
            }, 1500);
        }
    }, 50);

}
//calculate Score
function calculateScore(lastCounter) {
    if (lastCounter >= 41 && lastCounter <= 60 || cardsRemovedArray.length == 8) {
        document.getElementById('score').innerText = "EXCELLENT";
        gameWinning();
    } else if (lastCounter >= 21 && lastCounter <= 40 || cardsRemovedArray.length < 8 && cardsRemovedArray.length >= 6) {
        document.getElementById('score').innerText = "GOOD";
        gameWinning();
    } else {
        document.getElementById('score').innerText = "FAILED";
        gameFailed();
    }
}

// Starting modal
$(window).on('load', function () {
    $('#myModal').modal('show');
});
function startGame(e) {
    e.target.setAttribute("disabled", true)
    gameTimer()
    gameSong()
    $('#myModal').modal('hide');
}

//Ending Modal
var rateStars = Array.from(document.getElementsByClassName('rate'))
    for (let i = 0; i <= rateStars.length; i++) {
        if(rateStars[i]){
            rateStars[i].addEventListener('click', function () {
                userRate = rateStars[i].value
                    for (let i = 0; i <= rateStars.length; i++) {
                        if (rateStars[i].value <= this.value) {
                        rateStars[i].classList.add('checked')
                    }
                }
            })
        }
    }



