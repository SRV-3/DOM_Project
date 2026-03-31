function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const allFullElems = document.querySelectorAll(".fullElem");
  const allBackButtons = document.querySelectorAll(".back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "block";
    });
  });

  allBackButtons.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  const form = document.querySelector(".addTask form");
  const taskInput = document.querySelector(".addTask form #task");
  const taskDetailsInput = document.querySelector(".addTask textarea");
  const taskCheck = document.querySelector(".addTask form #check");

  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTask() {
    const allTAsk = document.querySelector(".allTask");
    let task = "";
    currentTask.forEach((elem, idx) => {
      task =
        task +
        `<div class="task">
              <h5>${elem.task}<span class="${elem.imp}">imp</span></h5>
              <button id="${idx}">Mark as done</button>
            </div>`;
    });
    allTAsk.innerHTML = task;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheck.checked,
    });

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheck.checked = false;

    renderTask();
  });
}

todoList();

function dailyPlaner() {
  const dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  const dayPlan = document.querySelector(".day-planner");

  const hours = Array.from({ length: 18 }, (elem, idx) => {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  let days = "";
  hours.forEach((elem, idx) => {
    const savedData = dayPlanData[idx] || "";
    days =
      days +
      ` <div class="day-planner-time">
            <p>${elem}</p>
            <input id="${idx}"  type="text" placeholder="..." value="${savedData}" />
          </div>`;
  });

  dayPlan.innerHTML = days;
  const dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlaner();

function motivationalQuote() {
  const quote = document.querySelector(".motivation-2 h1");
  async function fetchQuote() {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quote.innerHTML = data.quote;
  }
  fetchQuote();
}

motivationalQuote();

const timer = document.querySelector(".pomo-timer h1");
const start = document.querySelector(".pomo-timer .start");
const pause = document.querySelector(".pomo-timer .pause");
const reset = document.querySelector(".pomo-timer .reset");
let timerInterval = null;
let totalSeconds = 1500;
let isWorksession = true;

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);
  if (isWorksession) {
    totalSeconds = 1500;
    timerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(timerInterval);
        isWorksession = false;
        totalSeconds = 300;
      }
      updateTimer();
    }, 1000);
  } else {
    timerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(timerInterval);
        isWorksession = true;
        totalSeconds = 1500;
      }
      updateTimer();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  totalSeconds = 1500;
  clearInterval(timerInterval);
  updateTimer();
}

start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);
