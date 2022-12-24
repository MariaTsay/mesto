import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupSelector.querySelectorAll('.popup__text');
        this._submitButton = this._popupSelector.querySelector('.popup__submit-btn');
        this._submitButtonTextContent = this._submitButton.textContent;
    }

    _getInputValues() {
        this._formInputValues = {}
        this._inputList.forEach(input => {
            return this._formInputValues[input.name] = input.value
        });
            
        return this._formInputValues;
    }

    renderLoading(isLoading, text) {
        if(isLoading) {
            this._submitButton.textContent = text; 
        } else {
            this._submitButton.textContent = this._submitButtonTextContent;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', async (evt) => {
            evt.preventDefault();
            try {
                this.renderLoading(true, 'Сохранение...');
                await this.handleFormSubmit(this._getInputValues());
            } finally {
                this.renderLoading(false);
            }
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }
}