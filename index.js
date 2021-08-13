const popup = document.querySelector(".popup");
const inputFormAddTask = document.querySelector(".form__input input");
const textareaFormAddTask = document.querySelector(".form__textarea textarea");
const openPopupButton = document.querySelector(".add-task__button");
const closePopupButton = document.querySelector(".popup__close");
const formSubmitButton = document.querySelector('.form__submit-btn')

// Open and Close popup
openPopupButton.addEventListener("click", () => {
  popup.classList.add("popup_active");
});

closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup_active");
});

popup.addEventListener("click", function () {
  if (!!elem.target.querySelector(".popup__content")) {
    popup.classList.remove("popup_active");
  }
});

window.addEventListener("keydown", function (e){
  if (popup.classList.contains("popup_active")) {
    if (e.keyCode === 27) {
      popup.classList.remove("popup_active");
    }
  }
})
// Check form
inputFormAddTask.addEventListener("input", function () {
  if (inputFormAddTask.value !== "" && inputFormAddTask.value.length >= 5) {
    formSubmitButton.removeAttribute("disabled");
  }
});
textareaFormAddTask.addEventListener('onclick', function(){
  if(this.scrollTop > 0){
    this.style.height = this.scrollHeight + "px";
  }
});
