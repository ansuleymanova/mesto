const settings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__field_type_error'
}

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import { openModalWindow, closeModalWindow, clearErrors } from './modalWindowHandlers.js';

const buttonEditProfile = document.querySelector('.profile-area__edit-button');
const buttonAddCard = document.querySelector('.profile-area__add-button');
const popupCard = document.querySelector('.popup_type_card');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseup = document.querySelector('.popup_type_closeup');
const cardsContainer = document.querySelector('.elements');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-icon');
const buttonCloseCard = popupCard.querySelector('.popup__close-icon');
const buttonCloseCloseup = popupCloseup.querySelector('.popup__close-icon');
const profileInfo = document.querySelector('.profile-area__profile-info');
const heading = profileInfo.querySelector('.profile-area__heading');
const subheading = profileInfo.querySelector('.profile-area__subheading');
const nameField = document.querySelector('.popup__field_type_name');
const bioField = document.querySelector('.popup__field_type_bio');
const titleField = document.querySelector('.popup__field_type_title');
const linkField = document.querySelector('.popup__field_type_picture-link');
const profileForm = document.querySelector('.popup_type_profile');
const cardForm = document.querySelector('.popup_type_card');
const buttonSubmitCard = popupCard.querySelector('.popup__save-button');
const formList = Array.from(document.querySelectorAll('.popup__container'));

const renderCard = (item) => {
    const card = new Card(item, '#card');
    cardsContainer.prepend(card.createCard());
}

initialCards.forEach((item) => {
    renderCard(item);
});

formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
})

const handleCardSubmit = (evt) => {
    evt.preventDefault();
    const item = {
        name: titleField.value,
        link: linkField.value
    };
    renderCard(item);
    closeModalWindow(popupCard);
}

const handleProfileSubmit = (evt) => {
    evt.preventDefault();
    heading.textContent = nameField.value;
    subheading.textContent = bioField.value;
    closeModalWindow(popupProfile);
}

const openPopupProfile = () => {
    nameField.value = heading.textContent;
    bioField.value = subheading.textContent;
    clearErrors(popupProfile);
    openModalWindow(popupProfile);
}

const openPopupCard = () => {
    openModalWindow(popupCard);
    titleField.value = '';
    linkField.value = '';
    clearErrors(popupCard);
}

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddCard.addEventListener('click', openPopupCard);
buttonCloseProfile.addEventListener('click', () => closeModalWindow(popupProfile));
buttonCloseCard.addEventListener('click', () => closeModalWindow(popupCard));
buttonCloseCloseup.addEventListener('click', () => closeModalWindow(popupCloseup));
profileForm.addEventListener('submit', handleProfileSubmit);
cardForm.addEventListener('submit', handleCardSubmit);