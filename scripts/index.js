const initialCards = [
    {
        name: 'Иваново',
        link: '../images/ivanovo.jpg'
    },
    {
        name: 'Эльбрус',
        link: '../images/elbrus.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Домбай',
        link: '../images/dombay.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Карачаево-Черкессия',
        link: '../images/karachaevsk.jpg'
    }
];

let editButton = document.querySelector('.profile-area__edit-button');
let addButton = document.querySelector('.profile-area__add-button');
let popupCard = document.querySelector('.popup_card');
let popupProfile = document.querySelector('.popup_profile');
let cardsContainer = document.querySelector('.elements');
let closeButtonProfile = popupProfile.querySelector('.popup__close-icon');
let closeButtonCard = popupCard.querySelector('.popup__close-icon');
let profileInfo = document.querySelector('.profile-area__profile-info');
let heading = profileInfo.querySelector('.profile-area__heading');
let subheading = profileInfo.querySelector('.profile-area__subheading');
let nameField = document.getElementById('name');
let bioField = document.getElementById('bio');
let titleField = document.getElementById('title');
let linkField = document.getElementById('picture-link');
let profileForm = document.querySelector('.popup_profile');
let cardForm = document.querySelector('.popup_card');

const cardTemplate = document.querySelector('#card').content;

initialCards.forEach((item) => createCard(item));

function createCard (item) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__picture');
    const cardHeading = cardElement.querySelector('.element__heading');
    const likeButton = cardElement.querySelector('.element__like-button');
    const deleteButton = cardElement.querySelector('.element__delete-button');
    cardImage.setAttribute('src', item.link);
    cardHeading.textContent = item.name;
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('element__like-button_active')
    });
    deleteButton.addEventListener('click', function () {
        cardElement.remove();
    })
    cardsContainer.append(cardElement);
}

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
    let item = {
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