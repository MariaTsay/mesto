const POPUP_OPENED_CLASS = 'popup_opened';

const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close');

//переменные для редактирования профиля//
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms ['edit-profile'];
const editProfileBtn = document.querySelector('.profile__profile-info-edit-button');
const popupEditCloseBtn = document.querySelector('#edit-close');

const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_about');
const profileName = document.getElementById('profile-name');
const profileJob = document.getElementById('profile-job');

//переменные для добавления карточек//
const addPopup = document.querySelector('.popup_type_add');
const addNewCardForm = document.forms ['add-place'];
const addBtn = document.querySelector('.profile__add-button');
const popupAddCloseBtn = document.querySelector('#edit-close');
const cardNameInput = document.querySelector('.popup__text_type_place-name');
const cardLinkInput = document.querySelector('.popup__text_type_place-link');
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#template-card').content;


//переменные для увеличения фото//
const photoPopup = document.querySelector('.popup_type_photo');
const popupFullscreenImg = photoPopup.querySelector('.popup__fullscreen-image');
const popupFullscrImgCaption = photoPopup.querySelector('.popup__description');


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

//создание новой карточки и все действия с ней//
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


  cardElementImg.addEventListener('click', () => {
    popupFullscreenImg.setAttribute('src', link);
    popupFullscreenImg.setAttribute('alt', name);
    popupFullscrImgCaption.textContent = name;

    openPopup(photoPopup);
  });

  return (cardElement);
};

//добавление карточки//
function addCard(cardList, cardElement) {
  cardList.prepend(cardElement);
};

//удаление карточки//
function removeCard(cardElement) {
  cardElement.remove();
};

//лайк-анлайк//
function likeCard(cardElement) {
  cardElement.classList.toggle('places__like_active');
};

//перебор массива с карточками//
initialCards.forEach((cardElement) =>
  addCard(cardList, createNewCard(cardElement.name, cardElement.link))
);

//открытие любого попапа//
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//открытие формы редактирования//
function openEditProfilePopup() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(editProfilePopup);
}

//закрытие попапа(любого)//
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//подтверждение редактирования профиля//
function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

const clearInput = () => {
  addNewCardForm.reset();
}

//добавление новой карточки//
const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardName = cardNameInput.value;
  const newCardLink = cardLinkInput.value;
  
  addCard(cardList, createNewCard(newCardName, newCardLink));
  closePopup(addPopup);
  evt.target.reset();
}

//навешивание слушателей на кнопки//
editProfileBtn.addEventListener('click', () => openEditProfilePopup(editProfilePopup))
addBtn.addEventListener('click', () => openPopup(addPopup));

popupCloseBtns.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editProfileForm.addEventListener('submit', editPopupSubmitHandler);
addNewCardForm.addEventListener('submit', addCardSubmitHandler);