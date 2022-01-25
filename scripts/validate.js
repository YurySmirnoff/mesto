//************************ Глобальные переменные ********************
// настройки валидации
const validationParameters = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-message_visible",
};

//************************ Функции и обработчики событий **************
//убрать отображение ошибки в поле ввода
function hideInputError(form, inputElement, errorElement) {
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.errorClass);
  errorElement.textContent = "";
}

//отображение ошибки в поле ввода
function showInputError(form, inputElement, errorElement) {
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationParameters.errorClass);
}

//функция изменения состояния кнопки
function toggleButtonSubmit(form) {
  const inputList = Array.from(
    form.querySelectorAll(validationParameters.inputSelector)
  );
  const submitButton = form.querySelector(
    validationParameters.submitButtonSelector
  );
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    submitButton.classList.remove(validationParameters.inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add(validationParameters.inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  }
}

//валидация поля ввода
function validateInput(form, inputElement) {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    //скрываем ошибку
    hideInputError(form, inputElement, errorElement);
  } else {
    //отображаем  ошибку
    showInputError(form, inputElement, errorElement);
  }
  toggleButtonSubmit(form, validationParameters);
}

//отправка формы
function submitForm(event) {
  event.preventDefault();
}

//функция создания "слушателей" для inputs отдельной формы
function createInputListeners(form, inputsList) {
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      //проверка валидности поля ввода
      validateInput(form, inputElement);
    });
  });
}

// функция включения все настройки передаются при вызове
function enableValidation(validationParameters) {
  const forms = document.querySelectorAll(validationParameters.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", submitForm);
    //получаем список полей ввода формы
    const inputsList = form.querySelectorAll(
      validationParameters.inputSelector
    );
    //подключаем к полям ввода "слушателей"
    createInputListeners(form, inputsList);
    toggleButtonSubmit(form);
  });
}

//******************* Инициализация/начало выполнения валидации *****************
//включение валидации в соответствии с настройками
enableValidation(validationParameters);
