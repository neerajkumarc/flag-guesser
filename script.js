var fwc = [{}];
let random;
let score = 0;
function updatescore() {
  score < 0
    ? (score = 0)
    : (document.getElementById("score").innerHTML = score);
}

function getFlags() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fwc.push({ country: data[i].name.common, flag: data[i].flags.png });
      }
      random = Math.floor(Math.random() * fwc.length + 1);
      document.getElementById("flag").src = fwc[random].flag;
    });
}
getFlags();

function getUserInput() {
  let answer = fwc[random].country.toLowerCase();
  let userInput = document.getElementById("userInput").value.toLowerCase();
  isCorrect = userInput == answer;
  if (isCorrect) {
    score += 10;
    getFlags();
    document.getElementById("userInput").value = "";
    updatescore();
  }
  console.log(answer);
}
function skip() {
  score -= 10;
  getFlags();
  updatescore();
}

document
  .getElementById("userInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submitbtn").click();
    }
  });
