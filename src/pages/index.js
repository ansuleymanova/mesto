import '../index.css';

import {
    token,
    buttonEditProfile,
    buttonAddCard,
    buttonEditAvatar,
    buttonCloseCloseup,
    popupConfirm,
    formCard,
    formProfile,
    formAvatar,
    settings,
    popupProfile, popupCard, popupAvatar,
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
    url: 'https://nomoreparties.co/v1/cohort-43/users/me',
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
const avatarValidator = new FormValidator(settings, formAvatar);
const popupCloseUpImage = new PopupWithImage('.popup_type_closeup');

function renderLoading(isLoading, button) {
    const text = button.textContent;
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = text;
    }
}
function deleteCard (evt, card) {
    evt.preventDefault();
    card.deleteCard();
    console.log(cardsApi);
    cardsApi.deleteCard(card.cardId);
    popupConfirm.classList.remove('popup_opened');
}
const composeCard = (item) => {
    const card =  new Card({
        item: item,
        templateSelector: '#card',
        handleCardClick: () => {
            popupCloseUpImage.open(item);
        },
        handleCardDelete: (evt) => {
            evt.preventDefault();
            popupConfirm.classList.add('popup_opened');
            popupConfirm.addEventListener('submit', (evt) => deleteCard(evt, card));

        },
        handleCardLike: (cardId) => {
            if (item.isLiked) {
                cardsApi.dislikeCard(cardId);
            } else {
                cardsApi.likeCard(cardId);
            }
        }
    });
    return card
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
            const isLiked = card.likes.some(like => like['_id'] === res._id);
            const item = {
                name: card.name,
                link: card.link,
                isOwner: res._id === card.owner._id,
                cardId: card._id,
                likes: card.likes.length,
                isLiked: isLiked
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
        renderLoading(
            true,
            popupCard.querySelector('.popup__save-button')
        )
        cardsApi.postCard({
            name: input.title,
            link: input.link
        })
            .then((card) => {
                const item = {
                    name: card.name,
                    link: card.link,
                    cardId: card._id,
                    isOwner: true,
                    likes: 0
                }
                const newCard = composeCard(item);
                section.addItem(newCard.createCard());
                popupCardForm.close();
                cardValidator.resetErrors();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupCard.querySelector('.popup__save-button').textContent = 'Сохранить'
            })
    },
    popupSelector: '.popup_type_card'
})

popupCardForm.setEventListeners();
buttonAddCard.addEventListener('click', () => popupCardForm.open());

const popupProfileForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        renderLoading(true, popupProfile.querySelector('.popup__save-button'))
        profileApi.patchUserInfo({
            name: input.name,
            about: input.bio
        }).then((res) => {
            userInfo.setUserInfo({
                name: res.name,
                bio: res.about
            })
        })
            .catch((err) => console.log(err))
            .finally(() => {
                popupProfile.querySelector('.popup__save-button').textContent = 'Сохранить'
            });
        popupProfileForm.close();
    },
    popupSelector: '.popup_type_profile',
});

const popupAvatarForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        renderLoading(
            true,
            popupAvatar.querySelector('.popup__save-button')
        )
        profileApi.patchAvatar({
            avatar: input.avatar
        }).then((res) => {
            userInfo.setUserInfo({
                avatar: res.avatar
            })
        })
            .catch((err) => console.log(err))
            .finally(() => {
                popupAvatar.querySelector('.popup__save-button').textContent = 'Сохранить'
        });
        popupAvatarForm.close();
    },
    popupSelector: '.popup_type_avatar'
})

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
avatarValidator.enableValidation();
popupProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();

buttonEditProfile.addEventListener('click', popupProfileOpener);
buttonEditAvatar.addEventListener('click', () => popupAvatarForm.open());
buttonCloseCloseup.addEventListener('click', () => popupCloseUpImage.close());