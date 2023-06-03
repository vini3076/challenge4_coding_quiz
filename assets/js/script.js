var score = 0;
var timerCount;
var answerCorrect = false;
var userAnswer = " ";
var element;
var qIndex = 0;
var gameFinish = false;
var highScores = [];

var startSectionEl = document.getElementById("start-section");
var startButtonEl = document.getElementById("start-button");

var questionSectionEl = document.getElementById("question-section");
var questionEl = document.getElementById("question");
var answers = document.getElementById("answers");
var answerButton1EL = document.getElementById("ans1");
var answerButton2EL = document.getElementById("ans2");
var answerButton3EL = document.getElementById("ans3");
var answerButton4EL = document.getElementById("ans4");
var resultSection = document.getElementById("result");
var timerElement = document.querySelector(".timer-count");
var scoreSectionEl = document.getElementById("score");
var scoreEl = document.getElementById("displayScore");
var signUpButton = document.getElementById("score-submit");
var initials = document.getElementById("initials");

var questionBank = [
  { question: "question 1", choices: ["a", "b", "c", "d"], answer: "c" },
  { question: "question 2", choices: ["a", "b", "c", "d"], answer: "d" },
  { question: "question 3", choices: ["a", "b", "c", "d"], answer: "a" },
  { question: "question 4", choices: ["a", "b", "c", "d"], answer: "b" },
  { question: "question 5", choices: ["a", "b", "c", "d"], answer: "c" },
];


function storeScores(){
var storedScores = JSON.parse(localStorage.getItem("scores"));

if (storedScores !== null) {
  highScores = storedScores;
}
}

function renderScores(){
    

    for (i=0; i < high)
}

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
  startSectionEl.style.display = "none";
  var button = document.createElement("button");
  button.textContent = "Restart";
  questionSectionEl.style.display = "block";
  questionSectionEl.appendChild(button);
  timerCount = 60;
  
  storeScores();
  renderQuestion();
  startTimer()
  answers.addEventListener("click", function () {
    element = event.target;
    evaluateAnswer(element);
  });
}

function renderQuestion() {
  if (qIndex < questionBank.length) {
    questionEl.textContent = questionBank[qIndex].question;
    console.log(questionBank[qIndex].question);

    answerButton1EL.textContent = questionBank[qIndex].choices[0];
    answerButton2EL.textContent = questionBank[qIndex].choices[1];
    answerButton3EL.textContent = questionBank[qIndex].choices[2];
    answerButton4EL.textContent = questionBank[qIndex].choices[3];
  }
}

function evaluateAnswer(element) {
  userAnswer = " ";
  if (element.matches(".ansButton") && qIndex < questionBank.length) {
    userAnswer = element.getAttribute("data-answer");
    console.log("qIndex1: " + qIndex);
    console.log("userAnswer: " + userAnswer);
    console.log("Answer: " + questionBank[qIndex].answer);

    resultSection.style.display = "block";

    if (userAnswer === questionBank[qIndex].answer) {
      console.log("Correct!");
      score = score + 5;
      document.querySelector("#userResult").textContent = "Correct!";
    } else {
      document.querySelector("#userResult").textContent = "Wrong!";
      console.log("Wrong");
    }
    qIndex++;
  }

  console.log("qIndex2: " + qIndex);
  console.log(questionBank.length);

  if (qIndex < questionBank.length) {
    console.log("qIndex3: " + qIndex);
    renderQuestion();
  } else {
    gameFinish = true;
    hideQuestions();
    displayScore();
  }
}

function hideQuestions() {
  questionSectionEl.style.display = "none";
}
function displayScore() {
  scoreSectionEl.style.display = "block";
  scoreEl.textContent = score;
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
  timerCount--;
  timerElement.textContent = timerCount;
   
    // Tests if win condition is met
    if (timerCount > 0 && gameFinish) {
        clearInterval(timer); 
   }
    // Tests if time has run out
    if (timerCount === 0) {
    // Clears interval
    gameFinish = true;
    clearInterval(timer);
    }
  }, 1000);
}

signUpButton.addEventListener("click", function(event) {

    event.preventDefault();
    
    // create user object from submission
    var scores = {
      initials: initials.value.trim(),
      finalScore: score
    };
    highScores.push(scores);
    highScores.sort (function(a,b){
       return b.finalScore - a.finalScore; });
    initials.value = "";
    score = 0;

  

    localStorage.setItem("scores", JSON.stringify(highScores));
    location.href = "highscores.html";
    renderScores();
    

})
