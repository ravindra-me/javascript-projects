
const colorArr = ['aliceblue', 'brown', 'blueviolet', 'royalblue', 'pink', 'red', 'green', 'plum', 'purple', 'indigo', 'blue', 'white', 'saddlebrown', "burlywood", "lightskyblue", "cadetblue", "black", "cornsilk", "hotpink", "honeydew", "wheat"];
let colorFragment  = new DocumentFragment();
let colorPlate = document.querySelector('.color-plate');
let currentColor = document.querySelector(".current-color");
let currentTool = document.querySelector(".current-tool i")
let tools = document.querySelector(".tools")

colorArr.forEach(e =>{
    let colorDiv =  document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.dataset.color = `${e}`;
    colorDiv.style.backgroundColor = `${e}`;
    colorPlate.append(colorDiv)
})

colorPlate.append(colorFragment)


let gridArea = document.querySelector('.grid-area');
let pixel = document.querySelector('.pixel');
let divFragment = new DocumentFragment();

let form  = document.querySelector('.form');


function createBox(width, height){
    let noDiv  =  width*height;
    for(let i=1 ; i <= noDiv ; i++) {
        let div  =  document.createElement("div")
        div.classList.add("pxel");
        divFragment.append(div);
    }
    gridArea.append(divFragment);
}

function createGrid(event) {
    event.preventDefault();
    console.log(event.target)
    let width = event.target.width.value;
    let height = event.target.height.value;
    gridArea.style.width = `${width*10}px`
    createBox(width, height);
}



let color ,tool;

document.addEventListener("click" , (event) =>{
    if(event.target.dataset.color){
        color = event.target.dataset.color
        currentColor.style.backgroundColor = color
    }if(event.target.dataset.id){
        tool = event.target.dataset.id;
    }
    function drowFn(event) {
        if(tool==="paint-brush") {
            event.target.style.backgroundColor = color;

        }
        if(tool === "eye-dropper") {
            let bg = event.target.style.backgroundColor
            currentColor.style.backgroundColor = bg
        }
    }
    gridArea.addEventListener("mouseover" , drowFn)

})
// gridArea.addEventListener("mouseover" , paintFn)

form.addEventListener("submit", createGrid);


// let colorSelected = "red"
// let toolSelected = "paint-brush"
// let prevFn = paintFn
// let fn = paintFn

// form.addEventListener("submit", createGrid);

// document.addEventListener("click", function(e) {
//     if(e.target.dataset.color) {
//         colorSelected = e.target.dataset.color
//         currentColor.style.backgroundColor = colorSelected
//     }

//     if(e.target.dataset.id) {
//         toolSelected = e.target.dataset.id;
//     }

//     draw()
// })

// function draw() {
//     gridArea.removeEventListener("mouseover", prevFn)
//     if(toolSelected === "paint-brush") {
//         fn = paintFn
//     } else if (toolSelected === "eye-dropper") {
//         fn = eyeDropperFn
//     }
//     prevFn =  fn
//     gridArea.addEventListener("mouseover", fn)
// }

// function paintFn(e) {
//     e.target.style.backgroundColor = colorSelected
// }

// function eyeDropperFn(e) {
//     currentColor.style.backgroundColor = e.target.style.backgroundColor.value
// }