import { openModalWindow } from './modalWindowHandlers.js'

export default class Card {
    _templateSelector;
    _link;
    _name;
    _element;
    _buttonLike;
    _buttonDelete;
    _cardImage;
    _popupCloseup;
    _popupCloseupImage;
    _popupCloseupCaption;

    constructor({ item, templateSelector, handleCardClick }) {
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._link = item.link;
        this._name = item.name;
        this._handleCardClick = handleCardClick;
        this._buttonLike = this._element.querySelector('.element__like-button');
        this._buttonDelete = this._element.querySelector('.element__delete-button');
        this._cardImage = this._element.querySelector('.element__picture');
        this._popupCloseup = document.querySelector('.popup_type_closeup');
        this._popupCloseupImage = this._popupCloseup.querySelector('.popup__image');
        this._popupCloseupCaption = this._popupCloseup.querySelector('.popup__caption');
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _handleImagePopup() {
        this._handleCardClick(this._link, this._name);
    }

    _handleLikeCard() {
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleImagePopup());
        this._buttonLike.addEventListener('click', () => this._handleLikeCard());
        this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
    }

    createCard() {
        this._element.querySelector('.element__heading').textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);
        this._setEventListeners();
        return this._element;
    }
}