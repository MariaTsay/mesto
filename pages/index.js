import { Card } from '../components/Card.js';
import { config, FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/initialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

//общие переменные
const popups = document.querySelectorAll('.popup');

//переменные для редактирования профиля//
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-job');

//переменные для добавления карточек//
const cardPopup = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-place'];
const cardAddBtn = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__text_type_place-name');
const cardLinkInput = document.querySelector('.popup__text_type_place-link');
const cardListSelector = document.querySelector('.places__list');
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
    popupWithImage.openPopup({ name, link })
}

//добавление карточки
function addCard(cardListSelector, cardElement) {
  cardListSelector.prepend(cardElement);
};

//перебор массива с карточками
initialCards.forEach((cardElement) => {
  addCard(cardListSelector, createNewCard(cardElement.name, cardElement.link))
});



//открытие формы редактирования
function openEditProfilePopup() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(profileEditPopup);
}




//создание экземпляра класса Section
const cardsList = new Section({
  renderer: (data) => {
    const card = createNewCard(data);

    cardsList.addItem(card);
  }
}, cardListSelector)

cardsList.renderItems([]);

const userInfo = new UserInfo({
  profileName: '#profile-name',
  profileJob: '#profile-job'
})

const profileForm = new PopupWithForm(profileEditPopup, {
  handleFormSubmit: (data) => {
    nameInput.value = data.name;
    jobInput.value = data.job;

    userInfo.setUserInfo(data.name, data.job);
    profileForm.closePopup();
  }
});

//подтверждение редактирования профиля
function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

//навешивание слушателей на кнопки
profileEditBtn.addEventListener('click', () => {
  openEditProfilePopup(profileEditPopup);
  valProfileForm.resetValidation();
});

const cardPlaceForm = new PopupWithForm(cardPopup, {
  handleFormSubmit: (data) => {
    const card = createNewCard(data);

    cardsList.addItem(card);
    cardPlaceForm.closePopup();
    valCardForm.disableButton('popup__submit-btn_disabled', popupSubmitBtn);
    cardPlaceForm.reset();
  }
});
cardPlaceForm.setEventListeners();


cardAddBtn.addEventListener('click', () => {
  cardPlaceForm.openPopup();
  valCardForm.resetValidation();
});

//создание экземпляров валидация форм
const valProfileForm = new FormValidator(config, profileEditForm);
valProfileForm.enableValidation();
const valCardForm = new FormValidator(config, cardForm);
valCardForm.enableValidation();

const popupWithImage = new PopupWithImage(photoPopup);
popupWithImage.setEventListeners();





profileEditForm.addEventListener('submit', editPopupSubmitHandler);
cardForm.addEventListener('submit', cardPlaceForm);

