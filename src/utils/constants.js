export const settings = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__field_type_error'
}

export const token = '61665773-9bef-493e-b175-1f96c36b4614'
export const buttonEditProfile = document.querySelector('.profile-area__edit-button');
export const buttonEditAvatar = document.querySelector('.profile-area__overlay');
export const buttonAddCard = document.querySelector('.profile-area__add-button');
export const popupCard = document.querySelector('.popup_type_card');
export const popupCloseup = document.querySelector('.popup_type_closeup');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const buttonCloseCloseup = popupCloseup.querySelector('.popup__close-icon');
export const formCard = popupCard.querySelector('.popup__container');
export const formAvatar = popupAvatar.querySelector('.popup__container');
export const popupProfile = document.querySelector('.popup_type_profile');
export const formProfile = popupProfile.querySelector('.popup__container');
