
const data = [
    {
      id: 1,
      question: "What is the SI unit of force?",
    answers: [
        { answer: "Newton", isCorrect: true },
        { answer: "Joule", isCorrect: false },
        { answer: "Pascal", isCorrect: false },
        { answer: "Watt", isCorrect: false }
      ],
    },
    {
      id: 2,
      question: "What is the acceleration due to gravity on Earth?",
    answers: [
        { answer: "10 m/s²", isCorrect: false },
        { answer: "9.8 m/s²", isCorrect: true },
        { answer: "8.9 m/s²", isCorrect: false },
        { answer: "12 m/s²", isCorrect: false }
      ],
    },
    {
      id: 3,
      question: "What is the formula for kinetic energy?",
    answers: [
        { answer: "mgh", isCorrect: false },
        { answer: "mv²", isCorrect: false },
        { answer: "1/2 mv²", isCorrect: true },
        { answer: "F = ma", isCorrect: false }
      ],
    },
    {
      id: 4,
      question: "Which of the following is a scalar quantity?",
    answers: [
        { answer: "Speed", isCorrect: true },
        { answer: "Force", isCorrect: false },
        { answer: "Acceleration", isCorrect: false },
        { answer: "Momentum", isCorrect: false }
      ],
    },
    {
      id: 5,
      question: "What is the first law of motion by Newton?",
    answers: [
        { answer: "An object at rest stays at rest unless acted upon by an external force.", isCorrect: true },
        { answer: "Force equals mass times acceleration.", isCorrect: false },
        { answer: "Every action has an equal and opposite reaction.", isCorrect: false },
        { answer: "Energy is conserved in a closed system.", isCorrect: false }
      ],
    },
    {
      id: 6,
      question: "What is the speed of light in a vacuum?",
    answers: [
        { answer: "3 × 10⁸ m/s", isCorrect: true },
        { answer: "3 × 10⁶ m/s", isCorrect: false },
        { answer: "3 × 10⁵ m/s", isCorrect: false },
        { answer: "3 × 10⁹ m/s", isCorrect: false }
      ],
    },
    {
      id: 7,
      question: "What is the SI unit of work?",
    answers: [
        { answer: "Joule", isCorrect: true },
        { answer: "Newton", isCorrect: false },
        { answer: "Watt", isCorrect: false },
        { answer: "Pascal", isCorrect: false }
      ],
    },
    {
      id: 8,
      question: "Which law explains why we need to wear seat belts?",
    answers: [
        { answer: "Newton's First Law of Motion", isCorrect: true },
        { answer: "Newton's Second Law of Motion", isCorrect: false },
        { answer: "Newton's Third Law of Motion", isCorrect: false },
        { answer: "Law of Conservation of Momentum", isCorrect: false }
      ],
    },
    {
      id: 9,
      question: "What is the formula for calculating force?",
    answers: [
        { answer: "F = ma", isCorrect: true },
        { answer: "F = mv", isCorrect: false },
        { answer: "F = mgh", isCorrect: false },
        { answer: "F = 1/2 mv²", isCorrect: false }
      ],
    },
    {
      id: 10,
      question: "Which of these is an example of potential energy?",
    answers: [
        { answer: "A running person", isCorrect: false },
        { answer: "A moving car", isCorrect: false },
        { answer: "A spinning fan", isCorrect: false },
        { answer: "Water stored in a dam", isCorrect: true }
      ],
    },
  ];


const introScreen = document.querySelector(".intro");
const gameScreen = document.querySelector(".game");
const questionDisplay = document.querySelector(".question");
const answerContainer = document.querySelector(".answer");
const startButton = document.querySelector(".start");
const submitButton = document.querySelector(".submit");
const playButton = document.querySelector(".play");
const correctionButton = document.querySelector(".correctButton");
const result = document.querySelector(".result");
const correctionScreen = document.querySelector(".correction");


let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0
let selectedAnswer;

const playAgain = ()=>{
    qIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    total = 0;
    showQuestion(qIndex)
}
startButton.addEventListener("click", ()=>{
    introScreen.style.display = "none"
    gameScreen.style.display = "block"
})
playButton.addEventListener("click", ()=>{
    result.style.display = "none"
    gameScreen.style.display = "block"
    playAgain();
})
const showResult = ()=>{
    result.style.display = "block"
    gameScreen.style.display = "none"
    result.querySelector(
        ".correct"
        ).textContent =`Correct Answers: ${correctCount}`
        result.querySelector(
            ".wrong"
            ).textContent =`Wrong Answers: ${wrongCount}`
            result.querySelector(
                ".score"
                ).textContent =`Final Score: ${(correctCount) * 10}/100`
}

const showQuestion = (qNumber)=>{
    if(qIndex == data.length) return showResult()
    selectedAnswer = null;
    questionDisplay.textContent = data[qNumber].question
    answerContainer.innerHTML = data[qNumber].answers.map((item, index)=>
       `
        <div class="answer">
        <input type="radio" options=${index} id=${index} name="answer" value=${item.isCorrect} />
      <label for="1">${item.answer}</label>
  </div>
  `
    ).join("");
    selectAnswer();
}

const selectAnswer = ()=>{
    answerContainer.querySelectorAll("input").forEach((el) => {
        el.addEventListener("click", (e) => {
          selectedAnswer = e.target.value;
            
        })
    })
}

const submitAnswer = ()=>{
    submitButton.addEventListener("click", ()=>{
        if(selectedAnswer!== null){
            selectedAnswer === "true" ? correctCount ++ : wrongCount ++
            qIndex ++
            showQuestion(qIndex);
        }else alert("Kindly Select An Answer!");
     
    });
}

correctionButton.addEventListener("click", ()=>{
    correctionScreen.style.display = "block"
    gameScreen.style.display = "none"
    result.style.display = "none"
    displayAnswersOnly();
})

const displayAnswersOnly = () => {
    correctionScreen.innerHTML = ""; 
    data.forEach((question, index) => {
        const answersHTML = question.answers
            .map((answer, i) => 
            `
                <div class="answer">
                    <span style="color: ${
                        answer.isCorrect ? "green" : 
                        selectedAnswer === answer.isCorrect.toString() && !answer.isCorrect ? "red" : "black"
                    }">
                        ${answer.answer}
                    </span>
                </div>
                `
            ).join("");
        correctionScreen.innerHTML += 
        `
            <div class="answers-only">
                <h3>${question.question}</h3>
                ${answersHTML}
            </div>
            `
        ;
    });
    correctionScreen.style.display = "block"; 
};
showQuestion(qIndex);
submitAnswer();


