export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._myId = "";
  };

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileAbout: this._profileJob.textContent,
      myId: this._myId,
    };
  };

  setUserInfo({ name, about, myId = "" }) {
    if (name) {
      this._profileName.textContent = name;
    };
    if (about) {
      this._profileJob.textContent = about;
    };
    if (!this._myId) { this._myId = myId };
  };

  renderAvatar(link) {
    if (link) {
      this._profileAvatar.src = link
    };
  }

  renderUserInfo(info) {
    this.setUserInfo({ name: info.name, about: info.about, myId: info.myId });
    this.renderAvatar(info.avatar);
  }
};