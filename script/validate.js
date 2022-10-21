const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-box',
  errorSelector: '.error',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'popup__form-box_type_error',
  errorClass: 'error_visible'
};


const clearErrorMessages = (popup) => {
  const formErrorList = popup.querySelectorAll(params.errorSelector);
  const formsInputList = popup.querySelectorAll(params.inputSelector);
  
  formErrorList.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove(params.errorClass);
  });
  formsInputList.forEach(formInputElement => {
    formInputElement.classList.remove(params.inputErrorClass);
  });
};
  
  
const setSubmitBtnState = (params, buttonElement, isEnabled) => {
  if (!isEnabled) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(params.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(params.inactiveButtonClass);
  }
};
  
const showInputError = (params, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  // console.log(inputElement);
  // console.log(errorElement);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = errorMessage;
};
  

const hideInputError = (params, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
    
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};
  

const checkInputValidity = (params, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(params, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(params, formElement, inputElement);
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






