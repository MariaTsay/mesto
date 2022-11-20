export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__text_type_error',
    spanErrorClass: 'popup__error_visible'
};

export class FormValidator {
    config;
    formElement;
    inputElement;
    errorElement;
    buttonElement;
    inputList;

    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;

        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._spanErrorClass = config.spanErrorClass;
    }

    //показывает ошибку при вводе инпута
    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add('popup__text_type_error');
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add('popup__error_visible');
    }

    //убирает ошибку
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove('popup__text_type_error');
        this._errorElement.classList.remove('popup__error_visible');
        this._errorElement.textContent = '';
    }

    //неактивная кнопка
    disableButton() {
        this._buttonElement.classList.add('popup__submit-btn_disabled');
        this._buttonElement.disabled = true;
    }

    //активная кнопка
    _enableButton() {
        this._buttonElement.classList.remove('popup__submit-btn_disabled');
        this._buttonElement.disabled = false;
    }

    //переключатель кнопки
    _toggleButtonState() {
        // проверка на валидность каждого поля инпут
        if (this._hasInvalidInput(this._inputList)) {
            this.disableButton(this._config, this.buttonElement);
        } else {
            this._enableButton(this._config, this.buttonElement);
        }
    }

    //проверка на невалидность инпута
    _hasInvalidInput() {
            return this._inputList.some((inputElement) => {
                return !inputElement.validity.valid;
            })
    }

    //проверка валидации инпута
    _checkInputValidity(inputElement) {


        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(inputElement, inputElement.validationMessage);
          } else {
            // Если проходит, скроем
            this._hideInputError(inputElement);
          }
    }

    //навешивание слушателей
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__text'));
        this._buttonElement = this._formElement.querySelector('.popup__submit-btn');
      
        this._toggleButtonState();
      
        this._inputList.forEach((inputElement) => {
          // каждому полю добавим обработчик события input
          inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем проверку всех полей на валидность,
            // передав ей форму и проверяемый элемент
            this._checkInputValidity(inputElement);
      
            this._toggleButtonState();
          });
        });
    }

    enableValidation() {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        this.formList = Array.from(document.querySelectorAll('.popup__form'));

        // Переберём полученную коллекцию
        this.formList.forEach((formElement) => {
            // Для каждой формы вызовем функцию setEventListeners
            this._setEventListeners(this._config, formElement);
        });
 
    
    }

}
