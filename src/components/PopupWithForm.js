import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handler, popupSelector }) {
        super(popupSelector);
        this._handler = handler;
        this._handler = this._handler.bind(this);
        this._form = this._popup.querySelector('.popup__container');
        this._inputList = this._form.querySelectorAll('.popup__field')
    }

    _getInputValues() {
        this._formFields = {};
        this._inputList.forEach(input => this._formFields[input.name] = input.value);
        return this._formFields;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._handler(evt, this._getInputValues()));
    }

    close(evt) {
        this._form.reset();
        super.close();
    }
}