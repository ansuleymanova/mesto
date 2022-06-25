export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleMouseClose = this._handleMouseClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._iconClose = this._popup.querySelector('.popup__close-icon');
        this._buttonSave = this._popup.querySelector('.popup__save-button');
    }

    open() {
        document.addEventListener('keydown',  this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
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

    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSave.textContent = 'Сохранение...';
        } else {
            this._buttonSave.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        this._iconClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', this._handleMouseClose);
    }
}