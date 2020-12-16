let btn = document.querySelector('.btn');
let heading = document.querySelector('.heading');
let articleAuthor = document.querySelector('.text')
let qutoes = document.querySelector('.qutoes');
let img = document.querySelector('.img');
let bodyBackGround = document.querySelector('body');

btn.addEventListener("click" , () => {
    let dataValue = quotes[Math.floor(Math.random() * quotes.length)]
    let backGroundImg = imgs[Math.floor(Math.random() * imgs.length)]
    console.log(dataValue);
    bodyBackGround.style.background = ` linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.5)), url(${backGroundImg.src}) `
    bodyBackGround.style.backgroundRepeat = "no-repeat";
    bodyBackGround.style.backgroundSize = "cover";
    let author = dataValue.quoteAuthor;
    let qutoesValue = dataValue.quoteText;
    qutoes.innerText = `${qutoesValue}`
    articleAuthor.innerText = `${author}`
})
setInterval(() => {
    let backGround = imgs[Math.floor(Math.random() * imgs.length)]
    bodyBackGround.style.background = ` linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.5)), url(${backGround.src}) `
    bodyBackGround.style.backgroundRepeat = "no-repeat";
    bodyBackGround.style.backgroundSize = "cover";
}, 2000);



