/*----- constants -----*/
const SYMBOLS = {
    1: "X",
    0: "",
    "-1":"O"
}

/*----- state variables -----*/
let board; // array of 7 nested arrays
let turn; // 1 || -1
let winner; // null || 1 || -1 || 'T'
let turnCount;

/*----- cached elements  -----*/

const tileEls = [...document.querySelectorAll("#board > div")];
const boardEl = document.getElementById("board");
const rstBtn = document.querySelector("button");
let h2Text = document.querySelector("h2");
// console.log(tileEls);

/*----- event listeners -----*/
boardEl.addEventListener("click", clickedTile);
rstBtn.addEventListener("click", init);

/*----- functions -----*/
init();

function init(){
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    turn = 1;
    winner = null;
    turnCount = 0;
    render();
}

function render(){
    renderBoard();
    renderMessage();
}

function renderBoard(){
    board.forEach(function(colArr, colIdx) { // checks main array
        //console.log(colArr, colIdx)
        colArr.forEach(function(cellVal, rowIdx) { //checks sub arrays
            // console.log(cellVal, rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.innerText = SYMBOLS[cellVal];
        })
    })
}

function renderMessage(){
    if (!winner && turnCount < 9){
        if (turn === 1){
            h2Text.innerText = "Player X's Turn";
        }else{
            h2Text.innerText = "Player 0's Turn";
        }
    }else if (winner === 1){
        h2Text.innerText = "Player X Wins!";
    }else if (winner === -1){
        h2Text.innerText = "Player 0 Wins!";
    }else{
        h2Text.innerText = "Tie game!"
    }

}

function clickedTile(event){
    if (!winner){
    let colIdx = tileEls.indexOf(event.target)
    let keptColIdx = colIdx;
    let row = 2;
    if (colIdx > 2 && colIdx < 6){
        colIdx -= 3;
        row = 1;
    } else if (colIdx > 5){
        colIdx -= 6;
        row = 0;
    }
    // console.log(colIdx);
    if (colIdx === -1) return;

    const colArr = board[colIdx]; 
   // const rowIdx = colArr.indexOf(0); //this is the problem line
    //console.log(rowIdx);
    if (!colArr[row]){
    colArr[row] = turn;
    turn *= -1;
    turnCount++;
    } else {
        console.log("That space has already been taken!");
    }
    winner = getWinner();
    
    
    render();
}
}

function getWinner(){
    return (
        checkHorWin() ||
        checkVertWin()
    )
}

function checkVertWin(){
    for (i=0;i < board.length; i++){
        if (!board[i].includes(0)){ // column is full!
            if (!board[i].includes(-1)){
                return 1;
            } else if (!board[i].includes(1)){
                return -1;
            }
        }
    }
}

function checkHorWin(){
    const row1 = [];
    const row2 = [];
    const row3 = [];

    for (i=0;i<board.length;i++){
        currentArr = board[i];
        row1.push(currentArr[0]);
        row2.push(currentArr[1]);
        row3.push(currentArr[2]);
        
    }
    if (!row1.includes(0) || !row2.includes(0) || !row3.includes(0)){ // a row is full!
        
        if (!row1.includes(0)){
            if (!row1.includes(-1)) return 1;
            else if (!row1.includes(1)) return -1;
        } else if (!row2.includes(0)){
            if (!row2.includes(-1)) return 1;
            else if (!row2.includes(1)) return -1;
        } else if (!row3.includes(0)){
            if (!row3.includes(-1)) return 1;
            else if (!row3.includes(1)) return -1;
        }   
    }
    if (row1[0] === row2[1] && row2[1] === row3[2]){
        if (row2[1] === 1) return 1;
        else if (row2[1] === -1) return -1;
        
    }else if (row1[2] === row2[1] && row2[1] === row3[0]){
        if (row2[1] === 1) return 1;
        else if (row2[1] === -1) return -1;
        
    }

}
