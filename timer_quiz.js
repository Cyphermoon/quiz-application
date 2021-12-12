const start_btn = document.querySelector(".start_btn")
const info_box = document.querySelector(".info_box")
const incorrect_msg = document.querySelector(".incorrect_msg")
const continue_btn = info_box.querySelector(".buttons .restart")
const exit_btn = info_box.querySelector(".buttons .quit")
const quiz_box = document.querySelector(".quiz_box")
const total_que = document.querySelector(".total_que")
const next_btn = document.querySelector(".next_btn")
const result_box = document.querySelector(".result_box")
const restart_btn = result_box.querySelector(".buttons .restart")
const quit_btn = result_box.querySelector(".buttons .quit")

let option_items;
let queCount = 0
let questionNumb = 0
let hasClicked = false
let correct_score = 0
let wrong_score = 0
let ended;


// Start btn_clicked
start_btn.addEventListener("click", ()=>{
    info_box.classList.add("activeInfo")
})

quit_btn.addEventListener("click",(e) =>{
    window.location.reload()
})

continue_btn.addEventListener("click", (e)=>{
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activeQuiz")
    showQuestion(queCount)
})

exit_btn.addEventListener("click",(e)=>{
    info_box.classList.remove("activeInfo")
})

restart_btn.addEventListener("click",restartQuiz)

next_btn.addEventListener("click",showNextQue)


function showNextQue(){
    if(hasClicked){
        if(queCount < questions.length - 1){
            queCount++
            showQuestion(queCount)
            
        }
        else{ 
            showResultBox()
        }
    }
    else{
        incorrect_msg.classList.add("active")
       setTimeout((e)=>{incorrect_msg.classList.remove("active")},3000)
    }
}

function showQuestion(index){
    incorrect_msg.classList.remove("active")
    let que_text = document.querySelector(".que_text");
    let option_list = document.querySelector(".option_list");
    let total_que = document.querySelector(".total_que")

    
    let que_tag = "<span>"+questions[index].numb+" "+questions[index].question+"</span>";
    let total_que_tag = "<span>"+questions[index].numb+" of "+ questions.length+"</span>"
    let option_tag  = '<div class="option">'+questions[index].options[0]+'</div>' +
                    '<div class="option">'+questions[index].options[1]+'</div>' +
                    '<div class="option">'+questions[index].options[2]+'</div>' +
                    '<div class="option">'+questions[index].options[3]+'</div>' 
                    

    que_text.innerHTML = que_tag
    option_list.innerHTML = option_tag
    total_que.innerHTML = total_que_tag
    timer = 15
    hasClicked = false

    next_btn.classList.add("show")

    option_items = Array.from(document.querySelectorAll(".option"))
    
    for(let i = 0; i < option_items.length; i++){
        option_items[i].setAttribute("onclick","querySelected(this)")
    }

    ended = setInterval(startTimer,1000)
}


function showResultBox(){
    const complete_text = document.querySelector(".complete_text")
    const score_text = result_box.querySelector(".score_text")
    const percentage_box = result_box.querySelector(".progress_circle")
    const percentage_text = result_box.querySelector(".progress_text")

    let percentage_score = Math.ceil((correct_score / questions.length) * 100)
    let circumference = 2 * 3.14 * percentage_box.r.animVal.value

    
    if(percentage_box.getTotalLength()){
        circumference = percentage_box.getTotalLength()
    }
    
    console.log(circumference)

    percentage_box.setAttribute("stroke-dashoffset", circumference - (percentage_score/100)*circumference)
    console.log(circumference - (percentage_score/100)*circumference)
     
    let score_tag = "<span>Correct score: "+correct_score+"</span>"+
                    "<span>Wrong score: "+wrong_score+"</span>"+
                    "<span>Number of questions: "+questions.length+"</span>"
    score_text.innerHTML = score_tag
    percentage_text.textContent = `${percentage_score}%`
   

    quiz_box.classList.remove("activeQuiz")
    result_box.classList.add("activeResult") 
}


function restartQuiz(){
    correct_score = 0
    wrong_score = 0
    queCount = 0
    info_box.classList.remove("activeInfo")
    result_box.classList.remove("activeResult")
    quiz_box.classList.add("activeQuiz")
    showQuestion(queCount)
    console.log("clicked")

    
}


function querySelected(answer){
   let userAns = answer.textContent
   let correctAns = questions[queCount].answer
   hasClicked = true

   clearInterval(ended)

   if(userAns === correctAns){
        answer.classList.add("correct")
        correct_score++
   }

   else{
       wrong_score++
        answer.classList.add("incorrect")

        for(let i = 0; i < option_items.length; i++){
            option_items[i].classList.add("disabled")

           if(option_items[i].textContent === correctAns){
               option_items[i].classList.add("correct")
           }
        }    
   }
}


startTimer.time = 0
function startTimer(){
    const timer_sec = document.querySelector(".timer_sec")
    
    if(timer > 0) timer--
    if(timer <= 0){
        clearInterval(ended);

        for(let i = 0; i < option_items.length; i++){
            option_items[i].classList.add("disabled")
        }

        hasClicked = true
        showNextQue() 
    }

    if(timer < 10) timer_sec.innerText = "0" + timer
    else timer_sec.innerText = timer;
   
}

