// watch section 

let timeFormat = localStorage.hasOwnProperty("timeFormat") ? JSON.parse(localStorage.getItem("timeFormat")) : false;
let greeting = document.querySelector(".greeting");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".second");
let currentDate = document.querySelector(".date");
let amPm = document.querySelector(".time-am-pm");

let timeZone = document.querySelector(".timezone-change");

timeZone.checked = timeFormat;

// time handeler function 

function timeHandler(event) {
    timeFormat = !timeFormat;
    timeZone.checked =timeFormat
    localStorage.setItem("timeFormat" , timeFormat);

    const toogleCheck = event.target.checked;

    if(toogleCheck) {
        changeTime();
        return
    }

    time()
}

timeZone.addEventListener("click" , timeHandler);

// time function for 12 hours convert our time

function time() {
    let date = new Date();
    let gethours = date.getHours();
    let getMinutes = date.getMinutes();
    let getSeconds = date.getSeconds();
    if (gethours < 11 && getMinutes < 59 ) {
        amPm.innerText = "AM"
        console.log("hi")
    } else {
        amPm.innerText = "PM"
    }if(gethours >= 12 && gethours <14){
        greeting.innerText = "Good noon"
    }else if(gethours >= 14 && gethours < 17) {
        greeting.innerText = "Good afternoon"
    }else if(gethours >= 5 && gethours < 12 ){
        greeting.innerText = "Good Morning"
    }else if(gethours >= 17 && gethours < 23 ) {
        greeting.innerText = "Good Evening"
    }
    if (gethours > 12) {
        gethours = gethours - 12;
        hours.innerText = gethours;
    } if (getMinutes < 10) {
        getMinutes = "0" + getMinutes;
        minutes.innerText = getMinutes;
    } if (getSeconds < 10) {
        getSeconds = "0" + getSeconds;
        seconds.innerText = getSeconds;
    } if (gethours < 10) {
        gethours = "0" + gethours;
        hours.innerText = gethours;
    }
    hours.innerText = gethours;
    minutes.innerText = getMinutes;
    seconds.innerText = getSeconds;
}

// changeTime function convert out time in 24 our formate

function changeTime() {
    let date = new Date();
    let gethours = date.getHours();
    let getMinutes = date.getMinutes();
    let getSeconds = date.getSeconds();
    if (gethours < 11 && getMinutes < 59 ) {
        amPm.innerText = "AM"
    } else {
        amPm.innerText = "PM"
    }if(gethours >= 12 && gethours <14){
        greeting.innerText = "Good noon"
    }else if(gethours >= 14 && gethours < 17) {
        greeting.innerText = "Good afternoon"
    }else if(gethours >= 5 && gethours < 12 ){
        greeting.innerText = "Good Morning"
    }else if(gethours >= 17 && gethours < 23 ) {
        greeting.innerText = "Good Evening"
    }
    if (getMinutes < 10) {
        getMinutes = "0" + getMinutes;
        minutes.innerText = getMinutes;
    } if (getSeconds < 10) {
        getSeconds = "0" + getSeconds;
        seconds.innerText = getSeconds;
    } if (gethours < 10) {
        gethours = "0" + gethours;
        hours.innerText = gethours;
    }
    hours.innerText = gethours;
    minutes.innerText = getMinutes;
    seconds.innerText = getSeconds;
}


setInterval(() => {
    if(timeFormat) {
        changeTime();
    } else {
        time();
    }
    let getDate = new Date().toDateString().replace(" ", ", ");
    currentDate.innerText = getDate;
}, 1000)

// todo part 

let todoShow  = localStorage.getItem("todoShow") ? JSON.parse(localStorage.getItem("todoShow")) : false;
let todoContainer = document.querySelector(".todo-container");
let inputText = document.querySelector(".input");
let root = document.querySelector(".list");
let all = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let clearCompleted = document.querySelector(".clear-completed");
let todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];


let noElement = document.querySelector(".no-elem");

