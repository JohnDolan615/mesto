
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
const elementsList = document.querySelector('.elements');
const itemTemplate = document.querySelector('.template-elements').content;
const newCardInput = popupCard.querySelector('#popup-add__input-name');
const newCardUrl = popupCard.querySelector('#popup-add__input-url');
const cardForm = popupCard.querySelector('#popup-add__form');
const popupImgImg = popupImg.querySelector('.popup__image');
const popupImgText = popupImg.querySelector('.popup__text');
const cardPopupForm = popupCard.querySelector('popup__form');



const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeKeyPress);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeKeyPress);
};

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



 const createCard = (text) => {
    const templateCloneCard = itemTemplate.cloneNode(true);
        templateCloneCard.querySelector('.elements__text').textContent = text.name;
        templateCloneCard.querySelector('.elements__photo').src = text.link;
        templateCloneCard.querySelector('.elements__photo').alt = text.alt;
    setCardEventListener(templateCloneCard);
    return templateCloneCard;

 };

 const renderCard = (item) => {
    elementsList.prepend(item);
};

initialCards.forEach((evt) => {
    renderCard(createCard (evt));
});
 
const addCard = (event) => {
    event.preventDefault();
    renderCard(createCard({name:  newCardInput.value, link: newCardUrl.value}));
    closePopup(popupCard);
};

const clearInputForm = () => {
    newCardInput.reset();
    newCardUrl.reset();
};

function setCardEventListener(card) {
    const handleLikeButton = card.querySelector('.elements__like');
    handleLikeButton.addEventListener('click', likeButton);
    const handleRemoveButton = card.querySelector('.elements__delete');
    handleRemoveButton.addEventListener('click', deleteElement);
    const handleOpenPopupImg = card.querySelector('.elements__photo');
    handleOpenPopupImg.addEventListener('click', openPopupImg);
};

function popupImgClose (event) {
    popupImg.classList.remove('popup_opend');
};

function likeButton (evt) {
    evt.target.closest('.elements__like').classList.toggle('elements__like_active'); 
};

function deleteElement (evt) {
    evt.target.closest('.elements__card').remove(); 
};

function openPopupImg (evt) {
    popupImg.classList.add('popup_opend-img');
    popupImgImg.src = evt.target.closest('.elements__photo').src;
    popupImgText.textContent = evt.target.closest('.elements__card').querySelector('.elements__text').textContent;
    document.addEventListener('keydown', handleEscapeKeyPressPopupImg);
};

const closePopupImg = () => {
    popupImg.classList.remove('popup_opend-img');
    document.removeEventListener('keydown', handleEscapeKeyPressPopupImg);
};

cardForm.addEventListener('submit', addCard);
elementClose.addEventListener('click', closePopupImg);

const handlePopupOverlayClick = (e) => {
    if (e.currentTarget == e.target) {
        closePopup(e.target)
    }
};

const handlePopupOverlayClickImg = (e) => {
    if (e.currentTarget == e.target) {
        closePopupImg();
    }
};

const handleEscapeKeyPress = (e) => {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      } 
    }
};

const handleEscapeKeyPressPopupImg = (e) => {
    if (e.key === "Escape") {
      const openedPopupImg = document.querySelector('.popup_opend-img');
      if (openedPopupImg) {
        closePopupImg();
      } 
    }
};

popupList.forEach(popupElement => {
    popupElement.addEventListener('click', handlePopupOverlayClick);
});

popupList.forEach(popupElement => {
    popupElement.addEventListener('click', handlePopupOverlayClickImg);
});