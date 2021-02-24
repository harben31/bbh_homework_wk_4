//done
//WHEN the start button is clicked 
//THEN timer starts and first screen appears
//WHEN a question is answer
//THEN evaluates answer to see if it is correct and assign points and changes to next screen
//WHEN all the questions have been answered or time runs out
//THEN the highscore screen shows up and askes for initals
//WHEN initals are entered and submitted
//THEN the input value is paired with score value and stored in localstorage and displayed in the ul
//WHEN reset highscore is clicked 
//THEN the localstorage is cleaned and score board is blank

//TODO
//README

//BONUS:
//get play agin button working
//create way compare stored score value and new input to rank the values



//header elements
var header = document.querySelector("header");

var timer = document.querySelector("#timer");
var timeLeft = 300;
var highscoreLink = document.querySelector("highscoreLink");

var startButton = document.querySelector("#startButton");

//screen elements
var main = document.querySelector("main");
var screenAll = document.querySelector(".screen");

var answer = document.querySelectorAll(".answer");
var correctAnswer = document.querySelector("#correctAnswer");
var incorrectAnswer = document.querySelector("#incorrectAnswer");
var rightWrong = document.querySelector("#rightWrong");

//highscore screen elements
var figure = document.querySelector("figure");

var gameOverBanner = document.querySelector("#gameOverBanner");
var yourScore = document.querySelector("#yourScore");

var highscoreList = document.querySelector("#highscoreList");
var submitButton = document.querySelector("#submitButton");
var clearButton = document.querySelector("#clearButton");
var userInput = document.querySelector("#userInput");

var score = 0;

var screenIndex = 0;

x=0;



var screenChange = function(){
    console.log(screenIndex);
    main.children[screenIndex].setAttribute("style", "display: none");
    screenIndex++;
    console.log(screenIndex);
    main.children[screenIndex].setAttribute("style", "display: block");
    console.log("NEXT!")
    console.log(main.children[screenIndex])

    if(event.target.matches('.incorrectAnswer')){
        console.log("wrong");
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Incorrect";
        setTimeout(function(){
            rightWrong.setAttribute("style", "display: none");
        }, 500)
     } else {
        rightWrong.setAttribute("style", "display: block");
        rightWrong.innerHTML= "Correct";
        console.log("right")
        setTimeout(function(){
            rightWrong.setAttribute("style", "display: none");
        }, 500);

    }

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



document.addEventListener("click", function(event){

    //start button
    if(event.target.matches("#startButton")){
        main.setAttribute("style", "display:flex");
        startButton.setAttribute("style", "display: none");
        figure.setAttribute("style", "display: none");

        //timer
        var countDown = setInterval(function(){
        timeLeft--;
        timer.innerHTML = timeLeft;
        //why does this only work in the interval?

        //this is what happens at game over
        //timeLeft <= 0 || last screen is cleared 
        //===undefined seems like a hack
        if(timeLeft<=0 || main.children[screenIndex].matches("#rightWrong")){
            clearInterval(countDown);
            timer.innerHTML = "Times Up!";
            //goes to submit initials screen
            main.setAttribute("style", "display: none");
            figure.setAttribute("style", "display: flex");
            gameOverBanner.innerHTML = "GAME OVER!";
            yourScore.innerHTML = "your score: " + score;
            renderScores();
        }
    }, 1000)

        //Correct Answer
    } else if(event.target.matches(".incorrectAnswer")) {
        timeLeft-=15;
        screenChange();

        //incorrect answer
    } else if (event.target.matches(".correctAnswer")){
        score += 10;
        console.log(score);
        screenChange();
        
        //submit button 
    } else if (event.target.matches("#submitButton")){
       
        x++;
        console.log(userInput.value);
        storeScores();
        
        var userScoreLi2 = document.createElement("li");
        highscoreList.appendChild(userScoreLi2);
        userScoreLi2.setAttribute("style", "color: black; width: 300px; text-align: center; background: lightgray;");
        userScoreLi2.setAttribute("id", "scoreli" + x);
        userScoreLi2.innerHTML = userInput.value + ": " + score;
        // startButton.setAttribute("style", "display: block");
        // startButton.innerHTML = "Play Again"

        
    } else if (event.target.matches("#clearButton")){
        localStorage.clear();
        for(i=0; i<highscoreList.childNodes.length; i++){
            highscoreList.remove(highscoreList.childNodes[i]);
            console.log(highscoreList.childNodes[i]);
        }
        console.log("clear Button");
    }
    //MAKE FIGURE FORM AND RESET DEFAULT?
})


