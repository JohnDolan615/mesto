class Api {
    constructor(connect) {
      this._connect = connect;
    }
  
    _getResponseData(result) {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._connect.baseUrl}/cards`, {
        method: "GET",
        headers: this._connect.headers
      })
        .then(this._getResponseData)
    }
  
    getUser() {
      return fetch(`${this._connect.baseUrl}/users/me`, {
        method: "GET",
        headers: this._connect.headers
      })
        .then(this._getResponseData)
    }
  
    getInitialData() {
      return Promise.all([this.getUser(), this.getInitialCards()])
    }
  
    setUserInfo(info) {
      const name = info['input-name'];
      const about = info['input-about'];
      return fetch(`${this._connect.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._connect.headers,
        body: JSON.stringify({name, about})
      })
        .then(this._getResponseData)
    }
  
    setCard(info) {
      return fetch(`${this._connect.baseUrl}/cards`, {
        method: "POST",
        headers: this._connect.headers,
        body: JSON.stringify(info)
      })
        .then(this._getResponseData)
    }
  
    toggleLikeCard({ idCard, methodCardLike }) {
      return fetch(`${this._connect.baseUrl}/cards/${idCard}/likes`, {
        method: methodCardLike,
        headers: this._connect.headers
      })
        .then(this._getResponseData)
    }
  
    deleteCard(idCard) {
      return fetch(`${this._connect.baseUrl}/cards/${idCard}`, {
        method: "DELETE",
        headers: this._connect.headers
      })
        .then(this._getResponseData)
    }
  
    setAvatar(info) {
      return fetch(`${this._connect.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._connect.headers,
        body: JSON.stringify(info)
      })
        .then(this._getResponseData)
    }
  }
  
  export default Api;
