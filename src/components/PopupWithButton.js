import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
    constructor({ handler, popupSelector }) {
        super(popupSelector);
        this._card = '';
        this._handler = handler;
        this._handler = this._handler.bind(this);
        this._form = this._popup.querySelector('.popup__container');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._handler(evt, this._card));
    }

    open(card) {
        this._card = card;
        super.open();
    }
}