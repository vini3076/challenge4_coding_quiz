var score = 0;
var timer = 1000;
var won = false;
var answerCorrect = false;

var startSectionEl = document.getElementById("start-section");
console.log(startSectionEl);
var startButtonEl = document.getElementById("start-button");


var questionSectionEl = document.getElementById("question-section");
var questionEl = document.getElementById("question");
var answers = document.getElementById("answers");
var answerButton1EL = document.getElementById("ans1");
var answerButton2EL = document.getElementById("ans2");
var answerButton3EL = document.getElementById("ans3");
var answerButton4EL = document.getElementById("ans4");




var questionBank = [
  { question: "question 1", choices: ["a", "b", "c","d"], answer: "c" },

  { question: "question 2", choices: ["a", "b", "c", "d"], answer: "c" },
];

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
  startSectionEl.style.display = "none";
  var button = document.createElement("button");
  button.textContent = "Restart";
  questionSectionEl.style.display = "block";
  questionSectionEl.appendChild(button);
  console.log(button);

  //for (var i = 0; i < questionBank.length; i++) {
    console.log(questionBank[0].question);
    questionEl.textContent = questionBank[0].question;
    

    answerButton1EL.textContent = questionBank[0].choices[0];
    answerButton2EL.textContent = questionBank[0].choices[1];
    answerButton3EL.textContent = questionBank[0].choices[2];
    answerButton4EL.textContent = questionBank[0].choices[3];

    
answers.addEventListener('click', (event)=>
{
  console.log(event.target);

});

    console.log(questionBank[0].answer);
  }

