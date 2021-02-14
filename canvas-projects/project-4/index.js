var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var maxRadius = 40;
var minRadius = 2;
var radius = 50;
var mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener('mousemove' , (event)=> {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
    
}) 

window.addEventListener("resize" , (event)=> {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   init();  
})
const colorArr = ["red" , "green" ,"blue" ,"yellow"];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = "blue";
        c.stroke();
        c.fillStyle = this.color;
        c.fill()
    };
    this.update = function() {
        // if(this.x + radius>innerWidth || this.x - radius<0){
        //     this.dx = -this.dx
        // }
        // if(this.y + this.radius > innerHeight || this.y - this.radius <0){
        //     this.dy= -this.dy;
        // }
        // this.x+=this.dx;
        // this.y+=this.dy;


        // intreactivity
        this.draw();
    }
}

// var circle = new Circle(200, 200, 5, 5, 30);

let circleArray = [];
let circle ; 

function init() {
    circle1 = new Circle(300,300,2,2, 100, "black");
    circle2 = new Circle(600,300,2,2, 100, "black");

}


function getDistance(x1,y1,x2,y2) {
    let xDistance  = x2 - x1;
    let yDistance = y2 - y1;
    console.log({xDistance, yDistance})
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    // for(var i=0 ; i< circleArray.length ; i++) {
    //     // circleArray[i].update();
    //     // circle.update()
    // }
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    if(getDistance(circle1.x , circle1.y, circle2.x, circle2.y) < (circle1.radius + circle2.radius)){
        console.log("hi");
    }
    circle2.update();
}


    // c.beginPath();
    // console.log("fbdsk")
init()
animate();
