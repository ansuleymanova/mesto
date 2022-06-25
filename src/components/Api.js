import { token } from '../utils/constants.js'

export default class Api {
    constructor(options) {
        this.url = options.url;
        this._token = token;
        this._headers = {
            "Content-type": "application/json",
            "authorization": this._token
        }
    }

    getInitialCards() {
        return fetch(this.url, {
            headers: this._headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    postCard({ name, link }) {
        return fetch(this.url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    deleteCard(cardId) {
        fetch(`${this.url}/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    likeCard(cardId) {
        return fetch(`${this.url}/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    dislikeCard(cardId) {
        fetch(`${this.url}/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    getUserInfo() {
        return fetch(this.url, {
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    patchUserInfo({ name, about }) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    patchAvatar({ avatar }) {
        return fetch(`${this.url}/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}