let addTodo = document.querySelector(".add-todo");
addTodo.checked = todoShow;
if(todoShow) {
        todoContainer.style.display = "flex";
}else{
     todoContainer.style.display = "none"
}
function todoHandler(event) {
    todoShow = !todoShow;
    addTodo.checked = todoShow ;
    localStorage.setItem("todoShow" , todoShow);
    let todoChecked = event.target.checked;
    if(todoChecked) {
        todoContainer.style.display = "flex"
        return
    }
    todoContainer.style.display = "none"

}
addTodo.addEventListener("click", todoHandler);
function inputHandler(event) {
    // console.log(event.target.value);
    let inputValue = event.target.value;
    if (event.keyCode === 13 && inputValue.length > 0) {
        let todoObj = {
            text: `${inputValue}`,
            isDone: false,
        }
        todoArr.push(todoObj)
        createUi(todoArr);
        noElement.innerText = todoArr.length;
        localStorage.setItem("todoArr", JSON.stringify(todoArr))
        event.target.value = "";
    }
}

function handleCheck(event) {
    let id = event.target.dataset.id;
    todoArr[id].isDone = !todoArr[id].isDone;
    createUi(todoArr);

}
function handleDelete(event) {
    let id = event.target.dataset.id;
    todoArr.splice(id, 1);
    createUi(todoArr);
    localStorage.setItem("todoArr", JSON.stringify(todoArr))
}



function createUi(todoArr) {
    root.innerHTML = "";
    todoArr.forEach((element, i) => {
        let li = document.createElement("li");
        li.classList = "list-item flex justify-between align-center"
        let inputCheck = document.createElement("input");
        inputCheck.classList.add("check-btn")
        inputCheck.type = "checkbox";
        inputCheck.checked = element.isDone;
        inputCheck.setAttribute("data-id", i);
        inputCheck.addEventListener("click", handleCheck);
        let p = document.createElement("p");
        p.classList.add("text")
        p.innerText = element.text;
        if (element.isDone) {
            p.classList.add("line-through")
            localStorage.setItem("todoArr", JSON.stringify(todoArr))
        }
        let span = document.createElement("span");
        span.classList.add("delete-btn")
        span.innerText = "x"
        console.log(span);
        span.setAttribute("data-id", i);
        span.addEventListener("click", handleDelete);
        li.append(inputCheck, p, span);
        root.append(li);
    });
}

createUi(todoArr)

inputText.addEventListener("keyup", inputHandler);


all.addEventListener("click", () => {
    createUi(todoArr);
    localStorage.setItem("todoArr", JSON.stringify(todoArr))
    noElement.innerText = todoArr.length;
})
active.addEventListener("click", (event) => {
    let activeElement = todoArr.filter(element => element.isDone === false)
    createUi(activeElement);
    localStorage.setItem("todoArr", JSON.stringify(todoArr))
    noElement.innerText = activeElement.length
})
completed.addEventListener("click", (event) => {
    let completedElement = todoArr.filter(element => element.isDone === true);
    createUi(completedElement);
    localStorage.setItem("todoArr", JSON.stringify(todoArr))
    noElement.innerText = completedElement.length;
});

clearCompleted.addEventListener("click", (event) => {
    let todoCompleted = todoArr.filter(element => element.isDone === false);
    todoArr = todoCompleted;
    createUi(todoArr);
    localStorage.setItem("todoArr", JSON.stringify(todoArr))
    noElement.innerText = todoArr.length;
})


// qutoes block



// setting Btn
let isSettingDivVisivle = false;
let settingDiv = document.querySelector(".setting-container");
let settingBtn = document.querySelector(".setting-btn");

settingBtn.addEventListener("click", (event) => {

    isSettingDivVisivle = !isSettingDivVisivle;
    settingDiv.style.display = `${isSettingDivVisivle ? "block" : "none"}`
})


// input values 



let twitterLink , gitHubLink, linkdinLink;

