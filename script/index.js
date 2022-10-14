

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



const openPopup = (evtPopup) => {
    evtPopup.classList.add('popup_opened');
};

const closePopup = (evtPopup) => {
    evtPopup.classList.remove('popup_opened');
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
    setEventListener(templateCloneCard);
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

function setEventListener(templateCloneCard) {
    const handleLikeButton = templateCloneCard.querySelector('.elements__like');
    handleLikeButton.addEventListener('click', likeButton);
    const handleRemoveButton = templateCloneCard.querySelector('.elements__delete');
    handleRemoveButton.addEventListener('click', deleteElement);
    const handleOpenPopupImg = templateCloneCard.querySelector('.elements__photo');
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
};

const closePopupImg = () => {
    popupImg.classList.remove('popup_opend-img');
};

cardForm.addEventListener('submit', addCard);
elementClose.addEventListener('click', closePopupImg);


