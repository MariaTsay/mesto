import { Card } from './Card.js';
import { config, FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

//общие переменные
const popups = document.querySelectorAll('.popup');

//переменные для редактирования профиля//
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.getElementById('profile-name');
const profileJob = document.getElementById('profile-job');

//переменные для добавления карточек//
const cardPopup = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-place'];
const cardAddBtn = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__text_type_place-name');
const cardLinkInput = document.querySelector('.popup__text_type_place-link');
const cardList = document.querySelector('.places__list');
const popupSubmitBtn = cardForm.querySelector('.popup__submit-btn');

//переменные для увеличения фото//
const photoPopup = document.querySelector('.popup_type_photo');
const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');

//создание новой карточки и все действия с ней//
const createNewCard = (name, link) => {
  const card = new Card(name, link, '.template-card_type_default', handleCardClick);
  const cardElement = card.generateCard();

  return (cardElement);
}

//клик по картинке для увеличения фото
function handleCardClick(name, link) {
  popupFullscreenImg.setAttribute('src', link);
  popupFullscreenImg.setAttribute('alt', name);
  popupFullscrImgCaption.textContent = name;

  openPopup(photoPopup);
}

//добавление карточки
function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
};

//перебор массива с карточками
initialCards.forEach((cardElement) => {
  addCard(cardList, createNewCard(cardElement.name, cardElement.link))
});

//открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //обработчик для закрытия по esc
  document.body.addEventListener('keydown', keyHandler);
}

//открытие формы редактирования
function openEditProfilePopup() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(profileEditPopup);
}

//закрытие попапа(любого)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', keyHandler);
}

//перебор попапов и закрытие их по крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

//закрытие по esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

//подтверждение редактирования профиля
function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

//добавление новой карточки
const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardLink = cardLinkInput.value;

  addCard(cardList, createNewCard(newCardName, newCardLink));
  closePopup(cardPopup);
  valCardForm.disableButton('popup__submit-btn_disabled', popupSubmitBtn);
  cardForm.reset();
}

//навешивание слушателей на кнопки
profileEditBtn.addEventListener('click', () => openEditProfilePopup(profileEditPopup));
cardAddBtn.addEventListener('click', () => {
  openPopup(cardPopup);
  valCardForm.resetValidation();
});

profileEditForm.addEventListener('submit', editPopupSubmitHandler);
cardForm.addEventListener('submit', addCardSubmitHandler);

//создание экземпляров валидация форм
const valProfileForm = new FormValidator(config, profileEditForm);
valProfileForm.enableValidation();
const valCardForm = new FormValidator(config, cardForm);
valCardForm.enableValidation();