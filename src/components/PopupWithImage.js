import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeUp = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption')
    }

    open(item) {
        this._closeUp.setAttribute('src', item.link);
        this._closeUp.setAttribute('alt', item.name);
        this._caption.textContent = item.name;
        super.open()
    }
}