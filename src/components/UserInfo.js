


export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._myId = "";
  };

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileAbout: this._profileAbout.textContent,
      myId: this._myId,
    };
  };

  setUserInfo({ name, about, myId = "" }) {
    if (name) {
      this._profileName.textContent = name;
    };
    if (about) {
      this._profileAbout.textContent = about;
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