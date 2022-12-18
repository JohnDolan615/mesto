import params from "./params.js";

export const cardsList = document.querySelector('.elements');
export const profileAdd = document.querySelector('.profile__add');
const popupProfile = document.querySelector('#popup-profile');
export const popupProfileForm = popupProfile.querySelector(params.formSelector);
export const boxAuthorProfile = popupProfileForm.querySelector('#popup-profile__form-box_type_author');
export const boxJobProfile = popupProfileForm.querySelector('#popup-profile__form-box_type_job');
const cardAdd = document.querySelector('#popup-add');
export const cardForm = cardAdd.querySelector(params.formSelector);
const avatarPopup = document.querySelector('#popup-avatar');
export const popupAvatarForm = avatarPopup.querySelector(params.formSelector);
const profile = document.querySelector(params.profileSelector);
export const buttonProfile = profile.querySelector('.profile__edit');
export const buttonAvatar = profile.querySelector('.profile__change-avatar');