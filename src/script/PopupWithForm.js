import Popup from "./Popup.js";
import params from "./params.js";

export default class PopupWithForm extends Popup{
  constructor(handleSubmitClick, popupSelector) {
    super(popupSelector);
    this._handleSubmitClick = handleSubmitClick;
    this._boxs = {};
    this._boxList = Array.from(this._popupSelector.querySelectorAll(params.inputSelector));
    this._form = this._popupSelector.querySelector(params.formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      this._handleSubmitClick(evt, this._getInputValues());
    })
  }

  _getInputValues() {
    this._inputList
      .forEach((input) => {
        this._boxs[input.name] = [input.value];
      })
    return this._boxs;
  }
  
  close() {
    super.close();
    this._form.reset();
  }
  
}