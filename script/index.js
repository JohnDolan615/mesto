import { initialCards } from "./cards.js";
import Card from "./Сard.js";
import {openPopup, closePopup, openPopupImg, handleEscapeKeyPress} from "./functions.js";
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
const elementClose = popupImg.querySelector('#popup-img__close');
const newCardInput = popupCard.querySelector('#popup-add__input-name');
const newCardUrl = popupCard.querySelector('#popup-add__input-url');
const cardForm = popupCard.querySelector('#popup-add__form');
const cardPopupForm = document.getElementById('popup-add__form');
const cardsContaner = document.querySelector('.elements');




profileEditButton.addEventListener('click', () => {
    author.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    openPopup(popupProfile);
});

popupCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});


profileAddCard.addEventListener('click', () => {
    openPopup(popupCard);
});

popupCardAddClose.addEventListener('click', () => {
    closePopup(popupCard);
});


const formProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = author.value;
    profileSubtitle.textContent = job.value;
    closePopup(popupProfile); 
};
formElementProfile.addEventListener('submit', formProfileSubmitHandler);


 const renderCard = (item, contaner) => {
    contaner.prepend(item);
};

initialCards.forEach((evt) => {
    const card = new Card (evt, '.template-elements', '.elements__photo');
    renderCard(card.createCard(), cardsContaner);
});
 
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
};

function setCardEventListener(card) {
    const handleLikeButton = card.querySelector('.elements__like');
    handleLikeButton.addEventListener('click', likeButton);
    const handleRemoveButton = card.querySelector('.elements__delete');
    handleRemoveButton.addEventListener('click', deleteElement);
    const handleOpenPopupImg = card.querySelector('.elements__photo');
    handleOpenPopupImg.addEventListener('click', openPopupImg);
};



cardForm.addEventListener('submit', addCard);
elementClose.addEventListener('click', () => {
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


