import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { 
  profileEditForm,
  profileEditBtn,
  nameInput,
  jobInput,
  cardForm,
  cardAddBtn,
  cardListSelector,
  avatarEditForm,
  avatarEditBtn,
  config
} from '../utils/constants.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

let userId;

const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '14f36213-36c3-4f37-8ced-ce7418e7c375',
    'Content-Type': 'application/json'
  }
}

//создание экземпляра класса Api
const api = new Api(apiOptions);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    user.setUserInfo(userData);
    user.setUserAvatar(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 

//создание экземпляра класса UserInfo
const user = new UserInfo({
  profileName: '#profile-name',
  profileJob: '#profile-job',
  avatarSelector: '.profile__avatar-pic'
})

//создание экземпляра класса PopupWithForm для редактирования аватара
const avatarForm = new PopupWithForm('.popup_type_avatar', 
  async ({avatarlink}) => {
  try {
    await api.editAvatar({avatarlink}).then(data => {
      user.setUserAvatar(data);
      avatarForm.closePopup();
    })

  } catch(err) {
    console.log(err); // выведем ошибку в консоль
  }
});
avatarForm.setEventListeners();

//создание экземпляра класса PopupWithForm для редактирования профиля
const profileForm = new PopupWithForm('.popup_type_edit', 
  async ({name, job}) => {
    try{
      await api.setUserInfo({name, job}).then(data => {
        user.setUserInfo(data);
        profileForm.closePopup();
      })
     
    } catch(err) {
      console.log(err); // выведем ошибку в консоль
    }
    
  } 
);
profileForm.setEventListeners();

//создание экземпляра класса PopupWithForm для добавления карточки
const cardPlaceForm = new PopupWithForm('.popup_type_add', 
  async ({cardname, cardlink}) => {
  
  try {
    await api.createCard({cardname, cardlink}).then(data => {
      const card = createNewCard(data);
      cardsList.addItem(card);
      cardPlaceForm.closePopup();
    })
    
  } catch(err) {
    console.log(err); // выведем ошибку в консоль
  }

});
cardPlaceForm.setEventListeners();

//создание новой карточки и все действия с ней//
const createNewCard = (data) => {
  const card = new Card(
    {
      name: data.name, 
      link: data.link, 
      likes: data.likes,
      id: data._id, 
      userId, 
      creatorId: data.owner._id
    }, 
    '.template-card_type_default', 
    handleCardClick,

    async () => {
      popupWithConfirmation.openPopup(() => {
        api.deleteCard(card._id).then(res => {
          card.removeCard(res);
          popupWithConfirmation.closePopup();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
        
      })
    },

    async (card, isLiked) => {
      try {
        const res = isLiked
        ? await api.likeCard(card._id)
        : await api.dislikeCard(card._id)

        card.likeCard(res)
      } catch(err) {
        console.log(err); // выведем ошибку в консоль
      }
      
    }
  )
  const cardElement = card.generateCard();

  return cardElement;
};

//создание экземпляра класса Section
const cardsList = new Section({
  renderer: (data) => {
    const card = createNewCard(data);

    cardsList.addItem(card);
  }
}, cardListSelector)

//создание экземпляра класса PopupWithConfirmation
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_delete')
popupWithConfirmation.setEventListeners();

//клик по картинке для увеличения фото
function handleCardClick(name, link) {
    popupWithImage.openPopup({ name, link })
}

//создание экземпляра класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

//навешивание слушателей на кнопки
profileEditBtn.addEventListener('click', () => {
  
  const info = user.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;

  profileForm.openPopup();
  valProfileForm.resetValidation();
});

//навешивание слушателя на кнопку "плюсик"
cardAddBtn.addEventListener('click', () => {
  cardPlaceForm.openPopup();
  valCardForm.resetValidation();
});

//навешивание слушателя на изображение аватара
avatarEditBtn.addEventListener('click', () => {
  avatarForm.openPopup();
  valAvatarForm.resetValidation();
});

//создание экземпляров валидация форм
const valProfileForm = new FormValidator(config, profileEditForm);
valProfileForm.enableValidation();
const valCardForm = new FormValidator(config, cardForm);
valCardForm.enableValidation();
const valAvatarForm = new FormValidator(config, avatarEditForm);
valAvatarForm.enableValidation();