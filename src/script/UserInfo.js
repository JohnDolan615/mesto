export default class UserInfo {
  constructor(profileAuthorSelector, profileJobSelector) {
    this._profileAuthor = document.querySelector(profileAuthorSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
  return {
      profileAuthor: this._profileAuthor.textContent,
      profileJob: this._profileJob.textContent
    }
  }

  setUserInfo(data) {
    this._profileAuthor.textContent = data.inputprofileAuthor;
    this._profileJob.textContent = data.inputProfileJob;
  }
}