import Popup from "./Popup.js";
import params from "../utils/params.js";


export default class PopupConfirm extends Popup {
  constructor(handleSubmitDeleteCard, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(params.formSelector);
    console.log(this._popupForm);
    this._handleSubmitDeleteCard = handleSubmitDeleteCard;
    console.log(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._handleSubmitDeleteCard(evt, this._card);
    });
  };

  open(card) {
    super.open();
    this._card = card;
  };

}