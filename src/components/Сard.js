export default class Card {
    constructor(card, templateSelector, handleCardClick){
        this._card = card;
        this._templateSelector = templateSelector; 
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.elements__card')
        .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const img = this._element.querySelector('.elements__photo');
        img.src = this._card.link;
        img.alt = this._card.alt;
        this._element.querySelector('.elements__text').textContent = this._card.name;
        return this._element;
    }

    _likeButton(){
        this._imgLikeButton.classList.toggle('elements__like_active'); 
    }

    _removeButton(){
        this._element.remove();
    }

    _setEventListeners(){
        this._imgLikeButton = this._element.querySelector('.elements__like');
        this._cardImage = this._element.querySelector('.elements__photo');

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({'name': this._card.name, 'link': this._card.link});
        });
        this._imgLikeButton.addEventListener('click', () => {
            this._likeButton();
        });
        this._element.querySelector('.elements__delete').addEventListener('click', () => {
            this._removeButton();
        });
    }

}
