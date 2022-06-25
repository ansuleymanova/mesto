import { token } from '../utils/constants.js'

export default class Api {
    constructor(options) {
        this.url = options.url;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(this.url, {
            headers: this._headers
        })
            .then((res) => this._getResponseData(res));
    }

    postCard({ name, link }) {
        return fetch(this.url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            }
        ).then((res) => this._getResponseData(res));
    }

    likeCard(cardId) {
        return fetch(`${this.url}/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            }
        ).then((res) => this._getResponseData(res))
    }

    dislikeCard(cardId) {
        return fetch(`${this.url}/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            }
        ).then((res) => this._getResponseData(res))
    }

    getUserInfo() {
        return fetch(this.url, {
            headers: this._headers
        }).then((res) => this._getResponseData(res))
    }

    patchUserInfo({ name, about }) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then((res) => this._getResponseData(res))
    }

    patchAvatar({ avatar }) {
        return fetch(`${this.url}/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then((res) => this._getResponseData(res))
    }
}