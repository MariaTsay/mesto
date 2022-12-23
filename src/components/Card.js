export class Card {
    constructor(data, templateSelector, handleCardClick, onRemove, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
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

        
        this.handleLikesCounter();
        this._isLikedCard();

        this._setEventListeners();

        return this.cardTemplate;
    }

    //удаление карточки
    removeCard() {
        this.cardTemplate.remove();
    }

    //проверка, могу ли я удалить карточку
    checkDeleteBtn() {
        if (this._userId !== this._creatorId) {
            this.deleteBtn.remove();
        }
    }

    //лайк-анлайк
    _likeCard(data) {
        this._likes = data.likes;
        this._isLikedCard();
        this.handleLikesCounter();
    }

    //счетчик лайков
    handleLikesCounter() {
        this._likesCounter.textContent = this._likes.length;
        this._isLikedCard();
    }

    //проверка, чей лайк
    _isLiked() {
        return this._likes.some(like => like._id === this._creatorId);
    }

    //проверка состояния лайка
    _isLikedCard() {
        if(this._isLiked()) {
            this.likeBtn.classList.add('places__like_active'); 
        } else {
            this.likeBtn.classList.remove('places__like_active'); 
        }
    }


    //навешивание слушателей
    _setEventListeners() {
        this.deleteBtn.addEventListener("click", () => {
            this._onRemove(this._id);
        });
        this.likeBtn.addEventListener("click", () => {
            this._handleLikeClick(this, !this._isLiked());
        });
      
        this.cardElementImg.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link)
        });
    }

}