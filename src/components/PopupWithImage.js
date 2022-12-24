import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupFullscreenImg = this._popupSelector.querySelector('.popup__fullscreen-image');
        this._popupFullscrImgCaption = this._popupSelector.querySelector('.popup__description');
    }

    openPopup({name, link}) {
        this._popupFullscreenImg.src = link;
        this._popupFullscreenImg.alt = name;
        this._popupFullscrImgCaption.textContent = name;
        super.openPopup();
    }
}