export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        //обработчик для закрытия по esc
        document.body.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          };
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup()
        }
        if (evt.target.classList.contains('popup__close')) {
            this.closePopup()
        }
        });
    }
}