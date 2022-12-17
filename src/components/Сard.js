

export default class Card {
  constructor(
    objCard,
    templateCardSelector,
    handleCardClick,
    handleToggleLike,
    handleOpenPopupWithConfirm,
    myId) {
    this._likes = objCard.likes; //массив объектов пользователей, поставивших лайк
    this._idOwner = objCard.owner._id; //id собственника фото
    this._idCard = objCard._id;// id карточки
    this._name = objCard.name;// наименование фото
    this._link = objCard.link;//ссылка на фото
    this._myId = myId; //мой id
    this._handleCardClick = handleCardClick;
    this._handleToggleLike = handleToggleLike;
    this._handleOpenPopupWithConfirm = handleOpenPopupWithConfirm;
    this._templateCardSelector = templateCardSelector;
    this._cardElement = this._getTemplate();
    this._photo = this._cardElement.querySelector('.elements__photo');
    this._heart = this._cardElement.querySelector('.elements__like');
    this._count_likes = this._cardElement.querySelector('.elements__count-like');
    this._description = this._cardElement.querySelector('.elements__text');
    this._remove_button = this._cardElement.querySelector('.elements__delete');
  };

  _countLikes() {
    return Object.keys(this._likes).length;
  };

  _isMyLike() {
    if (this._likes.length === 0) {
      return false;
    }
    return this._likes.some(item => item._id === this._myId)
  };

  _setLike() {

    if (this._isMyLike(this._likes)) {
      this._heart.classList.add('elements__like_active');
    } else {
      this._heart.classList.remove('elements__like_active');
    }
    this._count_likes.textContent = this._countLikes(this._likes);
  };

  setLikes(arrLikes) {
    this._likes = arrLikes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
    return cardElement;
  };

  _toggleLike() {
    if (!this._isMyLike(this._likes)) {
      this._methodCardLike = "PUT";
    } else {
      this._methodCardLike = "DELETE";
    }
    return this._handleToggleLike({
      idCard: this._idCard,
      methodCardLike: this._methodCardLike,
      card: this
    })
  };

  deleteCard() {

    this._cardElement.remove();
    this._cardElement = null;

  }

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick({ 'name': this._name, 'link': this._link });
    });
    this._heart.addEventListener('click', () => this._toggleLike());
    this._remove_button.addEventListener('click', () => this._handleOpenPopupWithConfirm(this));
  }

  createCard() {
    this._description.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._count_likes.textContent = this._countLikes(this._likes);
    this._setLike(this._likes);
    if (this._idOwner === this._myId) {
      this._remove_button.classList.add('elements__delete-visable');
    }
    this._setEventListeners();

    return this._cardElement;
  }
};

 
