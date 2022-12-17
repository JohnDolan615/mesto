
import "./index.css";

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import Card from "../components/Сard.js";
import {FormValidator} from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import params from '../utils/params.js';
import Api from "../components/Api.js";
import connect from "../utils/connect.js";

const userInfo = new UserInfo(
  params.profaleNameSelector,
  params.profaleAboutSelector,
  params.profaleAvatarSelector);

const cardsList = document.querySelector(params.listCardsSelector);

const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data));
  }
},
params.listCardsSelector
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

//Создаем экземпляр класса попапа изменения аватара
const popupUpdAvatar = new PopupWithForm(handleSubmitAvatar, params.popupUpdateAvatar);
popupUpdAvatar.setEventListeners();

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
      popupUpdAvatar.close()
      renderLoading(avatarPopup, false, buttonSubmitText)
    })
    .catch((error) => isError(error))
}

// Создаём экземпляр класса попапа на полный экран
const popupFullScreen = new PopupWithImage(params.popupBigPhotoSelector);
popupFullScreen.setEventListeners();

function handleOpenPopupWithConfirm(card) {
  popupConfirmDeleteCard.open(card);
};

const popupConfirmDeleteCard = new PopupWithConfirm(
  handleSubmitDeleteCard,
  params.popupConfirmSelector,
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

// Объявляем функцию, которая записывает значения в элементы попапа 
function handleCardClick(data) { popupFullScreen.open(data) };

// функция создания новой карточки
function createNewCard(data) {
  return new Card(
    data,
    params.templateCardSelector,
    handleCardClick,
    handleToggleLike,
    handleOpenPopupWithConfirm,
    userInfo.getUserInfo().myId
  )
    .createCard();
};
// функция добавляет карточку в массив 
function addCard(card) {
  cardsList.prepend(card);
}

// Создаём экземпляр класса попапа для добавления карточек
const popupAddCard = new PopupWithForm(handleSubmitCard, params.popupCardSelector);

// Обработчик события submit формы добавления карточки 
function handleSubmitCard(evt, data, buttonSubmitText) {
  evt.preventDefault();
  renderLoading(cardPopup, true, buttonSubmitText)
  api.setCard(data)
    .then((data) => {
      addCard(createNewCard(data));
    })
    .then(() => {
      popupAddCard.close();
      renderLoading(cardPopup, false, buttonSubmitText);
    })
    .catch((error) => isError(error))
};

popupAddCard.setEventListeners();

function openPopupCard() {
  formValidateCard.resetBoxs();
  popupAddCard.open();
};

// Создание слушателя на кнопки открытия и сохранения попапа добавления карточки
const buttonOpenAddCard = document.querySelector(params.buttonAddCardSelector);
buttonOpenAddCard.addEventListener('click', openPopupCard);

// Создаём экземпляр класса попапа для редактирования профиля
const popupEditProfile = new PopupWithForm(handleSubmitProfile, params.popupProfileSelector);

// Обработчик события submit формы редактированя профиля
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

const popupProfile = document.querySelector(params.popupProfileSelector);
const popupProfileForm = popupProfile.querySelector(params.formSelector);

const inputProfileName = popupProfileForm.querySelector(params.inputProfileName);
const inputProfileAbout = popupProfileForm.querySelector(params.inputProfileAbout);

function openPopupProfile() {
  const profileInfo = userInfo.getUserInfo();
  inputProfileName.value = profileInfo.profileName;
  inputProfileAbout.value = profileInfo.profileAbout;
  formValidateProfile.resetBoxs();
  popupEditProfile.open();
};

function openPopupAddAvatar() {
  formValidateAvatar.resetBoxs();
  popupUpdAvatar.open();
}

const profile = document.querySelector(params.profileSelector);
const buttonOpenProfile = profile.querySelector(params.profileButtonCorrectSelector);
buttonOpenProfile.addEventListener('click', openPopupProfile);
const buttonOpenUpdAvatar = profile.querySelector(params.profileButtonUpdAvatarSelector);
buttonOpenUpdAvatar.addEventListener('click', openPopupAddAvatar);

const cardPopup = document.querySelector(params.popupCardSelector);
const cardForm = cardPopup.querySelector(params.formSelector);
const avatarPopup = document.querySelector(params.popupUpdateAvatar);
const popupUpdAvatarForm = avatarPopup.querySelector(params.formSelector);

const formValidateProfile = new FormValidator(params, popupProfileForm);
const formValidateCard = new FormValidator(params, cardForm);
const formValidateAvatar = new FormValidator(params, popupUpdAvatarForm)
formValidateProfile.enableValidation();
formValidateCard.enableValidation();
formValidateAvatar.enableValidation();

// const сardValidation = new FormValidator(params, cardForm);
// const profileValidation = new FormValidator(params, popupProfileForm);
// const avatarValidation = new FormValidator(params, popupUpdAvatarForm)

// сardValidation.enableValidation();
// profileValidation.enableValidation();
// avatarValidation.enableValidation();

