const grid = document.querySelector('.grid')
const scoredisplay = document.querySelector('#score')
const blockWidth = 100
const blockHight = 20
const ballDiameter = 20
const borardWidth = 560
const borardHeight = 300
let timerid
let xDirection = 2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPositon = userStart

const ballStart = [270, 32]
let ballcurrentPositon = ballStart

//crate Block 
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomright = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHight]
    }
}
//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210), 
]
//draw  all my blocks
function addBlocks() {
   for (let i = 0; i <blocks.length; i++) {
   const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0] + 'px'
   block.style.bottom = blocks[i].bottomLeft[1] + 'px'
   grid.appendChild(block)    
   }
 }
 addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser() {
    user.style.left = currentPositon[0] + 'px'
    user.style.bottom = currentPositon[1] + 'px'
}

//draw the ball
function drawBall() {
    ball.style.left = ballcurrentPositon[0] + 'px'
    ball.style.bottom = ballcurrentPositon[1] + 'px'
}

// move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPositon[0] > 0) {
             currentPositon[0] -= 10
             drawUser()
            }
            break;
            case 'ArrowRight':
            if (currentPositon[0] < borardWidth - blockWidth ) {
                currentPositon[0] +=10
                drawUser()
            }
            break;                
    }
}
document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall() {
    ballcurrentPositon[0] += xDirection
    ballcurrentPositon[1] += yDirection
    drawBall()
    checkForCollisons()
} 

timerid =  setInterval(moveBall, 25)

// check for collisons
function checkForCollisons() {

// check for block collisons 
for (let i = 0; i < blocks.length; i++) {
    if (
        (ballcurrentPositon[0] > blocks[i].bottomLeft[0] && ballcurrentPositon[0] < blocks[i].bottomright[0]) &&  
        ((ballcurrentPositon[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballcurrentPositon[1] < blocks[i].topLeft[1])
    ) {
        const allBlocks =  Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i, 1)
        changeDirection()
        score++
        scoredisplay.innerHTML = score

    //check for Win
    if (blocks.length === 0) {
        scoredisplay.innerHTML = 'YOU WIN'
        clearInterval(timerid)
        document.removeEventListener('keydown', moveUser)
     }
    }       
  }

    //check for wall collisons
    if (
        ballcurrentPositon[0] >= (borardWidth - ballDiameter) || 
        ballcurrentPositon[1] >= (borardHeight - ballDiameter) ||
        ballcurrentPositon[0] <= 0
        ) {
    changeDirection() 
}

//check for user collisions
if(
    (ballcurrentPositon[0] > currentPositon[0] && ballcurrentPositon[0] < currentPositon[0] + blockWidth) &&
    (ballcurrentPositon[1] > currentPositon[1] && ballcurrentPositon[1] < currentPositon[1] + blockHight)
) {
    changeDirection()
}

//check for game over
if (ballcurrentPositon[1] <= 0) {
    clearInterval(timerid)
    scoredisplay.innerHTML = 'YOU LOSE'
    document.removeEventListener('keydown', moveUser)
}

}

function  changeDirection() {
    if (xDirection === 2 && yDirection ===2) {
        yDirection = -2
        return
    }
     if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
     }
     if (xDirection === -2 && yDirection === -2 ) {
         yDirection = 2
         return
     }
     if (xDirection === -2 && yDirection === 2) {
         xDirection = 2
         return
     }
}
