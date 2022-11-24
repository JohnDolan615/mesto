import Popup from "./Popup.js";


export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImgImg = document.querySelector('.popup__image');
        this._popupImgText = document.querySelector('.popup__text');
    }

    open({name, link}){
        super.open();
        this._popupImgImg.src = link;
        this._popupImgImg.alt = name;
        this._popupImgText.textContent = name;
      };
}
