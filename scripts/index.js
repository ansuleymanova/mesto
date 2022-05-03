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
const cardTemplate = document.querySelector('#card').content;

const createCard = (item)=> {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__picture');
    const cardHeading = cardElement.querySelector('.element__heading');
    const buttonLikeCard = cardElement.querySelector('.element__like-button');
    const buttonDeleteCard = cardElement.querySelector('.element__delete-button');
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name)
    cardHeading.textContent = item.name;
    buttonLikeCard.addEventListener('click', function() {
        buttonLikeCard.classList.toggle('element__like-button_active')
    });
    buttonDeleteCard.addEventListener('click', function() {
        cardElement.remove();
    });
    cardImage.addEventListener('click', function() {
        openModalWindow(popupCloseup);
        const popupCloseupImage = popupCloseup.querySelector('.popup__image');
        const popupCloseupCaption = popupCloseup.querySelector('.popup__caption');
        popupCloseupImage.setAttribute('src', item.link);
        popupCloseupImage.setAttribute('alt', item.name);
        popupCloseupCaption.textContent = item.name;
    });
    return cardElement;
}

const renderCard = (item) => {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => renderCard(item));

const formCardSubmitHandler = (evt) => {
    evt.preventDefault();
    const item = {
        name: titleField.value,
        link: linkField.value
    };
    renderCard(item);
    closeModalWindow(popupCard);
}

const formProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    heading.textContent = nameField.value;
    subheading.textContent = bioField.value;
    closeModalWindow(popupProfile);
}

const openModalWindow = (modalWindow) => {
    modalWindow.classList.add('popup_opened');
    modalWindow.addEventListener('keydown', closePopupEsc);
    modalWindow.addEventListener('mouseup', closePopupMouse);
}

const closeModalWindow = (modalWindow) => {
    modalWindow.removeEventListener('keydown', closePopupEsc)
    modalWindow.removeEventListener('mouseup', closePopupMouse)
    modalWindow.classList.remove('popup_opened')
    const errors = modalWindow.querySelectorAll('.popup__input-error_active');
    if (errors) {
        errors.forEach((error) => {
            error.classList.remove('popup__input-error_active');
            error.textContent = '';
        });
    }
}

const openPopupProfile = () => {
    nameField.value = heading.textContent;
    bioField.value = subheading.textContent;
    openModalWindow(popupProfile);
}

const openPopupCard = () => {
    openModalWindow(popupCard);
    titleField.value = '';
    linkField.value = '';
}

const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        const modalWindow = document.querySelector('.popup_opened');
        closeModalWindow(modalWindow);
    }
}

const closePopupMouse = (evt) => {
    const popupContainer = evt.target.closest('.popup__container');
    if (!popupContainer) {
        const modalWindow = document.querySelector('.popup_opened');
        closeModalWindow(modalWindow);
    }
}

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddCard.addEventListener('click', openPopupCard);
buttonCloseProfile.addEventListener('click', () => closeModalWindow(popupProfile));
buttonCloseCard.addEventListener('click', () => closeModalWindow(popupCard));
buttonCloseCloseup.addEventListener('click', () => closeModalWindow(popupCloseup));
profileForm.addEventListener('submit', formProfileSubmitHandler);
cardForm.addEventListener('submit', formCardSubmitHandler);