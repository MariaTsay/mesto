//показывает ошибку при вводе инпута
const showInputError = (config, formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.spanErrorClass);
};

//убирает ошибку
const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.spanErrorClass);
  errorElement.textContent = '';
};

//неактивная кнопка
const disableButton = (config, buttonElement) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

//активная кнопка
const enableButton = (config, buttonElement) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

//переключатель кнопки
const toggleButtonState = (config, inputList, buttonElement) => {
  // проверка на валидность каждого поля инпут
  if (hasInvalidInput(inputList)) {
    disableButton(config, buttonElement);
  } else {
    enableButton(config, buttonElement);
  }
};

//проверка валидации инпута
const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(config, formElement, inputElement);
  }
};

//проверка на невалидность инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//навешивание слушателей
const setEventListeners = (config, formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем проверку всех полей на валидность,
      // передав ей форму и проверяемый элемент
      checkInputValidity(config, formElement, inputElement);

      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners
    setEventListeners(config, formElement);
  });
};

// Вызов функции
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__text_type_error',
  spanErrorClass: 'popup__error_visible'
}); 