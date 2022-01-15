// A gameboard object
let gameBoard = (() => {

  let board = ["","","","","","","","",""];

  let boxes = document.querySelectorAll(".box");

  let mark = "X"

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
  };

  boxes.forEach(box => {
    box.addEventListener("click", (e) => {
      storeMark(e.target.dataset.index);
      displayBoard();
      changeMark();
    })
  })

  let storeMark = (boxIndex) => {
    board[boxIndex] = mark;
  }

  let changeMark = () => {
    if (mark == "X") {
      mark = "O";
    } else {
      mark = "X";
    }
  }

  return{board, displayBoard};

})();

// A player object
let player = (playerName) => {
  let name = playerName;

  let displayName = function() {
    let curPlayerDisplay = document.querySelector(".current-player");
    curPlayerDisplay.textContent = `Current Player: ${this.name}`;
  };

  return{name, displayName};
};

let game = (() => {
  let player1 = "";
  let player2 = "";
  let currentPlayer = "";

  let play = (firstPlayer, secondPlayer) => {
    player1 = firstPlayer;
    player2 = secondPlayer;
    currentPlayer = player1;
    currentPlayer.displayName();
  }

  let updatePlayer = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
      currentPlayer.displayName();
    } else {
      currentPlayer = player1;
      currentPlayer.displayName();
    }
  }

  let displayWinner = function(player) {
    let winner = player.name;
    alert(`The winner is ${winner}`);
  };

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
      checkWinner(gameBoard.board);
      updatePlayer();
    })
  })

  let newGameBtn = document.querySelector(".start-game");
  newGameBtn.addEventListener("click", () => {
    play(player("Lib"), player("Joshua"));
  });
})();


