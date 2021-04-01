`use strict`;
const container = document.querySelector(`.container`);
const quizContainer = document.querySelector(`.quiz`);
const questionsContainer = document.querySelector(`div.questions`);
const questionText = document.querySelector(`.questions h1`);
const optionsContainer = document.querySelector(`.options`);
const startButton = document.getElementById(`start`);
const nextButton = document.getElementById(`next`);
const timeCount = document.getElementById(`time`);
const questionCount = document.getElementById(`num`);
let quizScore = 0;
let totalTime = 10;
let counterInterval;
// thumbs up image shown on page load
const thumbsUpImage = document.querySelector(`.quiz img`);
let randomQuestion, currentQuestionIndex;
// message to be shown after quiz
const resultMessage = document.querySelector(`.message`);
startButton.addEventListener(`click`, startQuiz);

nextButton.addEventListener(`click`, () => {
  currentQuestionIndex++;
  // clear element content before adding new ones
  optionsContainer.innerHTML = ``;
  // show resultMessage after last question
  if (currentQuestionIndex > questions.length - 1) showMessage();
  nextQuestion();
});

function startQuiz() {
  // reset timer
  clearInterval(counterInterval);
  countTime(totalTime);
  // resest quizScore
  quizScore = 0;
  // clear element content before adding, new ones
  optionsContainer.innerHTML = ``;
  startButton.classList.add(`hide`);
  questionCount.classList.remove(`hide`);
  questionCount.innerText = `Time Left: 10`;
  questionsContainer.classList.remove(`hide`);
  thumbsUpImage.classList.add(`hide`);
  // You could use Fisher Yates method
  randomQuestion = questions.sort(() => 0.5 - Math.random());
  currentQuestionIndex = 0;
  nextQuestion();
}
function nextQuestion() {
  // reset timer
  clearInterval(counterInterval);
  countTime(totalTime);
  nextButton.classList.add(`hide`);
  showQuestion(randomQuestion[currentQuestionIndex]);
}
function showQuestion(quest) {
  if (currentQuestionIndex > questions.length - 1) return;
  questionText.innerText = `${currentQuestionIndex + 1}. ${quest.question}`;
  questionCount.innerText = `${currentQuestionIndex + 1} of ${
    questions.length
  } Questions`;
  quest.options.forEach((item) => {
    let button = document.createElement(`button`);
    button.innerText = item;
    button.addEventListener(`click`, (ev) => {
      selectOption(ev.target);
    });
    optionsContainer.append(button);
  });
}
let score = document.getElementById(`score`);
function selectOption(btn) {
  // stop timer
  clearInterval(counterInterval);
  let selectedOption = btn;
  let correctOption = questions[currentQuestionIndex].answer;
  if (selectedOption.innerText == correctOption) {
    selectedOption.classList.add(`correct`);
    ++quizScore;
  } else {
    selectedOption.classList.add(`wrong`);
    //if wrong option is selected, find and highlight the correct option
    let correctBtn = Array.from(optionsContainer.children).find(
      (btn) => btn.innerText == correctOption
    );
    correctBtn.classList.add(`correct`);
  }
  // disable click on all options
  Array.from(optionsContainer.children).forEach((btn) =>
    btn.classList.add(`unclickable`)
  );
  nextButton.classList.remove(`hide`);
  score.innerText = quizScore;
}
// show resultMessage
function showMessage() {
  resultMessage.classList.remove(`hide`);
  quizContainer.replaceWith(resultMessage);
}
// do not show resultMessage
function notShowMessage() {
  resultMessage.classList.add(`hide`);
  resultMessage.replaceWith(quizContainer);
}
function quitQuiz() {
  // stop timer
  clearInterval(counterInterval);
  startButton.classList.remove(`hide`);
  questionCount.classList.add(`hide`);
  thumbsUpImage.classList.remove(`hide`);
  questionsContainer.classList.add(`hide`);
  // reset timecount to 10
  timeCount.innerText = 10;
}
function countTime(t) {
  counterInterval = setInterval(counter, 1000);
  let time = t;
  function counter() {
    timeCount.innerText = time;
    time--;
    if (time < 0) {
      // find and highlight the correct option when time is 0
      let correctOption = questions[currentQuestionIndex].answer;
      clearInterval(counterInterval);
      let correctBtn = Array.from(optionsContainer.children).find(
        (btn) => btn.innerText == correctOption
      );
      correctBtn.classList.add(`correct`);
      // disable click on all options
      Array.from(optionsContainer.children).forEach((btn) =>
        btn.classList.add(`unclickable`)
      );
      nextButton.classList.remove(`hide`);
    }
  }
  counter();
}
const questions = [
  {
    question: `Is JavaScript the only computer language that runs in the browser?`,
    answer: `No`,
    options: [`Yes`, `No`, `Maybe`, `I don't know`],
  },
  {
    question: `Which is the odd one out?`,
    answer: `BeaScript`,
    options: [`CoffeeScript`, `BeaScript`, `JavaScript`, `TypeScript`],
  },
  {
    question: `None mark-up lanaguages except?`,
    answer: `CSS`,
    options: [`CSS`, `JavaScript`, `Go`, `Python`],
  },
  {
    question: `What type of developer are you?`,
    answer: `Which ever you are, you are awesome!`,
    options: [
      `Front-end developer`,
      `Back-end developer`,
      `Which ever you are, you are awesome!`,
      `Full-stack developer`,
    ],
  },
  {
    question: `Which is the odd one out`,
    answer: `Angular`,
    options: [`three.js`, `chart.js`, `anime.js`, `Angular`],
  },
];
