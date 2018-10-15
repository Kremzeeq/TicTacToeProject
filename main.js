
console.log("I'm connected")

const cellsOnBoard = 9;
const playerOneName = "One";
const playerTwoName = "Two";
const playerNames = {"0":playerOneName, "1":playerTwoName};

const playerOneIconURL = "https://tse3.mm.bing.net/th?id=OIP.I1Iv1ubIkj_XvVFli-n30wHaHa&pid=Api";
const playerTwoIconURL = "https://img00.deviantart.net/d011/i/2005/346/5/6/mokona_by_talakanna.png";

const playerOneIconName = "Dark Mokona";
const playerTwoIconName = "Light Mokona";

const startGamePrompt="Welcome to tic-tac-toe. It's Player One's turn";

var gridDict = null;
var gameBoardActive = false;

class createPlayer{
  constructor(playerID,iconURL,iconName){
    this.playerID = playerID;
    this.iconURL = iconURL;
    this.iconName = iconName;
  }
}

let playerOne = new createPlayer(playerOneName,playerOneIconURL,playerOneIconName);
let playerTwo = new createPlayer(playerTwoName,playerTwoIconURL,playerTwoIconName);

var playerTurn = 0
var players = [playerOne, playerTwo]


function gamePrompt(gameMessage){
  alert(gameMessage);
}

function initGrid(){
  var gridDict=[];
  for (var i=0; i<cellsOnBoard; i++){
    num= i+1
    var cellName = "cell"+ num;
    gridDict[i] = {"cellID":cellName,"playerIconPresent": null} //player image will either be one or two
  }
  return gridDict;
  console.log(gridDict);
}
// https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
// https://stackoverflow.com/questions/28704100/document-queryselectorallvariable-class
// https://stackoverflow.com/questions/8909652/adding-click-event-listeners-in-loop

function initEventListenersForGridCells(gridDict){
  for (var i=0; i<cellsOnBoard; i++){
    var cellName = gridDict[i]["cellID"];
    var cell = document.getElementById(cellName);
    // closure
    (function (_cell){
      cell.addEventListener("dblclick", function(){ initPlayerTurn(_cell); }) // closure
    })(cell)
  }
}

function showImage(cell,src,alt){
  var img = document.createElement("img");
  img.src= src;
  img.alt = alt;
  img.width = 150;
  img.height = 150;
  cell.appendChild(img);
}

function initPlayerTurn(cell){
  updateGridDict(cell)
}

function showPlayerIcon(cell){
  player = players[playerTurn];
  showImage(cell, player.iconURL,player.iconName)
}

function opositePlayerTurn(){
  return 1 - playerTurn
}

function changePlayerTurn(){
   playerTurn = opositePlayerTurn()
 }

function findCellIndex(cell){
  var cellCol = cell.cellIndex
  var cellRow = cell.parentElement.rowIndex
  return cellCol + (cellRow*3)
}

function nextTurn(){
  changePlayerTurn();
  //gamePrompt(playerMessageForTurns[playerTurn])
}

function updateGridDict(cell){
  var cellIndex = findCellIndex(cell)
  if(gridDict[cellIndex]["playerIconPresent"] === null || gridDict[cellIndex]["playerIconPresent"] !== opositePlayerTurn()){
    gridDict[cellIndex]["playerIconPresent"] = playerTurn;
    console.log(gridDict);
    showPlayerIcon(cell);
    playerTurnEndPhase()
    //checkWinCondition();
    //window.setTimeout(nextTurn, 1000)
  }else{ void(0)
 }
}

function playerTurnEndPhase(){
  if (checkWinCondition() === false){
    window.setTimeout(nextTurn, 1000)
  }
}

function checkWinCondition(){
  if (checkWinInRows() || checkWinInColumns() || checkWinInDiagonal()){
    window.setTimeout(playerWinMessage,500)
    window.setTimeout(reloadPage, 2000)
  }else{
    return false
  }
}

function reloadPage(){
  window.location.reload()
}

function checkWinInRows(){
  for (var i = 0; i < cellsOnBoard; i+=3) {
    var firstCell = gridDict[i]["playerIconPresent"]
    var secondCell = gridDict[i +1]["playerIconPresent"]
    var thirdCell = gridDict[i +2]["playerIconPresent"]
    if (firstCell != null && firstCell === secondCell && firstCell === thirdCell){
      return true}
    }
    return false
  }

function checkWinInColumns(){
  for (var i = 0; i < 3; i++) {
    var firstCell = gridDict[i]["playerIconPresent"]
    var secondCell = gridDict[i +3]["playerIconPresent"]
    var thirdCell = gridDict[i +6]["playerIconPresent"]
    if (firstCell != null && firstCell === secondCell && firstCell === thirdCell){
      return true}
    }
    return false
  }

function checkWinInDiagonal(){
  var i = 4
  var middleCell = gridDict[i]["playerIconPresent"]
  if (middleCell === null){
    return false
  }
  if (middleCell == gridDict[i-4]["playerIconPresent"] && middleCell == gridDict[i+4]["playerIconPresent"]){
    return true}
  else if (middleCell == gridDict[i-2]["playerIconPresent"] && middleCell == gridDict[i+2]["playerIconPresent"]){
    return true}
    return false
  }

function playerWinMessage(){
  var playerTurnString = playerTurn.toString();
  let extractedPlayerName = playerNames[playerTurnString];
  playerMessageForWin = `Congratulations! Player ${extractedPlayerName} won!`
  return gamePrompt(playerMessageForWin)
}

function startGame(){
  gameBoardActive = true;
  gamePrompt(startGamePrompt);
  gridDict=initGrid();
  initEventListenersForGridCells(gridDict);
  }

var startButton = document.querySelector('#startGameButton');
startButton.addEventListener("click",function(){
  startGame()
})

// Dark Mokona icon is the artwork of Carudo
// https://www.deviantart.com/carudo/art/Mokona-Black-AI-180136990
// Light Mokona is the artwork of Talakana
// https://www.deviantart.com/talakanna
