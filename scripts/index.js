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

function createCard(item) {
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
        const popupCloseupClose = popupCloseup.querySelector('.popup__close-icon');
        popupCloseupImage.setAttribute('src', item.link);
        popupCloseupImage.setAttribute('alt', item.name);
        popupCloseupCaption.textContent = item.name;
    });
    return cardElement;
}

function renderCard (item) {
    cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => renderCard(item));

function formCardSubmitHandler(evt) {
    evt.preventDefault();
    const item = {
        name: titleField.value,
        link: linkField.value
    };
    renderCard(item);
    closeModalWindow(popupCard);
}

function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    heading.textContent = nameField.value;
    subheading.textContent = bioField.value;
    closeModalWindow(popupProfile);
}

function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_opened')
}

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_opened')
}

function openPopupProfile() {
    openModalWindow(popupProfile);
    nameField.value = heading.textContent;
    bioField.value = subheading.textContent;
}

function openPopupCard() {
    openModalWindow(popupCard);
    titleField.value = '';
    linkField.value = '';
}

buttonEditProfile.addEventListener('click', openPopupProfile);
buttonAddCard.addEventListener('click', openPopupCard)
buttonCloseProfile.addEventListener('click', () => closeModalWindow(popupProfile));
buttonCloseCard.addEventListener('click', () => closeModalWindow(popupCard));
buttonCloseCloseup.addEventListener('click', () => closeModalWindow(popupCloseup));
profileForm.addEventListener('submit', formProfileSubmitHandler);
cardForm.addEventListener('submit', formCardSubmitHandler);