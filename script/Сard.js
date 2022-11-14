

import {openPopupImg} from "./functions.js";

export default class Card {
    constructor(card, templateSelector){
        this._card = card;
        this._templateSelector = templateSelector; 
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
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active'); 
    }

    _handleOpenImg(){
        openPopupImg(this._card.name, this._card.link);
    }

    _removeButton(){
        this._element.remove();
    }

    _setEventListeners(){
        this._imgLikeButton = this._element.querySelector('.elements__like');
        this._cardImage = this._element.querySelector('.elements__photo');

        this._cardImage.addEventListener('click', () => {
            this._handleOpenImg(this._card.name, this._card.link);
        });
        this._imgLikeButton.addEventListener('click', () => {
            this._likeButton();
        });
        this._element.querySelector('.elements__delete').addEventListener('click', () => {
            this._removeButton();
        });
    }

}
