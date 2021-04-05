const inputContainer = document.getElementById("input-container");
const TaymerForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("data-picker");

const timerEl = document.getElementById("countdown");
const timerElTitle = document.getElementById("countdown-title");
const timerBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let timerTitle = "";
let timerDate = "";
let timerValue = new Date();
let timerAktiv;
let savedtimer;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const [today] = new Date().toISOString().split("T");
dateEl.setAttribute("min", today);

function updateDOM() {
  timerAktiv = setInterval(() => {
    const now = new Date().getTime();
    const distance = timerValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if(distance < 0) {
      timerEl.hidden = true;
      clearInterval(timerAktiv);
      completeInfo.textContent = `${timerTitle} ${timerDate} da tugadi`;
      completeEl.hidden = false
    } else{
      timerElTitle.textContent = `${timerTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      timerEl.hidden = false;
    }
  }, second);
}

function updateTimer(e) {
  e.preventDefault();
  timerTitle = e.srcElement[0].value || `Noma'lum taymer`;
  timerDate = e.srcElement[1].value;
  savedtimer = {
    title: timerTitle,
    date: timerDate
  }

  localStorage.setItem('timer', JSON.stringify(savedtimer))

  if (timerDate === "") {
    alert("Iltimos taymerga vaqt tanlang");
  } else {
    timerValue = new Date(timerDate).getTime();
    updateDOM();
  }
}

function reset() {
  timerEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  clearInterval(timerAktiv);
  timerDate = "";
  timerTitle = "";
  localStorage.removeItem('timer')
}

function restoreTimer() {
  if(localStorage.getItem('timer')){
    savedtimer = JSON.parse(localStorage.getItem('timer'))
    timerTitle = savedtimer.title;
    inputContainer.hidden = false;
    timerDate = savedtimer.date;
    timerValue = new Date(timerDate).getTime();
    updateDOM()
  }
}

TaymerForm.addEventListener("submit", updateTimer);
timerBtn.addEventListener("click", reset);
completeBtn.addEventListener('click', reset);

restoreTimer();
