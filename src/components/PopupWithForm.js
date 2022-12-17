import Popup from "./Popup.js";
import params from "../utils/params.js";

export default class PopupWithForm extends Popup {
  constructor(handleSubmitClick, popupSelector) {
    super(popupSelector);
    this._handleSubmitClick = handleSubmitClick;
    this._boxes = {};
    this._boxList = Array.from(this._popup.querySelectorAll(params.inputSelector));
    this._form = this._popup.querySelector(params.formSelector);
    this._buttonSubmitCreate = "Создать";
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._handleSubmitClick(
        evt,
        this._getInputValues(),
        this._buttonSubmitCreate
      );
    });
  };

  _getInputValues() {
    this._boxList
      .forEach((input) => {
        this._boxes[input.name] = input.value;
      });
    return this._boxes;
  };

  close() {
    super.close();
    this._form.reset();
  };

};