//общие переменные
const popups = document.querySelectorAll('.popup');

//переменные для редактирования профиля
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.getElementById('profile-name');
const profileJob = document.getElementById('profile-job');

//переменные для создания карточек
const cardPopup = document.querySelector('.popup_type_add');
const cardForm = document.forms['add-place'];
const cardAddBtn = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__text_type_place-name');
const cardLinkInput = document.querySelector('.popup__text_type_place-link');
const cardList = document.querySelector('.places__list');

//переменные для увеличения фото
const photoPopup = document.querySelector('.popup_type_photo');
const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');

