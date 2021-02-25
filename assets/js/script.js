//done
//WHEN the start button is clicked 
//THEN timer starts and first screen appears
//WHEN initals are entered and submitted
//THEN the input value is paired with score value and stored in localstorage and displayed in the ul
//WHEN a question is answered
//THEN evaluates answer to see if it is correct and assign points and changes to next screen

//TODO
//WHEN all the questions have been answered or time runs out
//THEN the highscore screen shows up and askes for initals
//...almost done but still wierd stuff happening at last question

//WHEN reset highscore is clicked 
//THEN the localstorage is cleaned and score board is blank
//WHEN the questions are rendered
//THEN they are rendered in a random order each time
//README

//BONUS:
//get play agin button working
//create way compare stored score value and new input to rank the values



//header elements
var header = document.querySelector("header");
var timer = document.querySelector("#timer");
var highscoreLink = document.querySelector("highscoreLink");
var startButton = document.querySelector("#startButton");

//question elements
var main = document.querySelector("main");
var questionPlace = document.querySelector("#question");
var a1 = document.querySelector("#a1");
var a2 = document.querySelector("#a2");
var a3 = document.querySelector("#a3");
var a4 = document.querySelector("#a4");


var rightWrong = document.querySelector("#rightWrong");

//highscore screen elements
var figure = document.querySelector("figure");

var gameOverBanner = document.querySelector("#gameOverBanner");
var yourScore = document.querySelector("#yourScore");


var initialsBanner = document.querySelector("#initialsBanner");
var highscoreList = document.querySelector("#highscoreList");
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");
var userInput = document.querySelector("#userInput");
var playAgainButton = document.querySelector("#playAgainButton");

var questions = [
    {
        text: "what does the colon seperate when defining an object?",
        answers: [
            {
                text: "key and peele",
                correct: false
            },
            {
                text: "key and value",
                correct: true
            },
            {
                text: "key and stone light",
                correct: false
            },
            {
                text: "key and largo",
                correct: false
            }
        ]
    },

    {
        text: "To create your own data attributes what must the word 'data' be followed with?",
        answers: [
            {
                text: "&#128076",
                correct: false
            },
            {
                text: "  =  ",
                correct: false
            },
            {
                text: "  l337  ",
                correct: false
            },
            {
                text:  "  -  ",
                correct: true
            }
        ]
    },

    {
        text: "If you were a hotdog and you were starving would you eat yourself?",
        answers: [
            {
                text: "What is this?",
                correct: false
            },
            {
                text: "This has nothing to do with coding",
                correct: false
            },
            {
                text:  "I know I would!",
                correct: true
            },
            {
                text: "...is that a 25 year old SNL reference?",
                correct: false
            }
        ]
    },

    {
        text: "What encloses the statements of a function?",
        answers: [
            {
                text: "Square Brackets",
                correct: false
            },
            {
                text:  "Curley Brackets",
                correct: true
            },
            {
                text: "Wavey brackets",
                correct: false
            },
            {
                text: "cyclone fencing",
                correct: false
            }
        ]
    },
]

var answerPlaceArray = [a1, a2, a3, a4];

var score = 0;

var qaIndex = 0;

var timeLeft = 600;
timer.textContent = timeLeft;

var scoreArray = JSON.parse(localStorage.getItem("scoreName"))||[];

var index = 0;

var qaChange = function(){
    if(qaIndex===questions.length){
        return
    }

    //render a question. 
    questionPlace.innerHTML = questions[qaIndex].text;
    
    //fill in coresponding answers 
    for (i=0; i<questions[qaIndex].answers.length; i++){
        answerPlaceArray[i].innerHTML = questions[qaIndex].answers[i].text;
        answerPlaceArray[i].setAttribute("data-correct", questions[qaIndex].answers[i].correct)
    }
};

var rightWrongDisplay = function(event){

    //------------right answer------------------
    console.log(score);
    if(event.target.dataset.correct === "true"){
        console.log("qaIndex:" + qaIndex);
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Correct";
        score+=10;
        setTimeout(function(){
            rightWrong.setAttribute("style", "display: none");
        }, 500);
        
        //--------------wrong answer----------------
    } else {
        console.log("qaIndex:" + qaIndex);
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Incorrect";
        timeLeft += -15;
        // console.log("Wrong!")
        setTimeout(function(){
            rightWrong.setAttribute("style", "display: none");
        }, 500);   
    }
}


//------------score handling-------------
var storeScores = function(){
    var scoreName = {
        scoreOb: score,
        initialsOb: userInput.value
    };
    scoreArray.push(scoreName);
    localStorage.setItem("scoreName", JSON.stringify(scoreArray));
}

var renderScores = function(){
    if(localStorage.getItem("scoreName")===null){
        return
    }

    scoreArray.sort(function(a, b){
        return b.scoreOb - a.scoreOb
    });
   
    scoreArray.forEach(function(score){
        var userScoreLi = document.createElement("li");
        index++;
        userScoreLi.setAttribute("style", "color: black; width: 300px; text-align: center; background: lightgray;");
        highscoreList.appendChild(userScoreLi);
        userScoreLi.textContent = index + ". " + score.initialsOb + ": " + score.scoreOb;
    });
        figure.setAttribute("style", "display: flex");
        playAgainButton.setAttribute("style", "display: block");

        header.setAttribute("style", "display: none");
        startButton.setAttribute("style", "display: none");
        main.setAttribute("style", "display: none");
        gameOverBanner.setAttribute("style", "display: none");
        initialsBanner.setAttribute("style", "display: none");
        yourScore.setAttribute("style", "display: none");
        userInput.setAttribute("style", "display: none");
        submitButton.setAttribute("style", "display: none");
        clearButton.setAttribute("style", "display: none");
        
}


//--------------buttons functionality-------------
document.addEventListener('click', function(event){
        console.log(qaIndex);
    //----------start button-----------
    console.log("qaIndex:" + qaIndex);
    if(event.target.matches("#startButton")){
        qaChange();
        main.setAttribute("style", "display:flex");
        startButton.setAttribute("style", "display: none");

        //----------timer---------------
        var countDown = setInterval(function(){
            timeLeft--;
            timer.textContent = timeLeft;

            //------------game over------------
            if(timeLeft <= 0 || qaIndex===questions.length){
                clearInterval(countDown);
                // renderScores(); 
                timer.innerHTML = "gameOver!";
                //goes to submit initials screen
                main.setAttribute("style", "display: none");
                figure.setAttribute("style", "display: flex");
                gameOverBanner.innerHTML = "GAME OVER!";
                yourScore.innerHTML = "your score: " + score;
            }
        }, 1000);

        //--------------answer buttons------------
    } else if (event.target.matches(".answer")){
        rightWrongDisplay(event);
        qaIndex++;
        qaChange();

        //------------submit button----------------
    } else if (event.target.matches("#submitButton")){
        var x=0;
        x++;
        storeScores();
        renderScores();
        userInput.value = "";

        //---------------reset scores button------------
    } else if (event.target.matches("#clearButton")){
        localStorage.clear();
        for(i=0; i<highscoreList.childNodes.length; i++){
            highscoreList.remove(highscoreList.childNodes[i]);
        }

        //---------go to highscores button-----------
    } else if (event.target.matches("#highscoreLink")){
        renderScores();

    //------------play again button------------------
    } else if (event.target.matches("#playAgainButton")){
        location.reload();
    }
})