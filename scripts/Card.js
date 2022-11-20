export const initialCards = [
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

export class Card {
    name;
    link;
    templateSelector;
    handleCardClick;
    cardTemplate;
    cardElementName;
    cardElementImg;
    deleteBtn;
    likeBtn;
    

    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._getTemplate();
    }

    //получение темплейта
    _getTemplate() {
        this.cardTemplate = document
        .querySelector('.template-card_type_default')
        .content
        .querySelector('.places__item')
        .cloneNode(true);
    }

    //создание карточки
    generateCard() {

        this.cardElementName = this.cardTemplate.querySelector(".places__title");
        this.cardElementImg = this.cardTemplate.querySelector(".places__image");
        this.deleteBtn = this.cardTemplate.querySelector(".places__delete");
        this.likeBtn = this.cardTemplate.querySelector(".places__like");

        this.cardTemplate.querySelector('.places__title').textContent = this._name;
        this.cardTemplate.querySelector('.places__image').src = this._link;
        this.cardTemplate.querySelector('.places__image').alt = this._name;

        this._setEventListeners();

        return this.cardTemplate;
    }

    //удаление карточки
    _removeCard() {
        this.cardTemplate.remove();
    }

    //лайк-анлайк
    _likeCard() {
        this.likeBtn.classList.toggle('places__like_active');
    }

    //навешивание слушателей
    _setEventListeners() {
        this.deleteBtn.addEventListener("click", () => {
            this._removeCard()
        });
        this.likeBtn.addEventListener("click", () => {
            this._likeCard()
        });
      
      
        this.cardElementImg.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
        });

    }

}