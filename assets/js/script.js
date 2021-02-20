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
//WHEN reset highscore is clicked the localstorage is cleaned and score board is blank

//header elements
var header = document.querySelector("header");

var timer = document.querySelector("#timer");
var timeLeft = 3;
var highscoreLink = document.querySelector("highscoreLink");

var startButton = document.querySelector("#startButton");

//screen elements
var main = document.querySelector("main");
var screenAll = document.querySelector(".screen");

var answer = document.querySelectorAll(".answer");
var correctAnswer = document.querySelector("#correctAnswer");
var incorrectAnswer = document.querySelector("#incorrectAnswer");
var rightWrong = document.querySelector(".rightWrong");

//highscore screen elements
var figure = document.querySelector("figure");

var gameOverBanner = document.querySelector("#gameOverBanner");
var yourScore = document.querySelector("#yourScore");

var highscoreList = document.querySelector("#highscoreList");
var submitButton = document.querySelector("#submitButton");
var userInput = document.querySelector("#userInput");

var score = 0;



// lets try that event delegation method
document.addEventListener("click", function(event){

    if(event.target.matches("#startButton")){
        console.log("hello there");
        main.setAttribute("style", "display:flex");
        //turn on whole main or just 1st screen?
        startButton.setAttribute("style", "display: none");
        //timer
        var countDown = setInterval(function(){
        timeLeft--;
        timer.innerHTML = timeLeft;
        //why does this only work in the interval?

        //this is what happens at game over
        if(timeLeft<=0){
            clearInterval(countDown);
            timer.innerHTML = "Times Up!";
            //goes to submit initials screen
            main.setAttribute("style", "display: none");
            figure.setAttribute("style", "display: flex");
            gameOverBanner.innerHTML = "GAME OVER!";
            yourScore.innerHTML = "your score: " + score;
        }
    }, 1000)

    } else if(event.target.matches(".incorrectAnswer")) {
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Incorrect";
        timeLeft-=15;

    } else if (event.target.matches(".correctAnswer")){
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Correct";
        score += 10;
        console.log(score);

    } else if (event.target.matches("#submitButton")){
        console.log(userInput.value);
        localStorage.setItem("userInput", userInput.value);
        localStorage.setItem("score", score);
        var userScoreLi = document.createElement("li");
        highscoreList.appendChild(userScoreLi);
       //need to figure out the localeStoarge stuff and why the innerhtml for new li is in the console but does not render



    }
    //add submit button functionality
})


