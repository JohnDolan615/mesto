import "./index.css";

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import Card from "../components/Сard.js";
import {FormValidator} from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import params from '../utils/params.js';
import Api from "../components/Api.js";
import connect from "../utils/connect.js";
import {cardsList, 
  profileAdd, 
  popupProfileForm, 
  boxAuthorProfile, 
  boxJobProfile, 
  cardForm, 
  popupAvatarForm, 
  buttonProfile, 
  buttonAvatar} from "../utils/constants";

const userInfo = new UserInfo(
  params.profileTitle,
  params.profileSubtitle,
  params.profileAvatar);

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createCard(data));
  }
},
params.elements
);

function isError(error) {
  console.log(error);
};

const api = new Api(connect);
api.getInitialData()
  .then(([userData, cardData]) => {
    userInfo.renderUserInfo({
      name: userData.name,
      about: userData.about,
      myId: userData._id,
      avatar: userData.avatar
    });
    cardList.renderItems({
      cards: cardData
    })
  })
  .catch((error) => isError(error))

const popupAvatar = new PopupWithForm(handleSubmitAvatar, params.popupAvatar);
popupAvatar.setEventListeners();

function handleSubmitAvatar(evt, link, buttonSubmitText) {
  evt.preventDefault();
  popupAvatar.renderLoading(true);
  api.setAvatar(link)
    .then(({ avatar }) => {
      userInfo.renderAvatar(avatar)
    })
    .then(() => {
      popupAvatar.renderLoading(false);
      popupAvatar.close()
    })
    .catch((error) => isError(error))
}

const popupWithImage = new PopupWithImage(params.popupImg);
popupWithImage.setEventListeners();

function handleOpenPopupConfirm(card) {
  popupConfirmDeleteCard.open(card);
};

const popupConfirmDeleteCard = new PopupConfirm(
  handleSubmitDeleteCard,
  params.popupDelete,
);

popupConfirmDeleteCard.setEventListeners();

function handleSubmitDeleteCard(evt, card) {
  evt.preventDefault();
  api.deleteCard(card._idCard)
    .then((response) => {
      if (response.message = "Пост удалён") {
        card.deleteCard();
      }
    })
    .then(() => {
      popupConfirmDeleteCard.close()
    })
    .catch((error) => {
      isError(error);
    })
};

function handleCardClick(data) { popupWithImage.open(data) };

function createCard(data) {
  return new Card(
    data,
    params.templateCardSelector,
    handleCardClick,
    handleToggleLike,
    handleOpenPopupConfirm,
    userInfo.getUserInfo().myId
  )
    .createCard();
};

function addCard(card) {
  cardsList.prepend(card);
}

const popupAddCard = new PopupWithForm(handleSubmitCard, params.popupAdd);
 
function handleSubmitCard(evt, data, buttonSubmitText) {
  evt.preventDefault();
  popupAddCard.renderLoading(true);
  api.setCard(data)
    .then((data) => {
      addCard(createCard(data));
    })
    .then(() => {
      popupAddCard.renderLoading(false);
      popupAddCard.close();
    })
    .catch((error) => isError(error))
};

popupAddCard.setEventListeners();

function openPopupCard() {
  сardValidation.resetBoxs();
  popupAddCard.open();
};

profileAdd.addEventListener('click', openPopupCard);

const popupEditProfile = new PopupWithForm(handleSubmitProfile, params.popupProfile);

function handleSubmitProfile(evt, data, buttonSubmitText) {
  evt.preventDefault();
  popupEditProfile.renderLoading(true)
  api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => {
      popupAvatar.renderLoading(false);
      popupEditProfile.close();
    })
    .catch((error) => isError(error))
};

function handleToggleLike(data) {
  api.toggleLikeCard(data)
    .then((response) => {
      data.card.setLikes(response.likes);
      data.card._setLike();
    })
    .catch((error) => { isError(error) })
};

popupEditProfile.setEventListeners();

function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  boxAuthorProfile.value = profileInfo.profileName;
  boxJobProfile.value = profileInfo.profileAbout;
  profileValidation.resetBoxs();
  popupEditProfile.open();
};

function openPopupAvatar() {
  avatarValidation.resetBoxs();
  popupAvatar.open();
}

buttonProfile.addEventListener('click', openPopupProfile);
buttonAvatar.addEventListener('click', openPopupAvatar);

const profileValidation = new FormValidator(params, popupProfileForm);
const сardValidation = new FormValidator(params, cardForm);
const avatarValidation = new FormValidator(params, popupAvatarForm)
profileValidation.enableValidation();
сardValidation.enableValidation();
avatarValidation.enableValidation();

