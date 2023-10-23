const startEl = document.getElementById("start");
const gameEl = document.getElementById("game");
const timeEl = document.getElementById("time");
const timeHeaderEl = document.getElementById("time-header");
const resultHeaderEl = document.getElementById("result-header");
const gameTimeEl = document.getElementById("game-time");
const resultEl = document.getElementById("result");
let score = 0;

console.log(resultEl);

startEl.addEventListener("click", startGame);
gameEl.addEventListener("click", handleBox);
gameTimeEl.addEventListener("input", setGameTime);

let interval;

function TimerListner() {
  let gameTime = +timeEl.innerText;

  if (gameTime <= 0) {
    clearInterval(interval);
    endGame();
  } else {
    timeEl.innerText = (gameTime - 0.1).toFixed(1);
  }
}

function startGame() {
  setGameTime();
  score = 0;
  startEl.classList.toggle("hide");
  gameEl.style.background = "green";
  gameTimeEl.setAttribute("disabled", true);

  let gameTime = +timeEl.innerText;
  interval = setInterval(TimerListner, 100);
  renderBox();
}

function endGame() {
  startEl.classList.toggle("hide");
  gameEl.style.background = "#ccc";
  gameTimeEl.removeAttribute("disabled");
  gameEl.innerHTML = "";
  resultEl.innerText = score;
  resultHeaderEl.classList.toggle("hide");
  timeHeaderEl.classList.toggle("hide");
}

function renderBox() {
  gameEl.innerHTML = "";
  let box = document.createElement("div");
  let boxSize = getRandom(30, 200);
  let gameZone = gameEl.getBoundingClientRect();

  let maxLeft = gameZone.width - boxSize;
  let maxTop = gameZone.height - boxSize;

  box.style.width = box.style.height = boxSize + "px";
  box.style.background = "#000";
  box.style.cursor = "pointer";
  box.style.position = "absolute";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.top = getRandom(0, maxTop) + "px";

  box.id = "check";
  gameEl.appendChild(box);
}

function handleBox(event) {
  if (event.target.id === "check") {
    score++;
    renderBox();
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setGameTime() {
  let timeGame = +gameTimeEl.value;
  timeEl.innerText = timeGame.toFixed(1);

  resultHeaderEl.classList.add("hide");
  timeHeaderEl.classList.remove("hide");
}
