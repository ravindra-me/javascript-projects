
function main(){
const colorArr = ['aliceblue', 'brown', 'blueviolet', 'royalblue', 'pink', 'red', 'green', 'plum', 'purple', 'indigo', 'blue', 'white', 'saddlebrown', "burlywood", "lightskyblue", "cadetblue", "black", "cornsilk", "hotpink", "honeydew", "wheat"];
let colorFragment  = new DocumentFragment();
let colorPlate = document.querySelector('.color-plate');
let currentColor = document.querySelector(".current-color");
let currentTool = document.querySelector(".current-tool i")
let tools = document.querySelector(".tools")

// for create the color plate
colorArr.forEach(e =>{
    let colorDiv =  document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.dataset.color = `${e}`;
    colorDiv.style.backgroundColor = `${e}`;
    colorPlate.append(colorDiv)
})

colorPlate.append(colorFragment)

// create grid boxes
let gridArea = document.querySelector('.grid-area');
let pixel = document.querySelector('.pixel');
let divFragment = new DocumentFragment();


// submit form 
let form  = document.querySelector('.form');
function createBox(width, height){
    let noDiv  =  width*height;
    if(noDiv <= 6400) {
        for(let i=1 ; i <= noDiv ; i++) {
            let div  =  document.createElement("div")
            div.classList.add("pxel");
            divFragment.append(div);
        }
        gridArea.append(divFragment);
    }else {
        alert(`grid can not be greater than 80*80 and your value are ${width} * ${height}`)
    }
}

function createGrid(event) {
    event.preventDefault();
    console.log(event.target)
    let width = event.target.width.value;
    let height = event.target.height.value;
    gridArea.style.width = `${width*10}px`
    createBox(width, height);
}
form.addEventListener("submit", createGrid);


// control functionalty all tool and color

let color ,tool;

document.addEventListener("click" , (event) =>{
    if(event.target.dataset.color){
        color = event.target.dataset.color
        currentColor.style.backgroundColor = color
    }if(event.target.dataset.id){
        tool = event.target.dataset.id;
        if(tool==="eye-dropper") {
            currentTool.classList.add("fas" , "fa-eye-dropper" ,"eye-dropper")
        }else if(tool === "paint-brush") {
            currentTool.classList.add("fas" , "fa-paint-brush" , "paint-brush")
        }else if(tool === "pencil") {
            currentTool.classList.add("fas", "fa-pencil-alt" , "pencil");
        }else if(tool === "eraser") {
            currentTool.classList.add("fas", "fa-eraser" , "eraser");

        }else if(tool === "square") {
            currentTool.classList.add("fas", "fa-square" , "square");
        }else if(tool === "trash") {
            currentTool.classList.add("fas" , "fa-trash" , "trash");
        }
    }
    function drowFn(event) {
        if(tool==="paint-brush") {
            event.target.style.backgroundColor = color;

        }
        if(tool === "eye-dropper") {
            let bg = event.target.style.backgroundColor
            currentColor.style.backgroundColor = bg
        }if(tool === "eraser") {
            event.target.style.backgroundColor = "white";
        }if(tool == "square") {
            document.querySelectorAll('.pxel').forEach(e => e.style.backgroundColor = "white")
        }if(tool === "trash") {
            gridArea.innerHTML = "";
        }
    }
    if(tool === "pencil") {
        function pencilFu (event) {
            event.target.style.backgroundColor = color
    }
    gridArea.addEventListener("mousedown" , pencilFu)
    }

    gridArea.addEventListener("mouseover" , drowFn)
  

})

}

main();


// gridArea.addEventListener("mouseover" , paintFn)
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