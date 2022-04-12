const initialCards = [
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
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector('.profile-area__edit-button');
const addButton = document.querySelector('.profile-area__add-button');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const popupCloseup = document.querySelector('.popup_closeup');
const cardsContainer = document.querySelector('.elements');
const closeButtonProfile = popupProfile.querySelector('.popup__close-icon');
const closeButtonCard = popupCard.querySelector('.popup__close-icon');
const profileInfo = document.querySelector('.profile-area__profile-info');
const heading = profileInfo.querySelector('.profile-area__heading');
const subheading = profileInfo.querySelector('.profile-area__subheading');
const nameField = document.getElementById('name');
const bioField = document.getElementById('bio');
const titleField = document.getElementById('title');
const linkField = document.getElementById('picture-link');
const profileForm = document.querySelector('.popup_profile');
const cardForm = document.querySelector('.popup_card');
const cardTemplate = document.querySelector('#card').content;

function createCard(item) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__picture');
    const cardHeading = cardElement.querySelector('.element__heading');
    const likeButton = cardElement.querySelector('.element__like-button');
    const deleteButton = cardElement.querySelector('.element__delete-button');
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name)
    cardHeading.textContent = item.name;
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__like-button_active')
    });
    deleteButton.addEventListener('click', function() {
        cardElement.remove();
    });
    cardImage.addEventListener('click', function() {
        popupCloseup.classList.add('popup_opened');
        const popupCloseupImage = popupCloseup.querySelector('.popup__image');
        const popupCloseupCaption = popupCloseup.querySelector('.popup__caption');
        const popupCloseupClose = popupCloseup.querySelector('.popup__close-icon');
        popupCloseupImage.setAttribute('src', item.link);
        popupCloseupImage.setAttribute('alt', item.name);
        popupCloseupCaption.textContent = item.name;
        popupCloseupClose.addEventListener('click', function () {
            popupCloseup.classList.remove('popup_opened');
        })
    });
    cardsContainer.append(cardElement);
}

initialCards.forEach((item) => createCard(item));

function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    nameField.value = heading.textContent;
    bioField.value = subheading.textContent;
}
function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
}

function openPopupCard() {
    popupCard.classList.add('popup_opened');
    titleField.value = '';
    linkField.value = '';
}

function closePopupCard() {
    popupCard.classList.remove('popup_opened');
}

function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    heading.textContent = nameField.value;
    subheading.textContent = bioField.value;
    closePopupProfile();
}

function formCardSubmitHandler(evt) {
    evt.preventDefault();
    const item = {
        name: titleField.value,
        link: linkField.value
    };
    createCard(item);
    closePopupCard();
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupCard)
closeButtonProfile.addEventListener('click', closePopupProfile);
closeButtonCard.addEventListener('click', closePopupCard);
profileForm.addEventListener('submit', formProfileSubmitHandler);
cardForm.addEventListener('submit', formCardSubmitHandler);