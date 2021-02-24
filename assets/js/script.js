//done
//WHEN the start button is clicked 
//THEN timer starts and first screen appears

//TODO
//WHEN a question is answer
//THEN evaluates answer to see if it is correct and assign points and changes to next screen
//WHEN all the questions have been answered or time runs out
//THEN the highscore screen shows up and askes for initals
//WHEN initals are entered and submitted
//THEN the input value is paired with score value and stored in localstorage and displayed in the ul
//WHEN reset highscore is clicked 
//THEN the localstorage is cleaned and score board is blank
//README

//BONUS:
//get play agin button working
//create way compare stored score value and new input to rank the values



//header elements
var header = document.querySelector("header");

var timer = document.querySelector("#timer");

timer.textContent = timeLeft;
var highscoreLink = document.querySelector("highscoreLink");

var startButton = document.querySelector("#startButton");

//screen elements
var main = document.querySelector("main");
// var screenAll = document.querySelector(".screen");

var questionPlace = document.querySelector("#question");
var a1 = document.querySelector("#a1");
var a2 = document.querySelector("#a2");
var a3 = document.querySelector("#a3");
var a4 = document.querySelector("#a4");

// var answer = document.querySelectorAll(".answer");
// var correctAnswer = document.querySelector("#correctAnswer");
// var incorrectAnswer = document.querySelector("#incorrectAnswer");
var rightWrong = document.querySelector("#rightWrong");

//highscore screen elements
var figure = document.querySelector("figure");

var gameOverBanner = document.querySelector("#gameOverBanner");
var yourScore = document.querySelector("#yourScore");

var highscoreList = document.querySelector("#highscoreList");
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");
var userInput = document.querySelector("#userInput");



var question1 = {
    question: "what does the colon seperate when defining an object?",
    correctAnswer: "key and value",
    incorrectAnswer1: "key and peele",
    incorrectAnswer2: "key and stone light",
    incorrectAnswer3: "key and largo",  
};
var question2 = {
    question: "To create your own data attributes what must the word 'data' be followed with?",
    correctAnswer: "  -  ",
    incorrectAnswer1: "&#128076",
    incorrectAnswer2: "  =  ",
    incorrectAnswer3: "  l337  ",
};

var question3 = {
    question: "If you were a hotdog and you were starving would you eat yourself?",
    correctAnswer: "I know I would!",
    incorrectAnswer1: "What is this?",
    incorrectAnswer2: "This has nothing to do with coding",
    incorrectAnswer3: "...is that a 25 year old SNL reference?",
};

var question4 = {
    question: "What encloses the statements of a function?",
    correctAnswer: "Curley Brackets",
    incorrectAnswer1: "Square Brackets",
    incorrectAnswer2: "Wavey brackets",
    incorrectAnswer3: "cyclone fencing",
};

var qaOut = {
    question:"",
    correctAnswer:"",
    incorrectAnswer1:"",
    incorrectAnswer2: "",
    incorrectAnswer3: "",
}

var qaArray = [question1, question2, question3, question4, qaOut];

var answerPlaceArray = [a1, a2, a3, a4];

var answerRandomArray = [];

var score = 0;

var qaIndex = 0;

var timeLeft = 300;

var x=0;

var randomIndex;

var shuffle = function(){

}

var qaChange = function(){
    //generate a question. 
    questionPlace.innerHTML = qaArray[qaIndex].question;
    var answerArray = [qaArray[qaIndex].incorrectAnswer1, qaArray[qaIndex].incorrectAnswer2, qaArray[qaIndex].incorrectAnswer3, qaArray[qaIndex].correctAnswer ];
    
    // should be be placed randomly
    
    for (i=0; i<answerArray.length; i++){
        answerPlaceArray[i].innerHTML = answerArray[i];
    }
    
    // incrementing here makes it wierd
    // qaIndex++;
};

var rightWrongDisplay = function(event){
    
    console.log(event.target.textContent);

        //------------right answer------------------
        if(event.target.textContent === qaArray[qaIndex].correctAnswer){
            console.log("Right");
            rightWrong.setAttribute("style", "display: block");
            rightWrong.innerHTML= "Correct";
            score++;
            setTimeout(function(){
                rightWrong.setAttribute("style", "display: none");
            }, 500);
            
            //--------------wrong answer----------------
        } else {
            rightWrong.setAttribute("style", "display: block");
            rightWrong.innerHTML= "Incorrect";
            timeLeft += -15;
            console.log("Wrong!")
            setTimeout(function(){
                rightWrong.setAttribute("style", "display: none");
            }, 500);
            
        }
    console.log(qaArray[qaIndex].correctAnswer);
}

var storeScores = function(){
    var scoreName = {
        scoreOb: score,
        initialsOb: userInput.value
    }

    localStorage.setItem("scoreName", JSON.stringify(scoreName));
}

var renderScores = function(){
    var userScoreLi = document.createElement("li");
    highscoreList.appendChild(userScoreLi);
    userScoreLi.setAttribute("style", "color: black; width: 300px; text-align: center; background: lightgray;");

    var lastScore = JSON.parse(localStorage.getItem("scoreName"));
    userScoreLi.innerHTML = lastScore.initialsOb + ": " + lastScore.scoreOb;
}



document.addEventListener('click', function(event){
        console.log(qaIndex);
    //----------start button-----------
    if(event.target.matches("#startButton")){
        qaChange();
        main.setAttribute("style", "display:flex");
        startButton.setAttribute("style", "display: none");

        //----------timer---------------
        var countDown = setInterval(function(){
            timeLeft--;
            timer.textContent = timeLeft;

            //------------game over------------
            if(timeLeft <= 0 || qaIndex>qaArray.length -1){
                clearInterval(countDown);
                renderScores(); 
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
        qaChange();
        rightWrongDisplay(event);
        qaIndex++;
        console.log(qaIndex);
        


        //------------submit button----------------
    } else if (event.target.matches("#submitButton")){
        x++;
        console.log(userInput.value);
        storeScores();
        
        var userScoreLi2 = document.createElement("li");
        highscoreList.appendChild(userScoreLi2);
        userScoreLi2.setAttribute("style", "color: black; width: 300px; text-align: center; background: lightgray;");
        userScoreLi2.setAttribute("id", "scoreli" + x);
        userScoreLi2.innerHTML = userInput.value + ": " + score;
    };
})