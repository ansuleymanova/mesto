import '../index.css';

import {
    buttonEditProfile,
    buttonAddCard,
    buttonCloseCloseup,
    formCard,
    formProfile,
    settings,
    initialCards,
    popupProfile,
} from '../utils/constants.js';

import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";

const userInfo = new UserInfo({
    nameSelector: '.profile-area__heading',
    bioSelector: '.profile-area__subheading'
});

const profileValidator = new FormValidator(settings, formProfile);
const cardValidator = new FormValidator(settings, formCard);

const popupCloseUpImage = new PopupWithImage('.popup_type_closeup');

const composeCard = (item) => {
    return new Card({
        item: item,
        templateSelector: '#card',
        handleCardClick: () => {
            popupCloseUpImage.open(item);
        }
    });
}

const section = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = composeCard(item);
            section.addItem(card.createCard())}
    },
    '.elements')

const popupCardForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        const item = {
            name: input.title,
            link: input.link
        }
        const card = composeCard(item);
        section.addItem(card.createCard());
        popupCardForm.close();
        cardValidator.resetErrors();
    },
    popupSelector: '.popup_type_card'
});

const popupProfileForm = new PopupWithForm({
    handler: (evt,  input) => {
        evt.preventDefault();
        userInfo.setUserInfo({
            name: input.name,
            bio: input.bio
        });
        popupProfileForm.close();
    },
    popupSelector: '.popup_type_profile',
});

const popupProfileOpener = () => {
    const { name, bio } = userInfo.getUserInfo();
    const fieldsArray = popupProfile.querySelectorAll('.popup__field');
    const fields = {};
    fieldsArray.forEach(field => fields[field.name] = field);
    fields.name.value = name;
    fields.bio.value = bio;
    popupProfileForm.open()
}

profileValidator.enableValidation();
cardValidator.enableValidation();
section.renderElements();
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();

buttonEditProfile.addEventListener('click', popupProfileOpener);
buttonAddCard.addEventListener('click', () => popupCardForm.open());
buttonCloseCloseup.addEventListener('click', () => popupCloseUpImage.close());