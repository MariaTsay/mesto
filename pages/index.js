import { Card } from '../components/Card.js';
import { config, FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/initialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { 
  profileEditPopup,
  profileEditForm,
  profileEditBtn,
  nameInput,
  jobInput,
  cardPopup,
  cardForm,
  cardAddBtn,
  cardListSelector,
  popupSubmitBtn,
  photoPopup,
} from '../utils/constants.js'

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

//создание экземпляра класса Section
const cardsList = new Section({
  renderer: (data) => {
    const card = createNewCard(data.name, data.link);

    cardsList.addItem(card);
  }
}, cardListSelector)

cardsList.renderItems(initialCards);

//создание экземпляра класса UserInfo
const user = new UserInfo({
  profileName: '#profile-name',
  profileJob: '#profile-job'
})

//создание экземпляра класса PopupWithForm для редактирования профиля
const profileForm = new PopupWithForm(profileEditPopup, 
  ({name, job}) => {
  
    nameInput.value = name;
    jobInput.value = job;

    user.setUserInfo(name, job);
    profileForm.closePopup();
  }
);
profileForm.setEventListeners();

//навешивание слушателей на кнопки
profileEditBtn.addEventListener('click', () => {
  
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;

  profileForm.openPopup();
  valProfileForm.resetValidation();
});


//создание экземпляра класса PopupWithForm для добавления карточки
const cardPlaceForm = new PopupWithForm(cardPopup, ({cardname, cardlink}) => {
    const card = createNewCard(cardname, cardlink);

    cardsList.addItem(card);
    cardPlaceForm.closePopup();
    valCardForm.disableButton('popup__submit-btn_disabled', popupSubmitBtn);
  }
);
cardPlaceForm.setEventListeners();

//навешивание слушателя на кнопку "плюсик"
cardAddBtn.addEventListener('click', () => {
  cardPlaceForm.openPopup();
  valCardForm.resetValidation();
});

//создание экземпляров валидация форм
const valProfileForm = new FormValidator(config, profileEditForm);
valProfileForm.enableValidation();
const valCardForm = new FormValidator(config, cardForm);
valCardForm.enableValidation();

//создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage(photoPopup);
popupWithImage.setEventListeners();





//profileEditForm.addEventListener('submit', editPopupSubmitHandler);
//cardForm.addEventListener('submit', cardPlaceForm);

