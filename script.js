var fwc = [{}];
let random;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").textContent = highscore;

function updatescore() {
  score < 0
    ? (score = 0)
    : (document.getElementById("score").innerText = score);
}

function getFlags() {
  let optionsArr = [];
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fwc.push({ country: data[i].name.common, flag: data[i].flags.png });
      }
      random = Math.floor(Math.random() * fwc.length + 1);
      document.getElementById("flag").src = fwc[random].flag;
      for (let i = 1; i <= 4; i++) {
        let randomOpt = Math.floor(Math.random() * fwc.length + 1);
        optionsArr.push(fwc[randomOpt].country);
      }
      optionsArr[Math.floor(Math.random() * optionsArr.length)] =
        fwc[random].country;

      optionsArr.forEach((options) => {
        const optionEl = document.createElement("button");
        optionEl.classList.add("optionsEl");
        optionEl.innerText = options;
        document.getElementById("options").appendChild(optionEl);
        optionEl.addEventListener("click", () => {
          handleClick(options, optionEl);
        });
      });
    });
}

getFlags();
function handleClick(options, optionEl) {
  if (options == fwc[random].country) {
    optionEl.style.border = "4px solid green";

    score += 20;
    updatescore();
    setTimeout(() => {
      document.getElementById("options").innerHTML = null;
      getFlags();
    }, 1000);
  } else {
    optionEl.style.border = "4px solid red";
    optionEl.classList.add("animate-error")
    score -= 20;
    updatescore();
  }

  if (highscore < score) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
    document.getElementById("highscore").textContent = highscore;
  }
}
