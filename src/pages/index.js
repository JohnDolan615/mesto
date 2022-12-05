import "./index.css";

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Card from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import params from "../utils/params.js";
import { initialCards } from "../utils/cards.js";

const cards = document.querySelector('.elements');
const popupProfile = document.querySelector('#popup-profile');
const profileEditButton = document.querySelector('.profile__edit');
const author = popupProfile.querySelector('#popup-profile__form-box_type_author');
const job = popupProfile.querySelector('#popup-profile__form-box_type_job');
const popupCard = document.querySelector('#popup-add');
const profileAddCard = document.querySelector('.profile__add');

const сardValidation = new FormValidator(params, popupCard);
const profileValidation = new FormValidator(params, popupProfile);

const section = new Section({
  items: initialCards,
  renderer: data => {
      section.addItem(createCard(data));
  },
},
  '.elements'
);
section.renderCard();

const popupWithImage = new PopupWithImage('#popup-img');
popupWithImage.setEventListeners();

function handleCardClick(data) { 
  popupWithImage.open(data)
};

function createCard(cardData) {
  const card = new Card (cardData, params.templateCardSelector, handleCardClick);
  return card.createCard();
};

function addCard(card) {
  cards.prepend(card);
}

const popupCardForm = new PopupWithForm(handleSubmitCard, '#popup-add');

function handleSubmitCard(evt, data) {
    evt.preventDefault();
    addCard(createCard(data));
    popupCardForm.close();
};

popupCardForm.setEventListeners();

function openPopupCard() {
    сardValidation.resetBoxs();
    popupCardForm.open();
};

profileAddCard.addEventListener('click', openPopupCard);

const popupProfileForm = new PopupWithForm(handleSubmitProfile, '#popup-profile');
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function handleSubmitProfile(evt, data) {
    evt.preventDefault();
    userInfo.setUserInfo(data);
    popupProfileForm.close();
  };

popupProfileForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo();
    profileValidation.activeButton();
    author.value = profileInfo.profileAuthor;
    job.value = profileInfo.profileJob;
    popupProfileForm.open();
});

сardValidation.enableValidation();
profileValidation.enableValidation();






