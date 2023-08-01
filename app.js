document.addEventListener('DOMContentLoaded', ()=>{
    function alertMe(){
        wlcm_msg="🎮"
        alert("Welcome to the world of Tetris!"+wlcm_msg)
       }
       alertMe()
   const grid = document.querySelector('.grid')
   let squares = Array.from(document.querySelectorAll('.grid div'))
   const scoreDisplay = document.querySelector('#score')
   const startBtn = document.querySelector('#start-button')
   const gridSpacing = 10
   let nextRandom = 0 

   //The Tetrominoes
   const lTetromino = [
    [1, gridSpacing+1, gridSpacing*2+1, 2],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing*2+2],
    [1,gridSpacing+1,gridSpacing*2+1,gridSpacing*2],
    [gridSpacing,gridSpacing*2,gridSpacing*2+1,gridSpacing*2+2]
   ]

   const zTetromino = [
    [gridSpacing*2,gridSpacing*2+1,gridSpacing+1,gridSpacing+2],
    [0,gridSpacing,gridSpacing+1,gridSpacing*2+1],
    [gridSpacing*2,gridSpacing*2+1,gridSpacing+1,gridSpacing+2],
    [0,gridSpacing,gridSpacing+1,gridSpacing*2+1]
    
   ]

   const tTetromino = [
    [1,gridSpacing,gridSpacing+1,gridSpacing+2],
    [1,gridSpacing+1,gridSpacing+2,gridSpacing*2+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing*2+1],
    [1,gridSpacing,gridSpacing+1,gridSpacing*2+1]

   ]

   const oTetromino = [
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1]

   ]

   const iTetromino = [

    [1,gridSpacing+1,gridSpacing*2+1,gridSpacing*3+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing+3],
    [1,gridSpacing+1,gridSpacing*2+1,gridSpacing*3+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing+3]
   ]
   //More Tetromino
   /* const tiTetromino = [
     [],
     [],
     [],
     []
   ] */

   const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //randomly sleect a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  //console.log(random)
  //tetromino is a randomly selected from theTerominoes Array
  let tetromino = theTetrominoes[random][0]
  //console.log(theTetrominoes);
  

  //draw the first rotation in the first tetromino
  //cell:in a grid
  function draw(){
    tetromino.forEach(cell =>{
        squares[currentPosition + cell].classList.add('tetromino')
    })
  }

//undraw the Tetromino
function undraw(){
    tetromino.forEach(cell=>{
        squares[currentPosition + cell].classList.remove('tetromino')
    })
}

function getRandomIntIinclusive(min,max){
    min = Math.ceil(min)
    max=  Math.floor(max);
    return Math.floor(Math.random() * (max - min +1) + min)
    // The maximum is inclusive and the minimum is inclusive
}
//make the tetromino move down every second
// timerId = setInterval(moveDown, getRandomIntIinclusive(805,1000))
timerId = setInterval(moveDown,1000)

// assign functions to keyCodes
function control(e){
    if(e.code === "ArrowLeft"){
        moveLeft()
    }
    else if(e.code === "ArrowUp"){
        rotate()
    }
    else if(e.code === "ArrowRight"){
        moveRight()
    }
    else if(e.code === "ArrowDown"){
        moveDown()
    }
}

document.addEventListener('keyup',control)


// console.log(getRandomIntIinclusive(805,1000))
//move down function()
function moveDown(){
    undraw()
    currentPosition += gridSpacing;
    draw()
    freeze()
}
//freeze function
function freeze(){
    if(tetromino.some(cell => squares[currentPosition + cell + gridSpacing].classList.contains('taken')))
    {
        tetromino.forEach(cell => squares[currentPosition + cell].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        tetromino = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
    }
}

//move the tetromino left, unless is at the edge opr there is a blockage
function moveLeft(){
    undraw()
    const isAtLeftEdge = tetromino.some(cell => (currentPosition + cell) % gridSpacing === 0)

    if(!isAtLeftEdge) currentPosition -= 1
    
    if(tetromino.some(cell => squares[currentPosition + cell].classList.contains('taken')))
    {
        currentPosition +=1
    }

    draw()
}
// move the tetromino right, unless is at the edge
function moveRight(){
    undraw()
    const isAtRightEdge = tetromino.some(cell => (currentPosition + cell)% gridSpacing === gridSpacing-1)

    if(!isAtRightEdge) currentPosition +=1

    if(tetromino.some(cell => squares[currentPosition + cell].classList.contains('taken')))
    {
        currentPosition -=1
    }

    draw()
}

//rotate the tetromino
function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === tetromino.length){ // if the current rotation gets to 4, make it go back to 0
        currentRotation = 0
    }
    tetromino = theTetrominoes[random][currentRotation]
    draw()
}

//show up-next tetromino in mini-grid display
 const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0


//the Tetrominos without rotations
const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
     
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
     
    })
  }

})


