let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupClose = document.querySelector('.popup__close');
let author = document.querySelector('.popup__form-box_author');
let job = document.querySelector('.popup__form-box_job');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileEdit = document.querySelector('.profile__edit');
let profileTitle = document.querySelector('.profile__title');

function closePopup(event){
    popup.classList.remove('popup_opened')
}
popupClose.addEventListener('click', closePopup)
function openedPopup(event){
    author.value = profileTitle.textContent;
    job.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened')
}
profileEdit.addEventListener('click', openedPopup)
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = author.value;
    profileSubtitle.textContent = job.value;
    closePopup() 
}
formElement.addEventListener('submit', formSubmitHandler);