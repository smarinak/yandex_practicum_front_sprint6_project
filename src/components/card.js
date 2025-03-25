import {openModal} from "../components/modal.js";
import { deleteCard, addLike, deleteLike } from '../components/api.js'

// Функция для создания карточки на основе template
export function createCard(data, imagePopup, popupImage) {
    // Получаем шаблон
    const template = document.getElementById('card-template').content;
    const cardElement = template.querySelector('.card').cloneNode(true);
  
    // Находим элементы карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeAmount = cardElement.querySelector('.card__like-amount');
  
    // Заполняем карточку данными
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    likeAmount.textContent = data.likes.length;

    if (data.likes.some(obj => obj._id === "0c7fbdb2906d06073a89945e")) {
        likeButton.classList.add('card__like-button_is-active')
        addLike(data._id)
        
    } else {
        likeButton.classList.remove('card__like-button_is-active')
        deleteLike(data._id);
    }

    // Добавляем слушатель для лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active')
        ? addLike(data._id)
        .then((updatedData) => {
            likeAmount.textContent = updatedData.likes.length;
        })
            .catch((err) => {
            console.log(err);
        })
        : deleteLike(data._id)
        .then((updatedData) => {
            likeAmount.textContent = updatedData.likes.length;
        })
            .catch((err) => {
            console.log(err);
        });
    });

    if (data.owner._id == "0c7fbdb2906d06073a89945e") {
        const deleteButton = cardElement.querySelector('.card__delete-button');
        // Устанавливаем обработчик для удаления карточки
        deleteButton.addEventListener('click', () => {
            const card = deleteButton.closest('.card');
            if (card) {
                card.remove();
                deleteCard(data._id);
            }
        });
    } else {
        cardElement.querySelector('.card__delete-button').remove();
    }

    // Открытие поп-апа с картинкой
    cardImage.addEventListener('click', () => {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        openModal(imagePopup);
    });
  
    // Возвращаем готовую карточку
    return cardElement;
  }