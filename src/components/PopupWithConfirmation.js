import { Popup } from "./Popup"

export class PopupWithConfirmation extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form');
        this.handleSubmit = handleSubmit;
    }

    openPopup() {
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleSubmit(_id);
        })
    }
}