let twitterInput = document.querySelector(".twitter-link");
let gitHubInput = document.querySelector(".github-link");
let linkdinInput  = document.querySelector(".linkdin-link");

let github = document.querySelector(".github");
let twitter = document.querySelector(".twitter");
let linkdin = document.querySelector(".linkdin");




function createLink(userId, key) {
    if(key === "linkedin") {
        return `https://www.${key}.com/in/${userId}`
    }else{
        return `https://www.${key}.com/${userId}`
    }
}


// twitter functionalty

twitterLink = "twitterLink" in localStorage ? localStorage.getItem("twitterLink") : "";

if(twitterLink.length > 0) {
    twitter.href = twitterLink 
    twitter.classList.remove("hidden")
}

twitterInput.addEventListener("blur" , (event)=>{
    twitterLink = event.target.value;
    if(twitterLink.length >0) {
        twitterLink =  createLink(twitterLink , "twitter");
        twitter.href = twitterLink 
        twitter.classList.remove("hidden")
        localStorage.setItem("twitterLink", twitterLink);
    }
   
})

// linkedin.com/in/ravindra-rajpoot-342946156
// https://www.linkedin.com/in/ravindra-rajpoot-342946156/

// linkdin functionalty

linkdinLink = "linkdinLink" in localStorage ? localStorage.getItem("linkdinLink") : "" ;

if(linkdinLink.length > 0) {
    linkdin.href = linkdinLink 
    linkdin.classList.remove("hidden")
}


linkdinInput.addEventListener("blur" , (event)=>{
    linkdinLink = event.target.value;
    if(linkdinLink.length >0 ) {
       linkdinLink =  createLink(linkdinLink, "linkedin");
       linkdin.href = linkdinLink 
       linkdin.classList.remove("hidden")
       localStorage.setItem("linkdinLink", linkdinLink);
       

    }
   
})


// gitHub functionalty

gitHubLink = "gitHubLink" in localStorage ? localStorage.getItem("gitHubLink") : "" ;

if(gitHubLink.length > 0) {
    github.href = gitHubLink
    github.classList.remove("hidden")
}

// https://github.com/ravindra-singh94
gitHubInput.addEventListener("blur" , (event)=>{
    gitHubLink = event.target.value;
    if(gitHubLink.length >0 ) {
       gitHubLink =  createLink(gitHubLink, "github");
       github.href = gitHubLink
       localStorage.setItem("gitHubLink", gitHubLink);
       github.classList.remove("hidden")
    }
   
})

// add name 
let name = document.querySelector(".name");
let nameInput = document.querySelector(".add-name");
name.innerText = "nameValue" in localStorage ? localStorage.getItem("nameValue") : "Ravindra";
nameInput.addEventListener("blur", (event) => {
    let nameValue = event.target.value;
    name.innerText =nameValue;
    localStorage.setItem("nameValue" , nameValue);
})

// qutoes part


let qutoes = document.querySelector(".quto-text");
let writerName = document.querySelector(".writer-name");

qutoes.innerText = quotes[Math.floor(Math.random() * quotes.length)].quoteText;

writerName.innerText = quotes[Math.floor(Math.random() * quotes.length)].quoteAuthor;


let qutoeContainer = document.querySelector(".qutoes");
let qutoesGenerator = document.querySelector(".qutoes-generator");

let qutoesCheck = localStorage.getItem("qutoesCheck") ? JSON.parse(localStorage.getItem("qutoesCheck")) : false;

qutoesGenerator.checked = qutoesCheck;
if(qutoesCheck) {
    qutoeContainer.style.display = "flex";
}else{
    qutoeContainer.style.display = "none";
}

function qutoeHandler(event) {
    qutoesCheck = !qutoesCheck;
    let checkQuto = event.target.checked;
    localStorage.setItem("qutoesCheck" ,qutoesCheck);
    if(checkQuto) {
        qutoeContainer.style.display = "flex";
    }else{
        qutoeContainer.style.display = "none";
    }
}

qutoesGenerator.addEventListener("click", qutoeHandler)