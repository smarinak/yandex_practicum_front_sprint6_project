import {resetValidation} from "../components/validate.js";
import {validationSettings} from "../index.js";

// Функция для открытия поп-апа
export function openModal(popup) {
    // Перед открытием поп-апа сбрасываем валидацию
    const formElement = popup.querySelector(validationSettings.formSelector);
    if (formElement) {
        resetValidation(formElement, validationSettings);
    }

    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

// Функция для закрытия поп-апа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

// Добавляем обработчик клика на esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}