const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-box',
  errorSelector: '.error',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__form-box_type_error',
  errorClass: 'error_visible'
};


const clearErrorMessages = (popup) => {
  const formErrorList = popup.querySelectorAll(params.errorSelector);
  const formsInputList = popup.querySelectorAll(params.inputSelector);
  
  formErrorList.forEach(erElement => {
    erElement.textContent = '';
    erElement.classList.remove(params.errorClass);
  });
  formsInputList.forEach(formBoxElement => {
    formBoxElement.classList.remove(params.inputErrorClass);
  });
};
  
  
const setSubmitBtnState = (params, btnElement, isEnabled) => {
  if (!isEnabled) {
    btnElement.setAttribute('disabled', true);
    btnElement.classList.add(params.inactiveButtonClass);
  } else {
    btnElement.removeAttribute('disabled');
    btnElement.classList.remove(params.inactiveButtonClass);
  }
};
  
const showInputError = (params, formElement, boxElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${boxElement.id}-error`);
  boxElement.classList.add(params.inputErrorClass);
  // console.log(inputElement);
  // console.log(errorElement);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = errorMessage;
};
  

const hideInputError = (params, formElement, boxElement) => {
  const errorElement = formElement.querySelector(`#${boxElement.id}-error`);
  boxElement.classList.remove(params.inputErrorClass);
    
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};
  

const checkInputValidity = (params, formElement, boxElement) => {
  if (!boxElement.validity.valid) {
    showInputError(params, formElement, boxElement, boxElement.validationMessage);
  } else {
    hideInputError(params, formElement, boxElement);
  }
};
  
  
const setEventListeners = (params, formElement) => {
  const submitBtn = formElement.querySelector(params.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(params, formElement, inputElement);
  
      if (formElement.checkValidity()) {
        setSubmitBtnState(params, submitBtn, true);
      } else {
        setSubmitBtnState(params, submitBtn, false);
      }
    });
  });
};
  
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(params, formElement);
  });
};
  
enableValidation(params);






