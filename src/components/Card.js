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
    

    constructor(data, templateSelector, handleCardClick, onRemove, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = data.userId;
        this._creatorId = data.creatorId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._getTemplate();
        this.cardElementName = this.cardTemplate.querySelector(".places__title");
        this.cardElementImg = this.cardTemplate.querySelector(".places__image");
        this.deleteBtn = this.cardTemplate.querySelector(".places__delete");
        this.likeBtn = this.cardTemplate.querySelector(".places__like");
        this._onRemove = onRemove;
        this.handleRemove = this.handleRemove.bind(this);
        this._likesCounter = this.cardTemplate.querySelector(".places__like-counter");
        this._handleLikeClick = handleLikeClick;
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
        this.cardElementName.textContent = this._name;
        this.cardElementImg.src = this._link;
        this.cardElementImg.alt = this._name;
        
        this.checkDeleteBtn();
        this._setEventListeners();

        return this.cardTemplate;
    }

    //удаление карточки
    removeCard() {
        this.cardTemplate.remove();
    }

    //подтверждение удаления карточки
    handleRemove() {
        this._onRemove(this)
    }

    //проверка, могу ли я удалить карточку
    checkDeleteBtn() {
        if (this._userId !== this._creatorId) {
            this.deleteBtn.remove();
        }
    }

    //лайк-анлайк
    _likeCard() {
        this.likeBtn.classList.toggle('places__like_active');
    }

    //счетчик лайков
    handleLikesCounter(data) {
        this.likes = data.likes
        this._likesCounter.textContent = this._likes.length;
        this.likeBtn.classList.toggle('places__like_active');
    }

    //проверка, мой ли это лайк
    _isLikedCard() {
        if(this._likes.some(like => like._id === this._creatorId)) {
            this.likeBtn.classList.add('places__like_active'); 
        } 
        
    }

    //навешивание слушателей
    _setEventListeners() {
        this.deleteBtn.addEventListener("click", () => {
            this.checkDeleteBtn();
            this._onRemove(this);
        });
        this.likeBtn.addEventListener("click", () => {
            this.handleLikesCounter()
        });
      
        this.cardElementImg.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
        });
    }

}