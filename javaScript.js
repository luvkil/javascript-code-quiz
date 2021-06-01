

//dom vaiables
var startContent = document.querySelector('#start-content-hidden');
var startButton = document.querySelector('.start-button');
var quizTime = document.querySelector('#time'); 
var runningScore = document.querySelector('#score');
var finalScore = document.querySelector('#final-score');



var questionContent = document.querySelector('#question-content');
var quizQuestion = document.querySelector('#quiz-questions');
var choiceList = document.querySelector('.choicelist');

var correctOrInncorrect = document.querySelector('#correct-incorrect');
var Result = document.querySelector('#result');
var formInitial = document.querySelector('initial');
var highScores = document.querySelector('#high-scores-container');
var submitButton = document.querySelector('#submit-btn');
var highScoreList = document.querySelector('#high-score-list');
var first = document.querySelector('#first'); 
var second= document.querySelector('#second'); 
var third = document.querySelector('#third');

//scope variables
var questionsAndChoices;
var randomQuestion;
var Time;
var score;
var initials;
var outcomeTImer;



//question set function
function questionSet (){
     questionsAndChoices = [

        {
            questions: "what is the language that powers front-end web   development?",
            choices: ["javascript","pyhon","abode","english"],
            answer: "javasript",
    },
        {
            questions: "what is a function use for ",
            choices: ["creating procedures and calculation","if or else statement", "making music",""],
            answer:"creating procedures and calculation",

    },

        {
            questions:"what is the opperand for not in javasript",
            choices:["//","!","==","booleon"],
            answer:"!",

    },

        {
            questions:"what is the purpose of the console.log function",
            choices:["its a part of html", "its use for debbugging", "useful to programmers for testing their code", "no purpose"],
            answer:"useful to programmers for testing their code",
    },
        {
            questions:"what is the purpose of an array in javasript",
            choices:["making list of values and ojects","its the same as a variable","use to make test","no purpose"],
            answer:"making list of choices and objests",
    },
        
  ]
};

function main(){
score = 0;
runningScore.textContent = score;
finalScore.textContent = score;
 

//setting time interval
 var runningTime = 60;
 Time = setInterval(() => {
    runningTime--;


    quizTime.textContent = runningTime;

 if(Time === 0){
    alert("quiz is over");
    clearInterval(time);
    }

  }, 1000);
}


function nextQuestionsAndChoices(){
//randomise question and choices list
randomQuestion = Math.floor( questionsAndChoices.length * Math.random());


//accessing choicelist with randomize index list
for( let i = 0; i < questionsAndChoices[randomQuestion].choices.length;i++ ){
        choiceList.children[i].textContent = questionsAndChoices[randomQuestion].choices[i];
    };

//random quiz questions 
    //quizQuestion.textContent = questionsAndChoices[randomQuestion].qestions;
    for(let j = 0; j < questionsAndChoices[randomQuestion].questions.length;j++){
        quizQuestion.textContent = questionsAndChoices[randomQuestion].questions;
    }

};

//function creating hidden section
function change(element){
    startContent.display.style = "none";
    questionContent.display.style = "none";
    Result.display.style = "none";
    highScores.display.style = "none";
    element.display.style = "display-block";
}

//how do I create local storage??

function intial(){
    var currentScore = {};
    var highScore = [];
    
    initials = formInitial;
    currentScore.initials = initials;
    highScore.score = score;

    if(localStorage.getitem("highScore")){
        highScore = JSON.parse(localStorage.getItem("highscore"))
    }

    highScore.push(currentScore);
    console.log('------------------------------------');
    console.log('highscore object =', highScore );
    console.log('------------------------------------');

    //set high score in local storage
    localStorage.setitem("highScore", JSON.stringyfy(highScore));

    //change to highscore
    change(highScores);
    //update high score

}

function gradeQestions(event) {
    var countdown =1;
//this code will run when function is triggered
    var outcome = (questionsAndChoices[randomQuestion].anwers == event.target.textContent);
// logic condition for checking answers and reseting time
    if(outcome){
        correctOrInncorrect.textContent = "true";
        score++;
        runningScore.textContent = score;
        finalScore.textContent = score;
    }else{
        correctOrInncorrect.textContent= "false!";
        runningTime -=2;
    }


    outcomeTImer = setInterval(() => {
        if(countdown <= 0){
            correctOrInncorrect.textContent = "";
            clearInterval(outcomeTImer)
        }
    }, 1000);

    //remove question from list
    questionsAndChoices.splice(randomQuestion, 1);

}

/****************starting calls************* */
//update high scores

startButton.addEventListener("click", function(){
questionSet();
intial();
nextQuestionsAndChoices();
change(Result);
change(questionContent);
change(startContent);
startContent.display.style = "none";
});

choiceList.addEventListener("click", function(){
    correctOrInncorrect.textContent = "";
    clearInterval(outcomeTImer);
    gradeQestions();
    nextQuestionsAndChoices();


})