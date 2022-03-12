const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHight = 20

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
    new Block(10,270)
]


//draw  all my blocks
function addBlocks() {
   for (let i = 0; i <blocks.length; i++) {
   const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0]
   block.style.bottom = '50px'
   grid.appendChild(block)    
   }
 }

 addBlocks()
