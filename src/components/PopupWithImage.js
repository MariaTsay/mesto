import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    popup;
    name;
    link;

    constructor(popup) {
        super(popup);
        this._photoPopup = document.querySelector('.popup_type_photo');
        this._popupFullscreenImg = document.querySelector('.popup__fullscreen-image');
        this._popupFullscrImgCaption = document.querySelector('.popup__description');
    }

    openPopup({name, link}) {
        this._popupFullscreenImg.src = link;
        this._popupFullscreenImg.alt = name;
        this._popupFullscrImgCaption.textContent = name;
        super.openPopup();
    }
}