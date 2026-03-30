const allElems = document.querySelectorAll(".elem");
const allFullElems = document.querySelectorAll(".fullElem");

allElems.forEach((elem) => {
  elem.addEventListener("click", () => {
    allFullElems[elem.id].style.display = "block";
  });
});
