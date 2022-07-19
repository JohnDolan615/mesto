let form = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let popupClose = document.querySelector('.popup__close');
let author = document.querySelector('.popup__form-box_author');
let job = document.querySelector('.popup__form-box_job');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileEdit = document.querySelector('.profile__edit');
let profileTitle = document.querySelector('.profile__title');

popupClose.addEventListener('click', function () {
    form.classList.remove('popup_opened')
})
profileEdit.addEventListener('click', function () {
    form.classList.add('popup_opened')
    author.placeholder = profileTitle.textContent;
    job.placeholder = profileSubtitle.textContent;
})
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = author.value;
    profileSubtitle.textContent = job.value;
    form.classList.remove('popup_opened')
}
formElement.addEventListener('submit', formSubmitHandler);