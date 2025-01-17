let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let delay = Math.max(300, 1000 - level * 50); // Minimum delay is 300ms

  // Add a distracting flash every 5 levels
  if (level % 5 === 0) {
    setTimeout(() => {
      let randomBtn = document.querySelector(`.${btns[Math.floor(Math.random() * btns.length)]}`);
      gameFlash(randomBtn);
    }, 500);
  }

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  gameSeq.forEach((color, i) => {
    setTimeout(() => {
      let btn = document.querySelector(`.${color}`);
      gameFlash(btn);
    }, i * delay);
  });

  // Start a timer for user input
  startTimer();
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      clearTimeout(timer); // Stop the timer if the user completes the level
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

let timer;
function startTimer() {
  let timeLeft = 5 + Math.max(0, 10 - level); // Adjust time based on level
  h2.innerText += ` - Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    h2.innerText = `Level ${level} - Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  clearTimeout(timer);
  h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start again.`;
  document.querySelector("body").style.backgroundColor = "red";
  setTimeout(() => {
    document.querySelector("body").style.backgroundColor = "white";
  }, 150);
  reset();
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
