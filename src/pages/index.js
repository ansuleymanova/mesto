import '../index.css';

import {
    token,
    buttonEditProfile,
    buttonAddCard,
    buttonEditAvatar,
    buttonCloseCloseup,
    formCard,
    formProfile,
    formAvatar,
    settings,
    popupProfile,
} from '../utils/constants.js';

import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithButton from '../components/PopupWithButton';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-43/',
    headers: {
        "Content-type": "application/json",
        "authorization": token
    }
})

const userInfo = new UserInfo({
    nameSelector: '.profile-area__heading',
    bioSelector: '.profile-area__subheading',
    avatarSelector: '.profile-area__avatar'
});

const profileValidator = new FormValidator(settings, formProfile);
const cardValidator = new FormValidator(settings, formCard);
const avatarValidator = new FormValidator(settings, formAvatar);
const popupCloseUpImage = new PopupWithImage('.popup_type_closeup');

const popupConfirm = new PopupWithButton({
    handler: (evt, card) => {
        evt.preventDefault();
        api.deleteCard(card.cardId).then(() => {
            card.deleteCard();
            popupConfirm.close();
        }).catch((err) => console.log(err))
    },
    popupSelector: '.popup_type_confirm'
})

const composeCard = (item) => {
    const card =  new Card({
        item: item,
        templateSelector: '#card',
        handleCardClick: () => {
            popupCloseUpImage.open(item);
        },
        handleCardDelete: (evt) => {
            evt.preventDefault();
            popupConfirm.open(card);
            },
        handleCardLike: (cardId) => {
            if (item.isLiked) {
                api.dislikeCard(cardId)
                    .then(() => card.toggleLikeCard())
                    .catch((err) => console.log(err));
            } else {
                api.likeCard(cardId)
                    .then(() => card.toggleLikeCard())
                    .catch((err) => console.log(err));
            }
        }
    });
    return card.createCard()
}

const section = new Section({
        renderer: (item) => {
            const card = composeCard(item);
            section.addItem(card)},
        containerSelector: '.elements'});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
]).then(([info, initialCards]) => {
    userInfo.setUserInfo({
        name: info.name,
        bio: info.about,
        avatar: info.avatar,
        id: info._id});
    initialCards.reverse();
    const cardsClean = []
    const user = userInfo.getUserInfo();
    initialCards.forEach((card) => {
        const isLiked = card.likes.some(like => like['_id'] === user.id);
        const item = {
            name: card.name,
            link: card.link,
            isOwner: user.id === card.owner._id,
            cardId: card._id,
            likes: card.likes.length,
            isLiked: isLiked
        }
        cardsClean.push(item);
    })
    section.renderElements(cardsClean);
}).catch((err) => console.log(err))

const popupCardForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        popupCardForm.renderLoading(true);
        api.postCard({
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
                section.addItem(newCard);
                popupCardForm.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupCardForm.renderLoading(false);
            })
    },
    popupSelector: '.popup_type_card',
})

const popupProfileForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        popupProfileForm.renderLoading(true);
        api.patchUserInfo({
            name: input.name,
            about: input.bio
        }).then((res) => {
            userInfo.setUserInfo({
                name: res.name,
                bio: res.about
            })
            popupProfileForm.close();
        })
            .catch((err) => console.log(err))
            .finally(() => {
               popupProfileForm.renderLoading(false);
            });
    },
    popupSelector: '.popup_type_profile',
});

const popupAvatarForm = new PopupWithForm({
    handler: (evt, input) => {
        evt.preventDefault();
        popupAvatarForm.renderLoading(true);
        api.patchAvatar({
            avatar: input.avatar
        }).then((res) => {
            userInfo.setUserInfo({
                avatar: res.avatar
            })
            popupAvatarForm.close();
        })
            .catch((err) => console.log(err))
            .finally(() => {
                popupAvatarForm.renderLoading(false);
        });

    },
    popupSelector: '.popup_type_avatar',
})
function popupOpener(popup, validator) {
    validator.resetErrors();
    popup.open()
}

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
popupConfirm.setEventListeners();
popupCardForm.setEventListeners();

buttonAddCard.addEventListener('click', () => popupOpener(popupCardForm, cardValidator));
buttonEditProfile.addEventListener('click', popupProfileOpener);
buttonEditAvatar.addEventListener('click', () => popupOpener(popupAvatarForm, avatarValidator));
buttonCloseCloseup.addEventListener('click', () => popupCloseUpImage.close());