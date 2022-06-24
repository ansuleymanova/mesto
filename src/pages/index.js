import '../index.css';

import {
    token,
    buttonEditProfile,
    buttonAddCard,
    buttonCloseCloseup,
    formCard,
    formProfile,
    settings,
    popupProfile,
} from '../utils/constants.js';

import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";

const cardsApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-43/cards',
    token: token})

const profileApi = new Api({
    url: 'https://nomoreparties.co/v1/cohort-43/users/me ',
    token: token,
    method: 'PATCH'
})

const userInfo = new UserInfo({
    nameSelector: '.profile-area__heading',
    bioSelector: '.profile-area__subheading',
    avatarSelector: '.profile-area__avatar'
});

profileApi.getUserInfo().then((res) => {
    userInfo.setUserInfo({ name: res.name, bio: res.about, avatar: res.avatar, id: res._id });
})


const profileValidator = new FormValidator(settings, formProfile);
const cardValidator = new FormValidator(settings, formCard);
const popupCloseUpImage = new PopupWithImage('.popup_type_closeup');

const composeCard = (item) => {
    return new Card({
        item: item,
        templateSelector: '#card',
        handleCardClick: () => {
            popupCloseUpImage.open(item);
        },
        handleCardDelete: (cardId) => {
            cardsApi.deleteCard(cardId);
        }
    });
}

const section = new Section({
    items: [],
    renderer: (item) => {
        const card = composeCard(item);
        section.addItem(card.createCard())}
},
    '.elements');

cardsApi.getInitialCards().then((cards) => {
    cards.reverse();
    const cardsClean = []
    profileApi.getUserInfo().then((res) => {
        cards.forEach((card) => {
            const item = {
                name: card.name,
                link: card.link,
                isOwner: res._id === card.owner._id,
                cardId: card._id
            }
            cardsClean.push(item);
        })
        section.items = cardsClean;
        section.renderElements();
    })
})

const popupCardForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        cardsApi.postCard({
            name: input.title,
            link: input.link
        })
            .then((card) => {
                const item = {
                    name: card.name,
                    link: card.link,
                    cardId: card._id,
                    isOwner: true
                }
                const newCard = composeCard(item);
                section.addItem(newCard.createCard());
                popupCardForm.close();
                cardValidator.resetErrors();
            })
    },
    popupSelector: '.popup_type_card'
})

popupCardForm.setEventListeners();
buttonAddCard.addEventListener('click', () => popupCardForm.open());

const popupProfileForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        profileApi.patchUserInfo({
            name: input.name,
            about: input.bio
        }).then((res) => {
            userInfo.setUserInfo({
                name: res.name,
                bio: res.about
            })
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
popupProfileForm.setEventListeners();

buttonEditProfile.addEventListener('click', popupProfileOpener);
buttonCloseCloseup.addEventListener('click', () => popupCloseUpImage.close());