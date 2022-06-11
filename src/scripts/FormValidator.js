export default class FormValidator {

    constructor(settings, formElement) {
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
        this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._errorClass);
        errorElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._errorClass);
        errorElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    resetErrors() {
        this._inputList.forEach((formInput) => {
            this._hideInputError(formInput);
        });
        this._toggleButtonState();
    }

    enableValidation() {
        this._inputList.forEach((inputElement) => {
            const self = this;
            inputElement.addEventListener('input', function() {
                self._checkInputValidity(inputElement);
                self._toggleButtonState();
            })
        })
    }

}