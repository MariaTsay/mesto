const POPUP_OPENED_CLASS = 'popup_opened';

const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const popupForm = document.querySelector('.popup__form');

//переменные для редактирования профиля//
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
const popupEditCloseBtn = document.querySelector('#edit-close');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.getElementById('profile-name');
const profileJob = document.getElementById('profile-job');

//переменные для добавления карточек//
const cardPopup = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-place'];
const cardAddBtn = document.querySelector('.profile__add-button');
const popupAddCloseBtn = document.querySelector('#edit-close');
const cardNameInput = document.querySelector('.popup__text_type_place-name');
const cardLinkInput = document.querySelector('.popup__text_type_place-link');
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#template-card').content;
const popupSubmitBtn = cardForm.querySelector('.popup__submit-btn');

//переменные для увеличения фото//
const photoPopup = document.querySelector('.popup_type_photo');
const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');

//создание новой карточки и все действия с ней//
const createNewCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardElementName = cardElement.querySelector(".places__title");
  const cardElementImg = cardElement.querySelector(".places__image");
  const deleteBtn = cardElement.querySelector(".places__delete");
  const likeBtn = cardElement.querySelector(".places__like");

  cardElementImg.src = link;
  cardElementImg.alt = name;

  cardElementName.textContent = name;

  deleteBtn.addEventListener("click", () => removeCard(cardElement));
  likeBtn.addEventListener("click", () => likeCard(likeBtn));


  cardElementImg.addEventListener('click', () => {
    popupFullscreenImg.setAttribute('src', link);
    popupFullscreenImg.setAttribute('alt', name);
    popupFullscrImgCaption.textContent = name;

    openPopup(photoPopup);
  });

  return (cardElement);
};

//добавление карточки
function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
};

//удаление карточки
function removeCard(cardElement) {
  cardElement.remove();
};

//лайк-анлайк
function likeCard(cardElement) {
  cardElement.classList.toggle('places__like_active');
};

//перебор массива с карточками
initialCards.forEach((cardElement) =>
  addCard(cardList, createNewCard(cardElement.name, cardElement.link))
);

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

const clearInput = () => {
  cardForm.reset();
}

//добавление новой карточки
const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardLink = cardLinkInput.value;

  addCard(cardList, createNewCard(newCardName, newCardLink));
  closePopup(cardPopup);
  disableButton({inactiveButtonClass: 'popup__submit-btn_disabled'}, popupSubmitBtn);
  cardForm.reset();
}

//навешивание слушателей на кнопки
profileEditBtn.addEventListener('click', () => openEditProfilePopup(profileEditPopup));
cardAddBtn.addEventListener('click', () => openPopup(cardPopup));

profileEditForm.addEventListener('submit', editPopupSubmitHandler);
cardForm.addEventListener('submit', addCardSubmitHandler);