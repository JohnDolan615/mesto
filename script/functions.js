export {openPopup, closePopup, openPopupImg, handleEscapeKeyPress};
const popupImg = document.querySelector('#popup-img');
const popupImgImg = popupImg.querySelector('.popup__image');
const popupImgText = popupImg.querySelector('.popup__text');



const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeKeyPress);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeKeyPress);
};

function openPopupImg(name, link){
    openPopup(popupImg);
    // popupImgImg.src = evt.target.closest('.elements__photo').src;
    // popupImgImg.alt = evt.target.closest('.elements__photo').alt;
    // popupImgText.textContent = evt.target.closest('.elements__card').querySelector('.elements__text').textContent;
    popupImgImg.src = link;
    popupImgImg.alt = name;
    popupImgText.textContent = name;
};

const handleEscapeKeyPress = (e) => {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      } 
    }
};


