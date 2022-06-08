// Variables
var startBtn = document.querySelector(".startBtn button");
var infoBox = document.querySelector(".infoBox");
var exitBtn = infoBox.querySelector(".mainBtn .exitBtn");
var retryBtn = infoBox.querySelector(".mainBtn .retryBtn");
var mainContainer = document.querySelector(".mainContainer");
var fixer = document.querySelector(".fixer");
var decisions = document.querySelector(".decisions");
var timeBar = document.querySelector("header .timeBar");
var timeText = document.querySelector(".mainTimer .timeRemain");
var timeCount = document.querySelector(".mainTimer .timeStart");
var restartQuiz = fixer.querySelector(".mainBtn .retryBtn");
var quitQuiz = fixer.querySelector(".mainBtn .exitBtn");
var nextQuestion = document.querySelector("footer .nextQuestion");
var questionCounter = document.querySelector("footer .inputDisplay");
var input = document.querySelector(".input");

// Quit Quiz
quitQuiz.onclick = function () {
  window.location.reload();
};

// Moves to the next question
nextQuestion.onclick = function () {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    clearInterval(clock);
    clearInterval(timerLine);
    initialTime(timeValue);
    initialTimeContainer(widthVar);
    outputQuestions(questionCount);
    outputCounter(questionNumber);
    timeText.textContent = "Time Left";
    nextQuestion.classList.remove("show");
  }
  else {
    clearInterval(clock);
    clearInterval(timerLine);
    showResult();
  }
};

// Restarts Quiz
restartQuiz.onclick = function() {
  liveScore = 0;
  widthVar = 0;
  questionCount = 0;
  timeValue = 20;
  questionNumber = 1;
  outputQuestions(questionCount);
  outputCounter(questionNumber);
  initialTime(timeValue);
  initialTimeContainer(widthVar);
  clearInterval(clock);
  clearInterval(timerLine);
  mainContainer.classList.add("outputQuiz");
  fixer.classList.remove("outputResult");
  timeText.textContent = "Time Left";
  nextQuestion.classList.remove("show");
};

// Working Code for actual questions
function optionSelected(answer) {
  var userInput = answer.textContent;
  var correctAnswer = questions[questionCount].answer;
  var totalOptions = decisions.children.length;
  clearInterval(clock);
  clearInterval(timerLine);

  if (userInput == correctAnswer) {
    liveScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", iconTrue);
  } 

  else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", iconFalse);
    for (i = 0; i < totalOptions; i++) {
      if (decisions.children[i].textContent == correctAnswer) {
        decisions.children[i].setAttribute("class", "option correct");
        decisions.children[i].insertAdjacentHTML("beforeend", iconTrue);
      }
    }
  }

  for (i = 0; i < totalOptions; i++) {
    decisions.children[i].classList.add("disabled");
  }

  nextQuestion.classList.add("show");
}

// More Variables
var timeValue =20;
var questionCount = 0;
var questionNumber = 1;
var liveScore = 0;
var clock;
var timerLine;
var widthVar = 0;

// Right / Wrong 
var iconTrue = '<div></div>';
var iconFalse = '<div></div>';

// Button Functions
startBtn.onclick = function () {
  infoBox.classList.add("liveInformation");
};


retryBtn.onclick = function () {
  infoBox.classList.remove("liveInformation");
  mainContainer.classList.add("outputQuiz");
  outputQuestions(0);
  outputCounter(1);
  initialTime(20);
  initialTimeContainer(0);
};

exitBtn.onclick = function () {
  infoBox.classList.remove("liveInformation");
};

// Displays the responce
function outputQuestions(responce) {
  var que_tag =
    "<span>" +
    questions[responce].numb +
    ". " +
    questions[responce].question +
    "</span>";

  var option_tag =
    '<div class="option"><span>' +
    questions[responce].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[responce].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[responce].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[responce].options[3] +
    "</span></div>";

  input.innerHTML = que_tag;
  decisions.innerHTML = option_tag;
  var option = decisions.querySelectorAll(".option");
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// time interval
function initialTime(tm) {
  clock = setInterval(mainTimer, 1000);
  function mainTimer() {
    timeCount.textContent = tm;
    tm--;

    if (tm < 9) {
      var addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }

    if (tm < 0) {
      clearInterval(clock);
      timeText.textContent = "Out of Time";

      var totalOptions = decisions.children.length;
      var correctAnswer = questions[questionCount].answer;

      for (i = 0; i < totalOptions; i++) {
        if (decisions.children[i].textContent == correctAnswer) {
          decisions.children[i].setAttribute("class", "option correct");
          decisions.children[i].insertAdjacentHTML(
            "beforeend",
            iconTrue
          );
        }
      }

      for (i = 0; i < totalOptions; i++) {
        decisions.children[i].classList.add("disabled");
      }

      nextQuestion.classList.add("show");
    }
  }
}

// Starts Timer
function initialTimeContainer(tm) {
  timerLine = setInterval(mainTimer, 19);
  function mainTimer() {
    tm += 1;
    timeBar.style.width = tm + "px";
    if (tm > 500) {
      clearInterval(timerLine);
    }
  }
}

// Displays Counter
function outputCounter(responce) {
  var inputDisplay = "<span><p>" + responce + "</p> of <p>" + questions.length + "</p> Questions</span>";
  questionCounter.innerHTML = inputDisplay;
}