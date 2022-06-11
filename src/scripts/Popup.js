export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleMouseClose = this._handleMouseClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mouseup', this._handleMouseClose);
        this._popup.classList.remove('popup_opened');
    }

    _handleMouseClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._iconClose = this._popup.querySelector('.popup__close-icon');
        this._iconClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._handleMouseClose);
        document.addEventListener('keydown',  this._handleEscClose);
    }
}