import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgImg = this._popup.querySelector('.popup__image');
        this._popupImgText = this._popup.querySelector('.popup__text');
    };
    
    openPopup({ name, link }) {
        this.open();
        this._popupImgImg.src = link;
        this._popupImgImg.alt = name;
        this._popupImgText.textContent = name;
        
    }; 
}
