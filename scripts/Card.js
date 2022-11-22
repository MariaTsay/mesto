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
        .querySelector(this._templateSelector)
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