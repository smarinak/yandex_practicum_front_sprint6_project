import './pages/index.css';
import {enableValidation} from "./components/validate.js";
import {createCard} from "./components/card.js";
import {openModal, closeModal} from "./components/modal.js";
// import {initialCards} from "./scripts/cards.js"
import { getUserInfo, getInitialCards, changeUserInfo, addNewCard } from './components/api.js'

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

getUserInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
    .then((initialCards) => {
        renderInitialCards(initialCards);
        console.log(initialCards)
    })
    .catch((err) => {
    console.log(err);
}); 

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input-error_active'
  }
  
// Получаем поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');

// Получаем список для размещения карточек
const cardList = document.querySelector('.places__list');

// Функция для добавления всех карточек из массива
function renderInitialCards(cards) {
    cards.forEach(cardData => {
        const card = createCard(cardData, imagePopup, popupImage);
        cardList.append(card);
    });
}

// Рендерим начальные карточки
// renderInitialCards(initialCards);

// Находим все кнопки закрытия поп-апов
const closeButtons = document.querySelectorAll('.popup__close');

// Добавляем обработчик для каждой кнопки
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup'); // Находим соответствующий поп-ап
    closeModal(popup); // Закрываем поп-ап
  });
});

// Добавляем обработчик клика на оверлей для всех попапов
document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        // Проверяем, что клик был именно по оверлею (а не по контенту)
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
});

// Обработчики для поп-апа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
// const profileName = document.querySelector('.profile__title');
// const profileDescription = document.querySelector('.profile__description');

// Открытие поп-апа редактирования профиля
function handleEditButtonClick() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

// Сохранение данных из формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    changeUserInfo(nameInput.value, jobInput.value)
    closeModal(profilePopup);
}

// Добавляем обработчики событий
editButton.addEventListener('click', handleEditButtonClick);
profileFormElement.addEventListener('submit', handleProfileFormSubmit)

// Обработчики для поп-апа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

// Открытие поп-апа добавления карточки
function handleAddButtonClick() {
    cardFormElement.reset();
    openModal(cardPopup);
}

// Сохранение данных из формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard({
        name: cardNameInput.value,
        link: cardLinkInput.value
    }, imagePopup, popupImage);
    addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    }); 
    cardList.prepend(newCard);
    closeModal(cardPopup);
}

// Добавляем обработчики событий
addButton.addEventListener('click', handleAddButtonClick);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Добавляем анимацию всем поп-апам
function addAnimationToPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      popup.classList.add('popup_is-animated');
    });
  }
  
// Вызываем функцию добавления анимации при загрузке скрипта
addAnimationToPopups();
  
enableValidation(validationSettings); 