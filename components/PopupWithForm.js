import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._popupForm = document.querySelector('.popup__form');
        this._inputList = document.querySelectorAll('.popup__text');
    }

    _getInputValues() {
        this._formInputValues = {}
        this._inputList.forEach(input => {
            return this._formInputValues[input.name] = input.value
        });
            
        return this._formInputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }
}