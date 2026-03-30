const allElems = document.querySelectorAll(".elem");
const allFullElems = document.querySelectorAll(".fullElem");
const back = document.querySelectorAll(".back");

allElems.forEach((elem) => {
  elem.addEventListener("click", () => {
    allFullElems[elem.id].style.display = "block";
  });
});

back.forEach((elem) => {
  elem.addEventListener("click", () => {
    allFullElems[elem.id].style.display = "none";
  });
});
