const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragend", dragEnd);
});

containers.forEach(container => {
  container.addEventListener("dragover", dragOver);
});

function dragStart() {
  this.classList.add("dragging");
}

function dragOver(e) {

  const beingDragged = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(this, e.clientY);
  if (afterElement === null) {
    this.appendChild(beingDragged);
  } else {
    this.insertBefore(beingDragged, afterElement);
  }
}

function dragEnd() {
  this.classList.remove("dragging");
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    console.log(closest, child);
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}