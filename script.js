const playBtn = document.getElementById("playBtn");
const homeDiv = document.getElementById("homeDiv");
const gameDiv = document.getElementById("gameDiv");
const soundCheck = document.getElementById("sound");
const flagImage = document.getElementById("flag");
const optionsContainer = document.getElementById("options");
const highscoreElement = document.getElementById("highscore");
const scoreElement = document.getElementById("score");

let enableSound = false;
let fwc = [];
let random;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

const correctAudio = new Audio("./sounds/correct.mp3");
const incorrectAudio = new Audio("./sounds/incorrect.mp3");

highscoreElement.textContent = highscore;

playBtn.addEventListener("click", () => {
  homeDiv.style.display = "none";
  gameDiv.style.display = "block";
  getFlags();
});

soundCheck.addEventListener("change", () => {
  enableSound = soundCheck.checked;
});

function updateScore() {
  score = Math.max(0, score);
  scoreElement.textContent = score;
}

function getFlags() {
  optionsContainer.innerHTML = "";
  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
      fwc = data.map(item => ({ country: item.name.common, flag: item.flags.png }));
      random = Math.floor(Math.random() * fwc.length);
      flagImage.src = fwc[random].flag;

      const optionsArr = Array.from({ length: 4 }, () => {
        const randomOpt = Math.floor(Math.random() * fwc.length);
        return fwc[randomOpt].country;
      });

      optionsArr[Math.floor(Math.random() * optionsArr.length)] = fwc[random].country;

      optionsArr.forEach(option => {
        const optionEl = document.createElement("button");
        optionEl.classList.add("optionsEl");
        optionEl.innerText = option;
        optionsContainer.appendChild(optionEl);
        optionEl.addEventListener("click", () => handleClick(option, optionEl));
      });
    });
}

function playSound(audio) {
  audio.paused ? audio.play() : (audio.currentTime = 0);
}

function handleClick(option, optionEl) {
  if (option === fwc[random].country) {
    if (enableSound) playSound(correctAudio);
    optionEl.style.border = "4px solid green";
    score += 20;
    updateScore();
    setTimeout(() => {
      optionsContainer.innerHTML = "";
      getFlags();
    }, 1000);
  } else {
    if (enableSound) playSound(incorrectAudio);
    optionEl.style.border = "4px solid red";
    optionEl.classList.add("animate-error");
    score -= 20;
    updateScore();
  }

  if (highscore < score) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
    highscoreElement.textContent = highscore;
  }
}
