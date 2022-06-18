import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._closeUp = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption')
    }

    open(item) {
        this._link = item.link;
        this._name = item.name;
        this._closeUp.setAttribute('src', this._link);
        this._closeUp.setAttribute('alt', this._name);
        this._caption.textContent = this._name;
        super.open()
    }
}