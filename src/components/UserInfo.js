export class UserInfo {
    profileName;
    profileJob;
    avatarSelector;
    name;
    job;

    constructor({profileName, profileJob, avatarSelector}) {
        this._name = document.querySelector(profileName);
        this._job = document.querySelector(profileJob);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const profileUserInfo = {
        name: this._name.textContent.trim(),
        job: this._job.textContent.trim(),
        avatarlink: this._avatar.src
        }
        return profileUserInfo;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._job.textContent = userData.about;
    }

    setUserAvatar(userData) {
        this._avatar.src = userData.avatar;
        this._avatar.alt = userData.name;
    }
}