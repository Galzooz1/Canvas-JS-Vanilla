let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');
let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;

let colorArray = [
    '#421A59',
    '#D1BADE',
    '#A03FD9',
    '#472759',
    '#7C30A8'
]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
    
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y,this.radius, 0 ,Math.PI * 2, false);
        // c.strokeStyle = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if (this.x+this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y+this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+= this.dy;

        // interactivity with client
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        this.draw();
    }
}

let circleArray = [];
function init(){
    circleArray = [];
    for (let i = 0; i < 2000; i++) {
        let radius = Math.random() * 20 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        circleArray.push(new Circle(x,y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    //make the circle created once and move
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    // circle.update();
    // circle.draw();
}

init();
animate();

console.log(canvas);

