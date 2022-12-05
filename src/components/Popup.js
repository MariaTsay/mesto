export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        //обработчик для закрытия по esc
        document.body.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          };
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup()
        }
        if (evt.target.classList.contains('popup__close')) {
            this.closePopup()
        }
        });
    }
}