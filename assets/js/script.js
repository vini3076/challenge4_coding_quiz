//initializing variables
var score = 0;
var timerCount;
var answerCorrect = false;
var userAnswer = " ";
var element;
var qIndex = 0;
var gameFinish = false;
var highScores = [];

var headerEl = document.querySelector("header");
var highScoresLinkEl = document.getElementById("high-scores-link");
var timerElement = document.querySelector(".timer-count");
var startSectionEl = document.getElementById("start-section");
var startButtonEl = document.getElementById("start-button");

var questionSectionEl = document.getElementById("question-section");
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var answerButton1EL = document.getElementById("ans1");
var answerButton2EL = document.getElementById("ans2");
var answerButton3EL = document.getElementById("ans3");
var answerButton4EL = document.getElementById("ans4");
var resultSection = document.getElementById("result");
var restartEl = document.getElementById("restart");
var restartButtonEl = document.querySelector(".restartButton");

var scoreSectionEl = document.getElementById("score");
var scoreEl = document.getElementById("displayScore");
var submitButton = document.getElementById("score-submit");
var initials = document.getElementById("initials");
var highScoresEl = document.getElementById("high-scores");
var scoreListEl = document.getElementById("score-list");

//Questions array
var questionBank = [
  {
    question:
      "Which built-in method removes the last element from an array and returns that element?",
    choices: ["last()", "get()", "pop()", "splice()"],
    answer: "c",
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?2",
    choices: ["stringify()", "parse()", "covert()", "None of the above"],
    answer: "a",
  },
  {
    question: "How to stop an interval timer in Javascript?",
    choices: ["clearInterval", "clearTimer", "intervalOver", "setInterval"],
    answer: "a",
  },
  { question: "How do we write a comment in javascript?", 
  choices: ["/* */", "//", "#", "$$"], 
  answer: "b" },
  { question: "Which of the following methods can be used to display data in some form using Javascript?5", 
  choices: ["document.write()", "console.log()", "window.alert()", "All of the above"], 
  answer: "d" },
];

//get the high scores stored in local storage
storeScores();

//event listeners
highScoresLinkEl.addEventListener("click", renderScores);
startButtonEl.addEventListener("click", startQuiz);
restartButtonEl.addEventListener("click", function () {
  location.reload();
});
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var scores = {
    initials: initials.value.trim(),
    finalScore: score,
  };
  highScores.push(scores);
  highScores.sort(function (a, b) {
    return b.finalScore - a.finalScore;
  });

  if (highScores.length > 10) {
    highScores.pop();
  }

  initials.value = "";
  score = 0;
  scoreSectionEl.style.display = "flex";

  localStorage.setItem("scores", JSON.stringify(highScores));
  renderScores();
});

function startQuiz() {
  startSectionEl.style.display = "none";
  //   var button = document.createElement("button");
  //   button.textContent = "Restart";
  questionSectionEl.style.display = "flex";
  restartEl.style.display = "flex";
  timerCount = 30;

  renderQuestion();
  startTimer();
  answersEl.addEventListener("click", function () {
    element = event.target;
    evaluateAnswer(element);
  });
}

function storeScores() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    highScores = storedScores;
  }
}

function hideAll() {
  headerEl.style.display = "none";
  startSectionEl.style.display = "none";
  scoreSectionEl.style.display = "none";
  scoreEl.textContent = "";
  questionSectionEl.style.display = "none";
}

function renderScores() {
  hideAll();
  restartEl.style.display = "flex";
  highScoresEl.style.display = "flex";
  scoreListEl.innerHTML = "";

  for (i = 0; i < highScores.length; i++) {
    var li = document.createElement("li");
    li.textContent =
      highScores[i]["initials"] + ": " + highScores[i]["finalScore"];
    scoreListEl.appendChild(li);
  }
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

    resultSection.style.display = "flex";

    if (userAnswer === questionBank[qIndex].answer) {
      console.log("Correct!");
      score = score + 5;
      document.querySelector("#userResult").textContent = "Correct!";
    } else {
      document.querySelector("#userResult").textContent =
        "Wrong! 5 seconds removed from timer";
      console.log("Wrong");
      timerCount = timerCount - 5;
    }
    qIndex++;
  }


  if (qIndex < questionBank.length) {
    console.log("qIndex3: " + qIndex);
    renderQuestion();
  } else {
    gameFinish = true;
    setTimeout(() => {
      hideQuestions();
      displayScore();
    }, 3000);
  }
}

function hideQuestions() {
  questionSectionEl.style.display = "none";
}
function displayScore() {
  scoreSectionEl.style.display = "flex";
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
    if (timerCount === 0 || timerCount < 0) {
      // Clears interval
      gameFinish = true;
      clearInterval(timer);
      setTimeout(() => {
        
        hideAll();
        displayScore();
      }, 3000);
    }
  }, 1000);
}
