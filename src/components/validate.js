const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.inputErrorClass);
};
  
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};
  
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
};
  
export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
}

export function resetValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings); // Убираем ошибки
    });

    toggleButtonState(inputList, buttonElement, settings); // Проверяем кнопку
}