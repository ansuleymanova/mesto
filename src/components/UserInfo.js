export default class UserInfo {
    constructor({ nameSelector, bioSelector, avatarSelector }) {
        this.id = '';
        this._name = document.querySelector(nameSelector);
        this._bio = document.querySelector(bioSelector);
        this._avatar = document.querySelector(avatarSelector);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo() {
        return {name: this._name.textContent,
                bio: this._bio.textContent,
                id: this.id}
    }

    setUserInfo({ name, bio, avatar, id }) {
        this.id = id;
        this._name.textContent = name;
        this._bio.textContent = bio;
        if (typeof avatar !== 'undefined') {
            this._avatar = avatar
        }
    }
}