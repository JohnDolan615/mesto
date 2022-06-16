let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
let profileInfo = document.querySelector('.profile__info');
let popupButton = document.querySelector('.popup__button');

function openPopup(event) {
    popup.classList.add('popup__opened')
}
profileEdit.addEventListener('click', openPopup);

function closePopup(event) {
    popup.classList.remove('popup__opened')
}
popupClose.addEventListener('click', closePopup);

function addName() {
    let name = document.querySelector('.popup__autor');
    let about = document.querySelector('.popup__job');
  
    profileInfo.innerHTML = `
        <div class="profile__name">
            <h1 class="profile__title">${name.value}</h1>
            <button type="button" class="profile__edit"><img src="./images/pen.svg" alt="Редактировать"/></button>
        </div>
        <p class="profile__subtitle">${about.value}</p>
        `;
    name.value = '';
    about.value = '';
  }
  popupButton.addEventListener('click', addName);