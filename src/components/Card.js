export default class Card {

    constructor({ item, templateSelector, handleCardClick, handleCardDelete, handleCardLike }) {
        this._likesN = item.likes;
        this.cardId = item.cardId;
        this._isOwner = item.isOwner;
        this._templateSelector = templateSelector;
        this._element = this._getTemplate();
        this._link = item.link;
        this._name = item.name;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._likes = this._element.querySelector('.element__likes')
        this._buttonLike = this._element.querySelector('.element__like-button');
        this._buttonDelete = this._element.querySelector('.element__delete-button');
        this._cardImage = this._element.querySelector('.element__picture');
        this._isLiked = item.isLiked;
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

    _likeCard() {
        this._buttonLike.classList.toggle('element__like-button_active');
        if (this._isLiked) {
            this._likesN -= 1;
        } else {
            this._likesN += 1;
        }
        this._isLiked = !this._isLiked;
        this._likes.textContent = this._likesN;
        this._handleCardLike(this.cardId);
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleImagePopup());
        this._buttonLike.addEventListener('click', () => this._likeCard());
        if (this._isOwner) {
            this._buttonDelete.addEventListener('click', (evt) => this._handleCardDelete(evt));
        }
    }

    createCard() {
        this._element.querySelector('.element__heading').textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);
        this._likes.textContent = this._likesN;
        if (this._isLiked) {
            this._buttonLike.classList.add('element__like-button_active');
        }
        if (this._isOwner) {
            this._buttonDelete.classList.add('element__delete-button_visible');
        }
        this._setEventListeners();
        return this._element;
    }
}