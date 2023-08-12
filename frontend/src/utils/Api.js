import { bazeUrl } from './constants.js';

export class Api {
  constructor(bazeUrl) {
    this._bazeUrl = bazeUrl;
  }

  _handleResult(res) {
    if (res.ok) {
        return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

    _handleResult1(res) {
    if (res) {
        console.log(res);
        if (res.status === 200) {console.log('200!!!')}
        return 200;
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  signUp(data) {
    console.log(data);
    return fetch(`${bazeUrl}/v1/auth/signup/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
    .then(this._handleResult1)
  }

  signIn(data) {
    console.log(data);
    return fetch(`${bazeUrl}/v1/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
  }
  
  //no such item, but maybe it would be
  /*getUserRequest() {
    return fetch(`${bazeUrl}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
    })
    .then(this._handleResult)
  }*/

  getUserDecksRequest() {
    return fetch(`${bazeUrl}/v1/dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
    })
    .then(this._handleResult)
  }

  //no such item, but maybe it would be
  /*editUserInfo(data) {
    return fetch(`${this._bazeUrl}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }*/

  addNewDeck(data) {
    return fetch(`${this._bazeUrl}/v1/dashboard/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  getDeckInfo(deckID, data) {
    //console.log(deckID, data);
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    }).then(this._handleResult)
  }

  editDeckInfo(deckID, data) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  removeDeck(deckID) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    })
    .then((response) => { return response.status})
    /*.then(this._handleResult)*/
  }

  addCard(deckID, data) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  editCard(deckID, cardID, data) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/${cardID}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(this._handleResult)
  }

  removeCard(deckID, cardID) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    }).then((response) => { return response.status})
    //.then(this._handleResult)
  }

  getCardInfo(deckID, cardID) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/${cardID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    }).then(this._handleResult)
  }

  getTodayCards(deckID) {
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    }).then(this._handleResult)
  }

  getDeckCards(deckID) {
    console.log(deckID);
    return fetch(`${this._bazeUrl}/v1/dashboard/${deckID}/cards/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      }
    }).then(this._handleResult)
  }

  /*signOut() {
    return fetch(`${bazeUrl}/signout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  checkToken() {
    return fetch(`${bazeUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResult)
  }*/
}

export const api = new Api(bazeUrl);