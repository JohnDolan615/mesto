import Popup from "./Popup.js";
import params from "../utils/params.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector(params.popupPictureSelector);
    this._popupText = this._popup.querySelector(params.popupPictureTextSelector);
  };

  open({ name, link }) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupText.textContent = name;
  };

}