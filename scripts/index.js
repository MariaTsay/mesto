import { initialCards, Card } from './Card.js';
import { config, FormValidator } from './FormValidator.js';

//общие переменные
const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close');

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

popupCloseBtns.forEach((button) => {
  const popupCloseBtn = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupCloseBtn));
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => closePopup(evt.target));
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
cardAddBtn.addEventListener('click', () => openPopup(cardPopup));

profileEditForm.addEventListener('submit', editPopupSubmitHandler);
cardForm.addEventListener('submit', addCardSubmitHandler);

//создание экземпляров валидация форм
const valProfileForm = new FormValidator(config, profileEditForm);
valProfileForm.enableValidation();
const valCardForm = new FormValidator(config, cardForm);
valCardForm.enableValidation();

//создание экземпляров карточек
const card1 = new Card('о.Кайо Сомбреро, Венесуэла', 'https://i.pinimg.com/736x/49/81/06/498106c4713ad630d18e3885ca397bca.jpg');
card1.generateCard();
const card2 = new Card('Коста-Рика', 'https://c1.wallpaperflare.com/preview/336/846/497/footstep-beach-warm-walking.jpg');
card2.generateCard();
const card3 = new Card('Бали', 'https://i.pinimg.com/736x/bf/bb/c5/bfbbc5fb4ec437e7f572768ff8ffd069.jpg');
card3.generateCard();
const card4 = new Card('Таиланд', 'https://i.pinimg.com/736x/5b/f4/7e/5bf47e98f38c64aff7f4a1ca4b014137.jpg');
card4.generateCard();
const card5 = new Card('Розовый пляж, Багамы', 'https://funart.pro/uploads/posts/2022-08/1661193294_48-funart-pro-p-rozovii-plyazh-bagami-instagram-52.jpg');
card5.generateCard();
const card6 = new Card('Мальдивы', 'https://naekvatoremsk.ru/sites/default/files/pbbwkwb55dc.jpg');
card6.generateCard();