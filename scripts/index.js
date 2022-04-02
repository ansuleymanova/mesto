let editButton = document.querySelector('.profile-area__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon')
let profileInfo = document.querySelector('.profile-area__profile-info');
let heading = profileInfo.querySelector('.profile-area__heading');
let subheading = profileInfo.querySelector('.profile-area__subheading');
let nameField = document.getElementById('name');
let bioField = document.getElementById('bio');
let form = document.querySelector('.popup__container');

function openPopup() {
    popup.classList.add('popup_opened');
    nameField.value = heading.textContent;
    bioField.value = subheading.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    heading.textContent = nameField.value;
    subheading.textContent = bioField.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);