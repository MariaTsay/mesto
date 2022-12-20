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

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}