document.addEventListener('DOMContentLoaded', ()=>{
    function alertMe(){
        wlcm_msg="🎮"
        alert("Welcome to the world of Tetris!"+wlcm_msg)
       }
       alertMe()
   const grid = document.querySelector('.grid')
   let squares = Array.from(document.querySelectorAll('.grid div'))
   const ScoreDisplay = document.querySelector('#score')
   const StartBtn = document.querySelector('#start-button')
   const width = 10
   
   //The Tetrominoes
   const lTetromino = [
    [1, width+1, width+2+1, 2],

   ]

   
})
