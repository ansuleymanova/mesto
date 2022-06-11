const settings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__field_type_error'
}

import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import { initialCards } from './cards.js';

const buttonEditProfile = document.querySelector('.profile-area__edit-button');
const buttonAddCard = document.querySelector('.profile-area__add-button');
const popupCard = document.querySelector('.popup_type_card');
const formCard = popupCard.querySelector('.popup__container');
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = popupProfile.querySelector('.popup__container');
const popupCloseup = document.querySelector('.popup_type_closeup');
const buttonCloseCloseup = popupCloseup.querySelector('.popup__close-icon');

const userInfo = new UserInfo({
    nameSelector: '.profile-area__heading',
    bioSelector: '.profile-area__subheading'
});

const profileValidator = new FormValidator(settings, formProfile);
const cardValidator = new FormValidator(settings, formCard);

profileValidator.enableValidation();
cardValidator.enableValidation();

const section = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card({
                item: item,
                templateSelector: '#card',
                handleCardClick: () => {
                    popupCloseUpImage.open(item);
                }
            });
            const cardElement = card.createCard();
            section.addItem(cardElement)}
    },
    '.elements')

section.renderElements();

const popupCardForm = new PopupWithForm({
    handler: (evt) => {
        evt.preventDefault();
        const item = {
            name: popupCardForm.input[0].value,
            link: popupCardForm.input[1].value
        }
        const card = new Card({
            item: item,
            templateSelector: '#card',
            handleCardClick: () => {
                popupCloseUpImage.open(item);
            }
        });
        const cardElement = card.createCard();
        section.addItem(cardElement);
        cardValidator.resetErrors();
        popupCardForm.close();
    },
    popupSelector: '.popup_type_card'
});

const popupProfileForm = new PopupWithForm({
    handler: (evt) => {
        evt.preventDefault();
        userInfo.setUserInfo({
            name: popupProfileForm.input[0].value,
            bio: popupProfileForm.input[1].value
        });
        popupProfileForm.close();
    },
    popupSelector: '.popup_type_profile',
});

const popupProfileOpener = () => {
    const { name, bio } = userInfo.getUserInfo();
    popupProfileForm.input[0].value = name;
    popupProfileForm.input[1].value = bio;
    popupProfileForm.open()
}

const popupCloseUpImage = new PopupWithImage('.popup_type_closeup');

buttonEditProfile.addEventListener('click', popupProfileOpener);
buttonAddCard.addEventListener('click', () => popupCardForm.open());
buttonCloseCloseup.addEventListener('click', () => popupCloseUpImage.close());