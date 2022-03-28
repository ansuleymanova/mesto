let editButton = document.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon')
let saveButton = document.querySelector('.popup__save-button')
let profileInfo = document.querySelector('.profile-info');

function popupOpen() {
    popup.classList.add('popup_opened');
    let name = profileInfo.querySelector('.profile-info__heading').textContent;
    let bio = profileInfo.querySelector('.profile-info__subheading').textContent;
    let nameField = document.getElementById('name');
    let bioField = document.getElementById('bio');
    nameField.setAttribute('placeholder', name);
    bioField.setAttribute('placeholder', bio);
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.getElementById('name');
    let bio = document.getElementById('bio');
    let heading = profileInfo.querySelector('.profile-info__heading');
    let subheading = profileInfo.querySelector('.profile-info__subheading');
    heading.textContent = name.value;
    subheading.textContent = bio.value;
    popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', formSubmitHandler);