import { openModalWindow } from './modalWindowHandlers.js'

export class Card {
    _templateSelector;
    _link;
    _name;
    _element;

    constructor(item, templateSelector) {
        this._templateSelector = templateSelector;
        this._link = item.link;
        this._name = item.name;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _setEventListeners() {
        const popupCloseup = document.querySelector('.popup_type_closeup');
        const buttonLike = this._element.querySelector('.element__like-button');
        const buttonDelete = this._element.querySelector('.element__delete-button');
        const cardImage = this._element.querySelector('.element__picture');
        const name = this._name;
        const link = this._link;
        cardImage.addEventListener('click', function() {
            openModalWindow(popupCloseup);
            const popupCloseupImage = popupCloseup.querySelector('.popup__image');
            const popupCloseupCaption = popupCloseup.querySelector('.popup__caption');
            popupCloseupImage.setAttribute('src', link);
            popupCloseupImage.setAttribute('alt', name);
            popupCloseupCaption.textContent = name;
        });
        buttonLike.addEventListener('click', function() {
            buttonLike.classList.toggle('element__like-button_active')
        });
        const self = this;
       buttonDelete.addEventListener('click', function() {
           self._element.remove();
           self._element = null;
        });
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__heading').textContent = this._name;
        this._cardImage = this._element.querySelector('.element__picture')
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);
        this._setEventListeners();
        return this._element;
    }
}