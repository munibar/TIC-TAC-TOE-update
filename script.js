document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  const turnElement = document.getElementById("turn");
  const resultElement = document.getElementById("result");
  const retryButton = document.getElementById("retry");
  const cells = [];
  let currentPlayer = "X";
  let gameFinished = false;

  // Create the Tic Tac Toe board
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", cellClickHandler);
      boardElement.appendChild(cell);
      cells.push(cell);
    }
  }

  // Cell click handler
  function cellClickHandler() {
    if (!gameFinished && this.innerText === "") {
      this.innerText = currentPlayer;
      if (checkWinner()) {
        announceWinner();
      } else if (checkDraw()) {
        announceDraw();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateTurnText();
      }
    }
  }

  // Check if there is a winner
  function checkWinner() {
    const winningCombinations = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a[0] * 3 + a[1]].innerText === currentPlayer &&
        cells[b[0] * 3 + b[1]].innerText === currentPlayer &&
        cells[c[0] * 3 + c[1]].innerText === currentPlayer
      ) {
        return combination;
      }
    }

    return null;
  }

  // Check if it's a draw
  function checkDraw() {
    return cells.every((cell) => cell.innerText !== "");
  }

  // Announce the winner
  function announceWinner() {
    gameFinished = true;
    const winningCombination = getWinningCombination();
    if (winningCombination) {
      resultElement.innerHTML = `Player ${currentPlayer} wins!`;
      highlightWinningCombination(winningCombination);
    }
    showRetryButton();
  }

  // Announce a draw
  function announceDraw() {
    gameFinished = true;
    resultElement.textContent = "It's a draw!";
    showRetryButton();
  }

  // Get the winning combination
  function getWinningCombination() {
    const winningCombinations = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a[0] * 3 + a[1]].innerText === currentPlayer &&
        cells[b[0] * 3 + b[1]].innerText === currentPlayer &&
        cells[c[0] * 3 + c[1]].innerText === currentPlayer
      ) {
        return combination;
      }
    }

    return null;
  }

  // Highlight the winning combination
  function highlightWinningCombination(winningCombination) {
    for (const [row, col] of winningCombination) {
      const index = row * 3 + col;
      cells[index].classList.add("winning-cell");
    }
  }

  // Update the turn text
  function updateTurnText() {
    turnElement.textContent = `Current Turn: ${currentPlayer}`;
  }

  // Show the Retry button
  function showRetryButton() {
    retryButton.style.display = "block";
  }

  // Hide the Retry button
  function hideRetryButton() {
    retryButton.style.display = "none";
  }

  // Restart the game
  window.restartGame = function () {
    cells.forEach((cell) => {
      cell.innerText = "";
      cell.classList.remove("winning-cell");
    });
    currentPlayer = "X";
    gameFinished = false;
    resultElement.textContent = "";
    updateTurnText();
    hideRetryButton();
  };

  // Initial turn text
  updateTurnText();
  hideRetryButton();
});
