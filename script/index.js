import { initialCards } from "./cards.js";
import Card from "./Сard.js";
import {openPopup, closePopup, openPopupImg} from "./functions.js";
import { FormValidator } from "./FormValidator.js";
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupCloseProfile = popupProfile.querySelector('#popup-profile__close');
const formElementProfile = popupProfile.querySelector('#popup-profile__form');
const profileEditButton = document.querySelector('.profile__edit');
const author = popupProfile.querySelector('#popup-profile__form-box_type_author');
const job = popupProfile.querySelector('#popup-profile__form-box_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupCard = document.querySelector('#popup-add');
const profileAddCard = document.querySelector('.profile__add');
const popupCardAddClose = popupCard.querySelector('#popup-add__close');
const popupImg = document.querySelector('#popup-img');
const popupImgClose = popupImg.querySelector('#popup-img__close');
const newCardInput = popupCard.querySelector('#popup-add__input-name');
const newCardUrl = popupCard.querySelector('#popup-add__input-url');
const cardForm = popupCard.querySelector('#popup-add__form');
const cardPopupForm = document.getElementById('popup-add__form');
const cardsContaner = document.querySelector('.elements');

const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-box',
    errorSelector: '.error',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__form-box_type_error',
    errorClass: 'error_visible'
  };

const CardValidation = new FormValidator(params, popupCard);
const profileValidation = new FormValidator(params, popupProfile);

CardValidation.enableValidation();
profileValidation.enableValidation();

profileEditButton.addEventListener('click', () => {
    profileValidation.activeButton();
    author.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    openPopup(popupProfile);
});

popupCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});


profileAddCard.addEventListener('click', () => {
    CardValidation.resetBoxs();
    openPopup(popupCard);
});

popupCardAddClose.addEventListener('click', () => {
    closePopup(popupCard);
});


const submitProfileHandler = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = author.value;
    profileSubtitle.textContent = job.value;
    closePopup(popupProfile); 
};
formElementProfile.addEventListener('submit', submitProfileHandler);

function likeButton (evt) {
    evt.target.closest('.elements__like').classList.toggle('elements__like_active'); 
};
function deleteElement (evt) {
    evt.target.closest('.elements__card').remove(); 
};
 

 const renderCard = (item, contaner) => {
    contaner.prepend(item);
};

const createCard = (cardData) => {
    const card = new Card (cardData, '.template-elements', openPopupImg);
    return card.createCard();
}

const renderCards = () => {
    initialCards.forEach((initialCardsItem) => {
      const сardElement = createCard(initialCardsItem);
      cardsContaner.append(сardElement);
    });
  }

  renderCards();


 
const addCard = (event) => {
    event.preventDefault();
    const cardData = {
        name: newCardInput.value,
        link: newCardUrl.value
    }
    const card = new Card(cardData, '.template-elements', '.elements__photo');

    renderCard(card.createCard(), cardsContaner);
    closePopup(popupCard);
    cardPopupForm.reset();
    CardValidation.inactiveButton();
};


cardForm.addEventListener('submit', addCard);
popupImgClose.addEventListener('click', () => {
    closePopup(popupImg);
});

const handlePopupOverlayClick = (e) => {
    if (e.currentTarget == e.target) {
        closePopup(e.target)
    }
};


popupList.forEach(popupElement => {
    popupElement.addEventListener('click', handlePopupOverlayClick);
});



