import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handler, popupSelector }) {
        super(popupSelector);
        this._handler = handler;
        this._handler = this._handler.bind(this);
        this.input = this._getInputValues();
    }

    _getInputValues() {
        this._form = this._popup.querySelector('.popup__container');
        return Array.from(this._form.querySelectorAll('.popup__field'));
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handler);
    }

    close(evt) {
        this._form.reset();
        super.close();
    }
}