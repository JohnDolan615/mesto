

const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const profileEditButton = document.querySelector('.profile__edit');
const author = popup.querySelector('.popup__form-box_type_author');
const job = popup.querySelector('.popup__form-box_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupCard = document.querySelector('.popup-card');
const profileAddCard = document.querySelector('.profile__add');
const popupCardAddClose = popupCard.querySelector('.popup-card__close');
const popupImg = document.querySelector('.popup-img');
const elementClose = popupImg.querySelector('.popup-img__close');
const elementsList = document.querySelector('.elements');
const itemsTemplate = document.querySelector('.list-item-template').content;
const titleElementForm = popupCard.querySelector('.popup-card__input_name');
const inputElementForm = popupCard.querySelector('.popup-card__input_url');
const submitElementForm = popupCard.querySelector('.popup-card__form');


const togglePopup = () => {
    author.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    popup.classList.toggle('popup_opened');
};

profileEditButton.addEventListener('click', () => {
    togglePopup();
});

popupClose.addEventListener('click', () =>{
    togglePopup();
});

const togglePopupCard = () => {
    popupCard.classList.toggle('popup-card_opend');
};

profileAddCard.addEventListener('click', () => {
    togglePopupCard();
});

popupCardAddClose.addEventListener('click', () => {
    togglePopupCard();
});


const formSubmitHandler = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = author.value;
    profileSubtitle.textContent = job.value;
    togglePopup(); 
};
formElement.addEventListener('submit', formSubmitHandler);



 const createCard = (text) => {
    const templateClone = itemsTemplate.cloneNode(true);
        templateClone.querySelector('.elements__text').textContent = text.name;
        templateClone.querySelector('.elements__photo').src = text.link;
    setEventListener(templateClone);
    return templateClone;

 };

 const renderCard = (item) => {
    elementsList.prepend(item);
};

initialCards.forEach((evt) => {
    renderCard(createCard (evt));
});
 
const addCard = (event) => {
    event.preventDefault();
    renderCard(createCard({name:  titleElementForm.value, link: inputElementForm.value}));
    togglePopupCard();
};

const clearInputForm = () => {
    titleElementForm.value = '';
    inputElementForm.value = '';
};

function setEventListener(templateClone) {
    const handleLikeButton = templateClone.querySelector('.elements__like');
    handleLikeButton.addEventListener('click', likeButton);
    const handleRemoveButton = templateClone.querySelector('.elements__delete');
    handleRemoveButton.addEventListener('click', deleteElement);
    const handleOpenPopupImg = templateClone.querySelector('.elements__photo');
    handleOpenPopupImg.addEventListener('click', openPopupImg);
};

function popupImgClose (event) {
    popupImg.classList.remove('popup-img_opend');
};

function likeButton (evt) {
    evt.target.closest('.elements__like').classList.toggle('elements__like_active'); 
};

function deleteElement (evt) {
    evt.target.closest('.elements__card').remove(); 
};

function openPopupImg (evt) {
    const popupImg = document.querySelector('.popup-img');
    popupImg.classList.add('popup-img_opend');
    const bodyImgImg = document.querySelector('.popup-img__image');
    bodyImgImg.src = evt.target.closest('.elements__photo').src;
    const bodyImgText = document.querySelector('.popup-img__text');
    bodyImgText.textContent = evt.target.closest('.elements__card').querySelector('.elements__text').textContent;
};

const closePopupImg = () => {
    popupImg.classList.remove('popup-img_opend');
};

submitElementForm.addEventListener('submit', addCard);
elementClose.addEventListener('click', closePopupImg);


