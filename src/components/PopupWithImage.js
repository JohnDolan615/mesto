import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgImg = this._popup.querySelector('.popup__image');
    this._imgText = this._popup.querySelector('.popup__text');
  };

  open({ name, link }) {
    super.open();
    this._imgImg.src = link;
    this._imgImg.alt = name;
    this._imgText.textContent = name;
  };

}