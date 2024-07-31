let GameMoves = [];
let playerScore = 0;
let computerScore = 0;

function getMoves() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      GameMoves = JSON.parse(xmlhttp.responseText).moves;
      createButtons(GameMoves);
    }
  };
  xmlhttp.open("GET", "components.json", true);
  xmlhttp.send();
}

function createButtons(moves) {
  const gameDiv = document.getElementById("gameMovesButton");
  let buttonsHTML = "";
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    buttonsHTML +=
      "<button onclick='play(\"" +
      move.name +
      '", "' +
      move.image +
      "\")'>" +
      "<img src='" +
      move.image +
      "'>" +
      "</button>";
  }
  gameDiv.innerHTML = buttonsHTML;
}

function play(playerMove, playerImage) {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";

  const userChoiceImage = document.createElement("img");
  userChoiceImage.src = playerImage;
  resultElement.appendChild(userChoiceImage);

  const computerMove = GameMoves[Math.floor(Math.random() * GameMoves.length)];

  const computerChoiceImage = document.createElement("img");
  computerChoiceImage.src = computerMove.image;
  resultElement.appendChild(computerChoiceImage);

  const result = getResult(playerMove, computerMove.name, GameMoves);

  if (result === "Player won!") {
    playerScore++;
    if (playerScore === 10) {
      document.getElementById("announce").innerHTML =
        "You Won! Final Score: " + playerScore + " vs " + computerScore;
      resetGame();
    } else {
      document.getElementById("announce").innerHTML = "You win this round!";
    }
  } else if (result === "Computer won!") {
    computerScore++;
    if (computerScore === 10) {
      document.getElementById("announce").innerHTML =
        "Computer Won! Final Score: " + computerScore + " vs " + playerScore;
      resetGame();
    } else {
      document.getElementById("announce").innerHTML = "Computer wins this round!";
    }
  } else if (result === "Draw!") {
    document.getElementById("announce").innerHTML = "It's a draw!";
  }

  document.getElementById("PlayerScore").innerHTML = playerScore;
  document.getElementById("ComputerScore").innerHTML = computerScore;
}

function getResult(playerMove, computerMove, moves) {
  if (playerMove === computerMove) {
    return "Draw!";
  }

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    if (move.name === playerMove) {
      if (move.beats === computerMove) {
        return "Player won!";
      } else {
        return "Computer won!";
      }
    }
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
}

window.onload = getMoves;
