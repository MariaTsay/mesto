console.log('test');

const POPUP_OPENED_CLASS = 'popup_opened';

let popup = document.querySelectorAll('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseBtn = document.querySelector('.popup__close');

//переменные для редактирования профиля//
let editProfilePopup = document.querySelector('.popup_type_edit');
let popupEditForm = document.querySelector('#edit-form');
let editProfileBtn = document.querySelector('.profile__profile-info-edit-button');
let popupEditCloseBtn = document.querySelector('#edit-close');
let popupSubmitBtn = popupForm.querySelector('.popup__submit-btn');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_about');
let profileName = document.getElementById('profile-name');
let profileJob = document.getElementById('profile-job');

//переменные для добавления карточек//
let addPopup = document.querySelector('.popup_type_add');
let addNewCardForm = document.querySelector('#add-form');
let addBtn = document.querySelector('.profile__add-button');
let popupAddCloseBtn = document.querySelector('#edit-close');
let cardNameInput = document.querySelector('.popup__text_type_place-name');
let cardLinkInput = document.querySelector('.popup__text_type_place-link');
const deleteBtn = document.querySelector('.places__delete');
const likeBtn = document.querySelector('.places__like');
const PLACES__LIKE_ACTIVE = document.querySelector('.places__like_active');

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#template-card').content;
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
const cardElementName = cardElement.querySelector(".places__title");
const cardElementImg = cardElement.querySelector(".places__image");

//переменные для увеличения фото//
const photoPopup = document.querySelector('.popup_type_photo');
const photoLink = photoPopup.querySelector('.popup__image');
const photoName = photoPopup.querySelector('.popup__description');

const initialCards = [
  {
    name: 'о.Кайо Сомбреро, Венесуэла',
    link: 'https://i.pinimg.com/736x/49/81/06/498106c4713ad630d18e3885ca397bca.jpg'
  },
  {
    name: 'Коста-Рика',
    link: 'https://c1.wallpaperflare.com/preview/336/846/497/footstep-beach-warm-walking.jpg'
  },
  {
    name: 'Бали',
    link: 'https://i.pinimg.com/736x/bf/bb/c5/bfbbc5fb4ec437e7f572768ff8ffd069.jpg'
  },
  {
    name: 'Таиланд',
    link: 'https://i.pinimg.com/736x/5b/f4/7e/5bf47e98f38c64aff7f4a1ca4b014137.jpg'
  },
  {
    name: 'Розовый пляж, Багамы',
    link: 'https://funart.pro/uploads/posts/2022-08/1661193294_48-funart-pro-p-rozovii-plyazh-bagami-instagram-52.jpg'
  },
  {
    name: 'Мальдивы',
    link: 'https://naekvatoremsk.ru/sites/default/files/pbbwkwb55dc.jpg'
  }
];


const createNewCard = (name, link) => {
  const cardTemplate = document.querySelector('#template-card').content;
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

  return(cardElement);
};

//добавление карточки//
function addCard (cardList, cardElement) {
  cardList.prepend(cardElement);
};

//удаление карточки//
function removeCard (cardElement) {
  cardElement.remove();
};

//лайк-анлайк//
function likeCard (cardElement) {
  cardElement.classList.toggle('places__like_active');
};


initialCards.forEach((cardElement) =>
  addCard(cardList, createNewCard(cardElement.name, cardElement.link))
);

//открытие формы редактирования//
function openEditProfilePopup() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  editProfilePopup.classList.add(POPUP_OPENED_CLASS);
}

//открытие формы добавления карточек//
function openAddPopup() {
addPopup.classList.add(POPUP_OPENED_CLASS);
}

//открытие фото//
function openPhotoPopup() {
photoPopup.classList.add(POPUP_OPENED_CLASS);
}

editProfileBtn.addEventListener('click', openEditProfilePopup);
addBtn.addEventListener('click', openAddPopup);

//закрытие попапа(любого)//
function closePopup(event, popup) {
  let popupForm = document.querySelector('.popup__form');
  let popupCloseBtn = document.querySelector('.popup__close');
    if (!popupForm.contains(event.target) || event.target === popupCloseBtn) {
      popup.classList.remove(POPUP_OPENED_CLASS);
    }
}

editProfilePopup.addEventListener('click', (event) => closePopup(event, editProfilePopup));
addPopup.addEventListener('click', (event) => closePopup(event, addPopup));
photoPopup.addEventListener('click', (event) => closePopup(event, photoPopup));




function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  if (popupForm.contains(evt.target)) {
    editProfilePopup.classList.remove(POPUP_OPENED_CLASS);
  }
}
popupForm.addEventListener('submit', editPopupSubmitHandler);



function addCardSubmitHandler(evt) {
  evt.preventDefault();

  cardNameInput.name = cardElementName.value;
  cardLinkInput.link = cardElementImg.value;
 
  createNewCard(cardNameInput.name, cardLinkInput.link);
  addCard(cardList, cardElement);
  closePopup(addPopup);
}

addNewCardForm.addEventListener('submit', addCardSubmitHandler);

















