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

const cardsList = document.querySelector('.elements');
const profileAdd = document.querySelector('.profile__add');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = popupProfile.querySelector(params.formSelector);
const boxAuthorProfile = popupProfileForm.querySelector('#popup-profile__form-box_type_author');
const boxJobProfile = popupProfileForm.querySelector('#popup-profile__form-box_type_job');
const cardAdd = document.querySelector('#popup-add');
const cardForm = cardAdd.querySelector(params.formSelector);
const avatarPopup = document.querySelector('#popup-avatar');
const popupAvatarForm = avatarPopup.querySelector(params.formSelector);
const profile = document.querySelector(params.profileSelector);
const buttonProfile = profile.querySelector('.profile__edit');
const buttonAvatar = profile.querySelector('.profile__change-avatar');

const userInfo = new UserInfo(
  '.profile__title',
  '.profile__subtitle',
  '.profile__avatar');

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createCard(data));
  }
},
'.elements'
);

function isError(error) {
  console.log(error);
};

const api = new Api(connect);
api.getInitialData()
  .then((data) => {
    userInfo.renderUserInfo({
      name: data[0].name,
      about: data[0].about,
      myId: data[0]._id,
      avatar: data[0].avatar
    });
    cardList.renderItems({
      cards: data[1]
    })
  })
  .catch((error) => isError(error))

const popupAvatar = new PopupWithForm(handleSubmitAvatar, '#popup-avatar');
popupAvatar.setEventListeners();

function renderLoading(popup, isProcess, buttonSubmitText) {
  const buttonSubmit = popup.querySelector(params.submitButtonSelector);
  if (isProcess) {
    buttonSubmit.textContent = "Сохранение...";
  } else {
    buttonSubmit.textContent = buttonSubmitText;
  }
};

function handleSubmitAvatar(evt, link, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(avatarPopup, true, buttonSubmitText)
  api.setAvatar(link)
    .then(({ avatar }) => {
      userInfo.renderAvatar(avatar)
    })
    .then(() => {
      popupAvatar.close()
      renderLoading(avatarPopup, false, buttonSubmitText)
    })
    .catch((error) => isError(error))
}

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

function handleOpenPopupConfirm(card) {
  popupConfirmDeleteCard.open(card);
};

const popupConfirmDeleteCard = new PopupConfirm(
  handleSubmitDeleteCard,
  '#popup-delete',
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

const popupAddCard = new PopupWithForm(handleSubmitCard, '#popup-add');
 
function handleSubmitCard(evt, data, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(cardAdd, true, buttonSubmitText)
  api.setCard(data)
    .then((data) => {
      addCard(createCard(data));
    })
    .then(() => {
      popupAddCard.close();
      renderLoading(cardAdd, false, buttonSubmitText);
    })
    .catch((error) => isError(error))
};

popupAddCard.setEventListeners();

function openPopupCard() {
  сardValidation.resetBoxs();
  popupAddCard.open();
};

profileAdd.addEventListener('click', openPopupCard);

const popupEditProfile = new PopupWithForm(handleSubmitProfile, '#popup-profile');

function handleSubmitProfile(evt, data, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(popupProfile, true, buttonSubmitText)
  api.setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => {
      popupEditProfile.close();
      renderLoading(popupProfile, false, buttonSubmitText);
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

