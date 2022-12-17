export class FormValidator{
    constructor(param, formElementType){
        this._param = param;
        this._formElementType = formElementType;
        this._boxList = Array.from(this._formElementType.querySelectorAll(this._param.inputSelector));
        this._buttonSubmit = this._formElementType.querySelector(this._param.submitButtonSelector);
    }       


    _showInputError = (boxElement, errorMessage) => {
        const  errorElement = document.getElementById(`${boxElement.id}-error`);
        
    
        boxElement.classList.add(this._param.inputErrorClass);
        errorElement.textContent = errorMessage;

        errorElement.classList.add(this._param.errorClass);
    };

  
    _hideInputError = (boxElement) => {
        const errorElement = document.getElementById(`${boxElement.id}-error`);
        boxElement.classList.remove(this._param.inputErrorClass);
        console.log(boxElement);
        errorElement.textContent = '';
      };

    _checkBoxValidity(boxElement){
        if (!boxElement.validity.valid) {
            this._showInputError(boxElement, boxElement.validationMessage);
          } else {
            this._hideInputError(boxElement);
          }
    }

    _hasInvalidBox = () =>{
        return this._boxList.some((boxElement) => {
            return !boxElement.validity.valid;
        })
    }

    resetBoxs = () =>{
        // const boxs = Array.from(this._formElementType.querySelectorAll('.popup__form-box'));
        // boxs.forEach((boxElement) => {
        //     const errorElement = document.getElementById(`${boxElement.id}-error`);
        //     boxElement.classList.remove('popup__form-box_type_error');
        //     errorElement.textContent = '';
        // })
        this._boxList.forEach((boxElement) => {
            this._hideInputError(boxElement);
          });
    }

    inactiveButton = () =>{
        this._buttonSubmit.classList.add(this._param.inactiveButtonClass);
        this._buttonSubmit.setAttribute('disabled', true);
    }

    activeButton = () =>{
        this._buttonSubmit.classList.remove(this._param.inactiveButtonClass);
        this._buttonSubmit.removeAttribute('disabled', 'disabled');
    }

    buttonState = () =>{
        if (this._hasInvalidBox()){
            this.inactiveButton();
          } else {
            this.activeButton();
        }
    }

    _setEventListeners = () => {
        this.buttonState();
        this._boxList.forEach((boxElement) => {
            boxElement.addEventListener('input', () => {
                this._checkBoxValidity(boxElement);
                this.buttonState();
            })
        })
    }

    enableValidation = () => {
        this._setEventListeners();
    }
}