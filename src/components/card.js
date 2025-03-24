import {openModal} from "../components/modal.js";

// Функция для создания карточки на основе template
export function createCard(data, imagePopup, popupImage) {
    // Получаем шаблон
    const template = document.getElementById('card-template').content;
    const cardElement = template.querySelector('.card').cloneNode(true);
  
    // Находим элементы карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    // Заполняем карточку данными
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // Добавляем слушатель для лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Устанавливаем обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        const card = deleteButton.closest('.card');
        if (card) {
        card.remove();
        }
    });

    // Открытие поп-апа с картинкой
    cardImage.addEventListener('click', () => {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        openModal(imagePopup);
    });
  
    // Возвращаем готовую карточку
    return cardElement;
  }