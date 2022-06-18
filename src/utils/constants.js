import altay from '../images/altay.jpg'


export const settings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__field_type_error'
}

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Алтай',
        link: altay
    }
];

export const buttonEditProfile = document.querySelector('.profile-area__edit-button');
export const buttonAddCard = document.querySelector('.profile-area__add-button');
export const popupCard = document.querySelector('.popup_type_card');
export const popupCloseup = document.querySelector('.popup_type_closeup');
export const buttonCloseCloseup = popupCloseup.querySelector('.popup__close-icon');
export const formCard = popupCard.querySelector('.popup__container');
export const popupProfile = document.querySelector('.popup_type_profile');
export const formProfile = popupProfile.querySelector('.popup__container');
