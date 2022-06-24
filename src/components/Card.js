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

    constructor({ item, templateSelector, handleCardClick, handleCardDelete }) {
        this._cardId = item.cardId;
        this._isOwner = item.isOwner;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._link = item.link;
        this._name = item.name;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
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

    _deleteCard() {
        this._element.remove();
        this._element = null;
        this._handleCardDelete(this._cardId);
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleImagePopup());
        this._buttonLike.addEventListener('click', () => this._handleLikeCard());
        if (this._isOwner) {
            this._buttonDelete.addEventListener('click', () => this._deleteCard());
        }
    }

    createCard() {
        this._element.querySelector('.element__heading').textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);
        if (this._isOwner) {
            this._buttonDelete.classList.add('element__delete-button_visible');
        }
        this._setEventListeners();
        return this._element;
    }
}