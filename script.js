var html = document.querySelector("html");
var nextButton = document.querySelector("button");
var title = document.querySelector("H1");
var panel = document.querySelector(".question");
var questionBox = document.querySelector(".question .content");
var qText = document.querySelector("H2");
var input;
var count = 0; //counts what question we are on
var numRight = 0;

function Question(prompt, answers, correct, type) {
  this.prompt = prompt;
  this.answers = answers;
  this.correct = correct;
  this.type = type;
}

const questionList = [
  new Question(
    'Who is the main character of the movie "Tangled"?',
    ["Rapunzel", "Merida", "Aurora"],
    "Rapunzel",
    "MC"
  ),
  new Question(
    'Which of the following songs was in "High School Musical"?',
    ['"Step it up"', '"Get your Head in the Game"'],
    '"Get your Head in the Game"',
    "MC"
  ),
  new Question(
    "What movie features some rather adorable dogs?",
    ["Lady and the Tramp", "101 Dalmations", "Both of the above!"],
    "Both of the above!",
    "MC"
  ),
  new Question(
    "What is Simba's mother's name from the Lion King?",
    ["Mufasa", "Scar", "Sarabi", "Timba"],
    "Sarabi",
    "MC"
  ),
  new Question(
    "What is Boo's real name in the movie Monsters Inc?",
    ["Sarah", "Ridley", "Mary", "Jessica"],
    "Mary",
    "MC"
  ),
  new Question(
    "In Aladdin, how long was Genie stuck in the lamp?",
    ["10,000 years", "A few minutes", "100,000 years", "1000 years"],
    "10,000 years",
    "MC"
  )
];
const numQ = questionList.length;

function clearAnswers() {
  var ans = document.querySelector("#answers");
  if (ans != null) {
    ans.parentNode.removeChild(ans);
  }
}

function displayMCChoice() {
  var list = document.createElement("ul");

  for (let i = 0; i < questionList[count].answers.length; i++) {
    let item = document.createElement("li");
    let radio = document.createElement("input");
    let label = document.createElement("label");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "answerText");
    label.textContent = questionList[count].answers[i];
    item.appendChild(radio);
    item.appendChild(label);
    list.appendChild(item);
    list.setAttribute("ID", "answers");
  }
  questionBox.appendChild(list);
}

function updateQuestion() {
  if (count < numQ) {
    qText.textContent = questionList[count].prompt;
    title.textContent = "Question " + (count + 1);
  }

  clearAnswers();

  if (questionList[count].type === "MC") {
    displayMCChoice();
  }

  panel.appendChild(nextButton);
}

function getAnswer() {
  var radios = document.getElementsByTagName("input");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return questionList[count].answers[i];
    }
  }
  return "";
}

nextButton.onclick = function() {
  if (nextButton.getAttribute("ID") === "validate") {
    if (getAnswer() === "") {
      alert("Please select a single answer choice");
    } else {
      displayAnswerBox();
      count++;
      nextButton.setAttribute("ID", "next");
      nextButton.textContent = "Next";
    }
  } else {
    var answerBox = document.querySelector(".answerBox");
    if (answerBox != null) {
      answerBox.parentNode.removeChild(answerBox);
    }
    nextButton.textContent = "Next Question";
    if (count < numQ) {
      updateQuestion();
      nextButton.setAttribute("ID", "validate");
    } else {
      displayResult();
      count = 0;
      numRight = 0;
    }
  }
};

function displayAnswerBox() {
  var answerBox = document.createElement("div");
  answerBox.setAttribute("class", ".container");
  answerBox.setAttribute("class", "answerBox");
  var answerText = document.createElement("h3");
  if (getAnswer() === questionList[count].correct) {
    answerText.textContent = "Correct!";
    answerBox.setAttribute("ID", "correct");
    numRight++;
  } else {
    answerText.textContent = "Sorry, that's incorrect";
    answerBox.setAttribute("ID", "incorrect");
  }
  var radios = document.getElementsByTagName("radio");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radios[i].disabled = true;
    }
  }
  answerBox.appendChild(answerText);
  html.appendChild(answerBox);
}

function displayResult() {
  clearAnswers();
  nextButton.textContent = "Try Again";
  title.textContent = "Results";
  qText.textContent = "You got " + numRight + " out of " + numQ + " right!";
}
