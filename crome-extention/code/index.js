

// watch section 
let timeFormate = false;

let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".second");
let currentDate = document.querySelector(".date");
let amPm = document.querySelector(".time-am-pm");
let settingDiv = document.querySelector(".setting-container");
let settingBtn = document.querySelector(".setting-btn");

function time() {
    let date = new Date();
    let gethours = date.getHours();
    let getMinutes = date.getMinutes();
    let getSeconds = date.getSeconds();
    if (gethours === 11 && getMinutes === 59) {
        amPm.innerText = "AM"
    } else {
        amPm.innerText = "PM"
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

setInterval(() => {
    if (timeFormate) {
        changeTime()
    } else {
        time();
    }
    let getDate = new Date().toDateString().replace(" ", ", ");
    // let dateArr = getDate.split(" ");
    // dateArr[0] = dateArr[0] + ","
    currentDate.innerText = getDate;
}, 1000)

// todo part 
let inputText = document.querySelector(".input");
let root = document.querySelector(".list");
let all = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let clearCompleted = document.querySelector(".clear-completed");
let todoArr = localStorage.getItem("todoArr") ? JSON.parse(localStorage.getItem("todoArr")) : [];
let noElement = document.querySelector(".no-elem");

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
        span.innerText = "X"
        console.log(span);
        span.setAttribute("data-id", i);
        span.addEventListener("click", handleDelete);
        li.append(inputCheck, p, span);
        root.append(li);

        console.log(root);
    });
}

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

let isSettingDivVisivle = false;
settingBtn.addEventListener("click", (event) => {

    isSettingDivVisivle = !isSettingDivVisivle;
    settingDiv.style.display = `${isSettingDivVisivle ? "block" : "none"}`
})
