const canvasId = 'main-canvas';
const canvas = document.getElementById(canvasId);
const startBtn = document.getElementById("start-btn");

const startPanel = document.getElementById("start-panel");

const gameOverPanel = document.getElementById("game-over-panel");
const restartBtn = document.getElementById("restart-btn");

const scoreElement = document.getElementById("score");
const timeElapsed = document.getElementById("time");


const game = new Game(canvasId);

function showStartPanel() {
  startBtn.style.display = "block";
  canvas.style.display = "none";
  gameOverPanel.style.display = "none";
  
}

function showGame() {
  startPanel.style.display = "none";
  gameOverPanel.style.display = "none";
  canvas.style.display = "block"
}

function showGameOverPanel() {
  restartBtn.style.display = "block";
  canvas.style.display = "none";
  startPanel.style.display = "none";
}

restartBtn.onclick = () => {
  game.resetGame();
  showGame();  
  game.start();
}


window.addEventListener('keydown', (event) => game.onKeyDown(event));
window.addEventListener('keyup', (event) => game.onKeyUp(event));

 startBtn.onclick = () => {
    showGame();  
    game.start();
  };

  showStartPanel();



