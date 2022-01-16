// A gameboard module

let gameBoard = (() => {

  let board = ["","","","","","","","",""];

  let boxes = document.querySelectorAll(".box");

  let mark = "X";

  let displayBoard = function() {
    let boardIndex = 0;
    boxes.forEach(box => {
      box.textContent = board[boardIndex];
      boardIndex++;
    });
  };

  let clearBoard = () => {
    for(let i = 0; i < board.length; i++) {
      board[i] = "";
    };
    boxes.forEach(box => {
      box.textContent = "";
    });
    currentPlayer.textContent = "Current Player:";
  };

  let currentPlayer = document.querySelector(".current-player");

  boxes.forEach(box => {
    box.addEventListener("click", (e) => {
      if (currentPlayer.textContent != "Current Player:") {
        if (e.target.textContent == "") {
          storeMark(e.target.dataset.index);
          displayBoard();
          changeMark();
        };
      };
    });
  });

  let storeMark = (boxIndex) => {
    if (board[boxIndex] == "") {
      board[boxIndex] = mark;
    };
  };

  let changeMark = () => {
    if (mark == "X") {
      mark = "O";
    } else {
      mark = "X";
    };
  };

  return{board, displayBoard, clearBoard};

})();

// A player factory function

let player = (playerName) => {
  let name = playerName;

  let displayName = function() {
    let curPlayerDisplay = document.querySelector(".current-player");
    curPlayerDisplay.textContent = `Current Player: ${this.name}`;
  };

  return{name, displayName};
};

// A game module

let game = (() => {
  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let winner = "";

  let play = () => {
    player1 = player(window.prompt("Please enter name for player one:", "Player one"));
    player2 = player(window.prompt("Please enter name for player two:", "Player two"));
    currentPlayer = player1;
    currentPlayer.displayName();
  };

  let prevBoardMarkCount = 0;
  let curBoardMarkCount = 0;

  let updateBoardMarkCount = () => {
    prevBoardMarkCount = curBoardMarkCount;
    curBoardMarkCount = gameBoard.board.filter(item => item != "").length;
  };

  let updatePlayer = () => {
    if (curBoardMarkCount > prevBoardMarkCount) {
      if (currentPlayer == player1) {
        currentPlayer = player2;
        currentPlayer.displayName();
      } else {
        currentPlayer = player1;
        currentPlayer.displayName();
      };
    };
  };

  let displayWinner = function(player) {
    winner = player.name;
    gameBoard.winner = player.name;
    let modal = document.querySelector(".modal");
    let modalWinnerName = document.querySelector(".modal-player");
    modalWinnerName.textContent = winner;
    modal.style.display = "block";
  };

  window.addEventListener("click", (e) => {
    let modal = document.querySelector(".modal");
    if(e.target == modal) {
      modal.style.display = "none"
      gameBoard.clearBoard();
    };
  });

  let checkWinner = function(board) {

    // This loop increments by 3 twice to check for complete rows

    for (let i = 0; i <= 6; i += 3) {
      if (board[i] == board[i + 1] && 
          board[i + 1] == board[i + 2] &&
          board[i] != "") {
        displayWinner(currentPlayer);
      };
    };

    // This loop increments by 1 twice to check for complete columns

    for (let i = 0; i <= 2; i++) {
      if (board[i] == board[i + 3] && 
          board[i + 3] == board[i + 6] &&
          board[i] != "") {
        displayWinner(currentPlayer);
      };
    };

    // These two statements checks for complete diagonals

    if (board[0] == board[4] && 
        board[4] == board[8] &&
        board[0] != "") {
      displayWinner(currentPlayer);
    };

    if (board[2] == board[4] && 
        board[4] == board[6] &&
        board[2] != "") {
      displayWinner(currentPlayer);
    };
  };

  let boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      if (currentPlayer != "") {
        updateBoardMarkCount();
        checkWinner(gameBoard.board);
        updatePlayer();
      };
    });
  });

  let newGameBtn = document.querySelector(".start-game");
  newGameBtn.addEventListener("click", () => {
    gameBoard.clearBoard();
    play();
  });
})();


