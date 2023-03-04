// All answer option

const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

// All our options

const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question"); //сам вопрос

const numberOfQuestion = document.getElementById("number-of-question"), // номер вопроса
  numberOfAllQuestion = document.getElementById("number-of-all-questions"); // количество всех вопросов

let indexOfQuestion, //индекс текцщего вопроса
  indexOfPage = 0; // индекс страницы

const answerTracker = document.getElementById("answers-tracker"); // обертка трекера
const btnNext = document.getElementById("btn-next"); // кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById("correct-answer"), //колчичество правильных ответов
  numberOfQuestions2 = document.getElementById("number-of-all-questions-2"), // количество всех вопросов в содальном окне
  btnTryAgain = document.getElementById("btn-try-again"); // кнопка "Начать викторину заново"

const questionList = [
  {
    question:
      "Какое кол-во сообщений будет выведено в консоль? for (let i = 10; i < 35; i += 5) {console.log(i)}",
    options: ["5", "6", "10", "такой цикл работать не будет"],
    rightAnswer: 1,
  },
  {
    question: "Какая переменная записана неверно?",
    options: [
      "let num = 'STRING';",
      "let isDone = 0;",
      "let b = false;",
      "let number = 12,5;",
    ],
    rightAnswer: 0,
  },
  {
    question: "Как можно определить является ли объект obj массивом ",
    options: ["Array.isArray(obj)", "typeof obj", "Оба варианта"],
    rightAnswer: 0,
  },
  {
    question:
      "Какое событие происходит, когда курсор наводится на конкретный элемент",
    options: ["mouseover", "mouseout", "mouseup", "mousemove"],
    rightAnswer: 0,
  },
];

let completedAnswers = []; // массив для уже заданых вопросов

numberOfAllQuestion.innerHTML = questionList.length; //выводит кол-во вопросов

const load = () => {
  question.innerHTML = questionList[indexOfQuestion].question; //сам вопрос

  option1.innerHTML = questionList[indexOfQuestion].options[0];
  option2.innerHTML = questionList[indexOfQuestion].options[1];
  option3.innerHTML = questionList[indexOfQuestion].options[2];
  option4.innerHTML = questionList[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
  indexOfPage++; // увеличивает индекс страницы
};

// Генерит случайный номер вопроса, также в функции есть проверка на повторение вопроса
function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * questionList.length);
  let flag = false;

  if (indexOfPage == questionList.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item === randomNumber) {
          flag = true;
        }
      });
      if (flag) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length === 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
}

//  Смена цвета поля при ответе
const checkAnswer = (el) => {
  if (el.target.dataset.id == questionList[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

/* отслеживает клик в вариантах ответа и вызывает функцию смены цвета 
а она в свою очередь вызывает функцию деактивации кнопок*/
for (elem of optionElements) {
  elem.addEventListener("click", (e) => checkAnswer(e));
}

// Делает неактивным другие варианты
const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questionList[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

// стирает все добавленые классы
const enebledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

// Проверяет был ответ на вопрос или нет
const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Выберите один из вариантов ответов");
  } else {
    randomQuestion();
    enebledOptions();
  }
};

// Реализация трекера
const answersTracker = () => {
  questionList.forEach(() => {
    const div = document.createElement("div");
    answerTracker.appendChild(div);
  });
};

// Закрашивание трекера в зависимости от варианта ответа, и передаём эту функцию в checkAnswer
const updateAnswerTracker = (status) => {
  answerTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

// Функция "Конец игры"
const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfQuestions2.innerHTML = questionList.length;
};

// Попробуй снова
const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answersTracker();
});
