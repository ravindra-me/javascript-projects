var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var maxRadius = 40;
var minRadius = 2;
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
        if(this.x + radius>innerWidth || this.x - radius<0){
            this.dx = -this.dx
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius <0){
            this.dy= -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;


        // intreactivity

        if(mouse.x - this.x < 50  && mouse.x -this.x > -50 && mouse.x - this.x < 50  && mouse.y -this.y > -50) {
            if(this.radius < maxRadius){
                this.radius +=1;

            }
            // console.log(mouse.x)
        }else if(this.radius > this.minRadius) {
            this.radius -=1;
        }
        this.draw();
    }
}

// var circle = new Circle(200, 200, 5, 5, 30);

let circleArray = [];

function init() {
    circleArray = [];
    for(var i=0 ; i<2; i++){ 
        var x= Math.random() * (innerWidth - (2*radius)) + radius;
        var y = Math.random() * (innerHeight - (2*radius) )+ radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() *3 +1;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

init()


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for(var i=0 ; i< circleArray.length ; i++) {
        circleArray[i].update();
    }
    // circle.update();
    // c.beginPath();
    // console.log("fbdsk")
}
animate();