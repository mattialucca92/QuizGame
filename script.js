const questions = [
    {
        question : "What is the only food that cannot go bad?",
        answers : [
                {text : "Dark chocolate", correct : false} ,
                {text : "Peanut butter", correct : false},
                {text : "Canned tuna", correct : false},
                {text : "Honey", correct : true}
            
        ]
    },
    {
        question : "What’s the name of Hagrid’s pet spider?",
        answers : [
                {text : "Nigini", correct : false} ,
                {text : "Crookshanks", correct : false},
                {text : "Aragog", correct : true},
                {text : "Mosag", correct : false}
            
        ] 
    },
    {
        question : "What’s the heaviest organ in the human body?",
        answers : [
                {text : "Skin", correct : true} ,
                {text : "Liver", correct : false},
                {text : "Heart", correct : false},
                {text : "Brain", correct : false}
            
        ]
    },
    {
        question : "Which of these EU countries does not use the euro as its currency?",
        answers : [
                {text : "Poland", correct : true} ,
                {text : "France", correct : false},
                {text : "Germany", correct : false},
                {text : "Croatia", correct : false}
            
        ]
    },
    {
        question : "Which fast food restaurant has the largest number of retail locations in the world?",
        answers : [
                {text : "Burger King", correct : false} ,
                {text : "Pizza Hut", correct : false},
                {text : "Subway", correct : true},
                {text : "Mc'Donalds", correct : false}
            
        ]
    },
    {
        question : "Where is recognized as the location of the hottest temperature ever recorded on Earth?",
        answers : [
                {text : "Mitribah, Kuwait", correct : false} ,
                {text : "Death Valley, California", correct : true},
                {text : "Yuma, Arizona", correct : false},
                {text : "Key West, Florida", correct : false}
            
        ]
    },
    {
        question : "Cirque du Soleil” started in what country?",
        answers : [
                {text : "France", correct : false} ,
                {text : "Usa", correct : false},
                {text : "Canada", correct : true},
                {text : "Russia", correct : false}
            
        ]
    },
    {
        question : "What country are the Galapagos Islands located in?",
        answers : [
                {text : "Ecuador", correct : true} ,
                {text : "Brazil", correct : false},
                {text : "Belize", correct : false},
                {text : "Colombia", correct : false}
            
        ]
    },
    {
        question : "Pupusas are from what country?",
        answers : [
                {text : "Mexico", correct : false} ,
                {text : "El Salvador", correct : true},
                {text : "Argentina", correct : false},
                {text : "Chile", correct : false}
            
        ]
    },
    {
        question : "What is the name of the talkative parrot in “Aladdin”?",
        answers : [
                {text : "Pascal", correct : false} ,
                {text : "Meeko", correct : false},
                {text : "Iago", correct : true},
                {text : "Abu", correct : false}
            
        ]
    }
];

const questionsElement = document.getElementById("questions");
const answersElement = document.getElementById("Answers");
const nextElement = document.getElementById("nextQuestion");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextElement.style.display = "none";
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextElement.style.display = "block";
};

function showScore(){
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML = "play again";
    nextElement.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextElement.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});


startQuiz();
showQuestion();