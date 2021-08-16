const popup = document.querySelector(".popup");
const inputFormAddTask = document.querySelectorAll(".form__input input");
const textareaFormAddTask = document.querySelector(".form__textarea textarea");
const openPopupButton = document.querySelector(".add-task__button");
const closePopupButton = document.querySelector(".popup__close");
const formSubmitButton = document.querySelector(".form__submit-btn");
const taskList = document.querySelector(".todo__list");
const taskBody = document.querySelector(".template .todo-item");
let taskRemove = document.querySelectorAll(".todo-item .todo-item__remove-btn");

// Remove task
function removeBtnActive() {
  taskRemove = document.querySelectorAll(".todo-item .todo-item__remove-btn");
  taskRemove.forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.parentElement.remove()
    });
  });
}

// Open and Close popup
function removePopup() {
  popup.classList.remove("popup_active");
}

openPopupButton.addEventListener("click", () => {
  popup.classList.add("popup_active");
});
closePopupButton.addEventListener("click", () => {
  removePopup();
});
popup.addEventListener("click", (elem) => {
  if (!!elem.target.querySelector(".popup__content")) {
    removePopup();
  }
});
window.addEventListener("keydown", (e) => {
  if (popup.classList.contains("popup_active")) {
    if (e.keyCode === 27) {
      removePopup();
    }
  }
});

textareaFormAddTask.addEventListener('input', function () {
  if (this.scrollTop > 0) {
    this.style.height = this.scrollHeight + "px";
  }
});

inputFormAddTask.forEach((element, id) => {
  element.addEventListener("input", function () {
    if (element.value !== "" && element.value.length >= 5) {
      formSubmitButton.removeAttribute("disabled");
    }
  });
  if (element.required) {
    const requiredCE = document.createElement("span")
    requiredCE.classList.add("form__required")
    requiredCE.prepend("*")
    element.parentElement.querySelector('label').append(requiredCE)
  }
});

// Form submit
document.forms.addTask.onsubmit = function () {
  const addChild = taskBody.cloneNode(true);

  addChild.querySelector('.todo-item__title').prepend(this.taskTitle.value);
  addChild.querySelector('.todo-item__subtitle').prepend(this.taskSubtitle.value);
  taskList.append(addChild);

  this.taskTitle.value = "";
  this.taskSubtitle.value = "";

  formSubmitButton.setAttribute("disabled", "true");
  removeBtnActive();
  return false;
};

