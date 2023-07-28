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

  let currentPosition = 5
  let currentRotation = 0
  //randomly sleect a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
//   console.log(random)
  let current = theTetrominoes[random][0]
  //console.log(theTetrominoes);
  

  //draw the first rotation in the first tetromino
  //cell:in a grid
  function draw(){
    current.forEach(cell =>{
        squares[currentPosition + cell].classList.add('tetromino')
    })
  }

//undraw the Tetromino
function undraw(){
    current.forEach(cell=>{
        squares[currentPosition + cell].classList.remove('tetromino')
    })
}

draw()

})
