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
  }
  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheck.checked,
    });

    renderTask();

    location.reload();
  });

  const markCompletedBtn = document.querySelectorAll(".task button");

  markCompletedBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTask.splice(btn.id, 1);
      renderTask();
      location.reload();
    });
  });
}

todoList();
