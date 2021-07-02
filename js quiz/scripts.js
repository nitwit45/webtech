//Starter Page

let start = document.querySelector(".startarea");

//Rules Section

let guide = document.querySelector(".rules");
let exit = document.querySelector(".exit");
let continueBtn = document.querySelector(".next");

//Quiz

let quiz = document.querySelector(".quiz");
let time = document.querySelector(".time");

//Questions

let questionNo = document.querySelector(".questionNo");
let questionText = document.querySelector(".questioninfo");

//MCQ's

let option1 = document.querySelector("#answer1");
let option2 = document.querySelector("#answer2");
let option3 = document.querySelector("#answer3");
let option4 = document.querySelector("#answer4");

//Buttons

let total_correct = document.querySelector(".correct_total");
let next_question = document.querySelector(".continue_question");

//Rewards

let result = document.querySelector(".rewards");
let points = document.querySelector(".marks");
let quit = document.querySelector(".quit");
let startAgain = document.querySelector(".restart");
let choice_que = document.querySelectorAll(".choice_que");
let index = 0;
let timer = 0;
let interval = 0;

//Total

let correct = 0;

//Answers

let UserAns = undefined;

//Start Button Functions On Click

start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//Exit Button Functions On Click

exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});

//Timer

let countDownTimer = () => {
    if (timer === 30) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText =timer;
    }
}

let DataGetter = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].answer1;
    option2.innerText = MCQS[index].answer2;
    option3.innerText = MCQS[index].answer3;
    option4.innerText = MCQS[index].answer4;
    timer = 0;
}

DataGetter();

//  Next Button Functions On Click

continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";
    interval = setInterval(countDownTimer, 1000);
    DataGetter();
    //    Reset All Acitve Classes when starting new question
    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })
    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((mcqs, chosenmcqNo) => {
    mcqs.addEventListener("click", () => {
        mcqs.classList.add("active");
        //Verifying Answer
        if (chosenmcqNo === MCQS[index].answer) {
            correct=correct +2;
        } else {
            correct =  correct-1;
        }
        //Stopper
        clearInterval(interval);
        //Locking in one answer when user selects
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

// Next Button Functions On Click

next_question.addEventListener("click", () => {

    //   if index chosen is out of MCQS range
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })
        //Question Is Fetched
        DataGetter();
        //Answer checked
        
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct}  Marks`;
        clearInterval(interval);
        interval = setInterval(countDownTimer, 1000);
    } else {
        index = 0;
        //Rewards Section
        clearInterval(interval);
        quiz.style.display = "none";
        if (correct < 3){
            document.getElementById("medal").style.color = "bronze";
            points.innerHTML = `You Got A Bronze Medal!`;
        }
        else if (correct < 7){
            document.getElementById("medal").style.color = "silver";
            points.innerHTML = `You Got A Silver Medal!`;
        }
        else if (correct > 11){
            document.getElementById("medal").style.color = "gold";
            points.innerHTML = `You Got A Gold Medal!`;
        }
        
        
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//QUIT Button Functions On Click

quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
});

//Restart Button Functions On Click

startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
});