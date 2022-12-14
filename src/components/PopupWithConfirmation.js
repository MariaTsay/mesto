import { Popup } from "./Popup"

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    openPopup(onSubmit) {
        super.openPopup();
        this.handleSubmit = onSubmit;
    }

    closePopup() {
        super.closePopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })
    }
}