//общие переменные
export const popups = document.querySelectorAll('.popup');

//переменные для редактирования профиля
export const profileEditPopup = document.querySelector('.popup_type_edit');
export const profileEditForm = document.forms['edit-profile'];
export const profileEditBtn = document.querySelector('.profile__profile-info-edit-button');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_about');
export const profileName = document.getElementById('profile-name');
export const profileJob = document.getElementById('profile-job');

//переменные для создания карточек
export const cardPopup = document.querySelector('.popup_type_add');
export const cardForm = document.forms['add-place'];
export const cardAddBtn = document.querySelector('.profile__add-button');
export const cardNameInput = document.querySelector('.popup__text_type_place-name');
export const cardLinkInput = document.querySelector('.popup__text_type_place-link');
export const cardListSelector = document.querySelector('.places__list');
export const popupSubmitBtn = cardForm.querySelector('.popup__submit-btn');


//переменные для увеличения фото
export const photoPopup = document.querySelector('.popup_type_photo');
export const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
export const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');