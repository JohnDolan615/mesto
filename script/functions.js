export {openPopup, closePopup, openPopupImg};
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


