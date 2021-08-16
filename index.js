const popup = document.querySelector(".popup");

const inputFormAddTask = document.querySelectorAll(".form__input-task");
const textareaFormAddTask = document.querySelector(".form__input-note");
const openPopupButton = document.querySelector(".add-task__button");
const closePopupButton = document.querySelector(".popup__close");
const formSubmitButton = document.querySelector(".form__submit-btn");
const taskList = document.querySelector(".todo__list");
const taskBody = document.querySelector(".task-card__template");
let taskRemove = document.querySelectorAll(".todo-item .todo-item__remove-btn");
const form = document.querySelector('#addTask');

function disabledSubmitButton() {
  formSubmitButton.setAttribute("disabled", "true");
}

function removeBtnActive() {
  taskRemove = document.querySelectorAll(".todo-item .todo-item__remove-btn");
  taskRemove.forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.parentElement.remove()
    });
  });
}

function clearForm(form) {
  form.querySelector(".form__input-task").value = "";
  form.querySelector(".form__input-note").value = "";
}

// Open and Close popup
function removePopup() {
  popup.classList.remove("popup_active");
  clearForm(popup.querySelector('form'));

  const formError = document.querySelectorAll('.error')
  formError.forEach( function (element) {
    element.remove();
  })
}

openPopupButton.addEventListener("click", function () {
  popup.classList.add("popup_active");
});
closePopupButton.addEventListener("click", function () {
  removePopup();
});
popup.addEventListener("click", function (elem) {
  if (!!elem.target.querySelector(".popup__content")) {
    removePopup();
  }
});

window.addEventListener("keydown", function (e) {
  if (popup.classList.contains("popup_active")) {
    if (e.key === 'Escape') {
      removePopup();
    }
  }
});

// Form Input
textareaFormAddTask.addEventListener('input', function () {
  if (this.scrollTop > 0) {
    this.style.height = this.scrollHeight + "px";
  }
});

inputFormAddTask.forEach(function (element) {
  element.addEventListener("input", function () {
    if (element.value.length >= 5) {
      formSubmitButton.removeAttribute("disabled");
    } else {
      disabledSubmitButton();
    }
  });

  if (element.required) {
    const requiredCE = document.createElement("span");
    requiredCE.classList.add("form__required");
    requiredCE.prepend("*");
    element.parentElement.querySelector('label').append(requiredCE);
  }

  element.addEventListener('blur', function () {
    const elementError = element.parentElement.querySelector('.error');
    if (element.value.length < 5 && !elementError) {
      let errorCE = document.createElement('div');
      errorCE.classList.add('error');
      errorCE.append("Минимальное значение длинны названия задачи - 5 символов");
      element.parentElement.append(errorCE);
    }
    if (element.value.length >= 5 && elementError) {
      elementError.remove();
    }
  });
});

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const addChild = taskBody.content.cloneNode(true);
  let input = form.querySelector(".form__input-task").value;
  let textarea = form.querySelector(".form__input-note").value;

  addChild.querySelector('.todo-item__title').prepend(input);
  addChild.querySelector('.todo-item__subtitle').prepend(textarea);

  if (!!textarea === false) {
    addChild.querySelector('.todo-item__title').style.margin = "auto";
    addChild.querySelector('.todo-item__subtitle').remove();
  }

  taskList.append(addChild);

  clearForm(form);
  disabledSubmitButton();
  removeBtnActive();
});

let observer = new MutationObserver(function () {
  if (taskList.querySelector('.todo-item')) {
    taskList.style.display = "flex";
    document.querySelector('.todo__subtitle').style.display = "none";
  } else {
    taskList.style.display = "none";
    document.querySelector('.todo__subtitle').style.display = "block";
  }
});

observer.observe(taskList, {childList: true});