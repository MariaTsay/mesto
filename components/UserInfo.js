export class UserInfo {
    data;

    constructor({profileName, profileJob}) {
        this._name = document.querySelector(profileName);
        this._job = document.querySelector(profileJob);
    }

    getUserInfo() {
        const profileUserInfo = {
        nameInput: this._name.textContent.trim(),
        jobInput: this._job.textContent.trim()
        }
        return profileUserInfo;
    }

    setUserInfo() {
        this._name.textContent = profileUserInfo.nameInput.value;
        this._job.textContent = profileUserInfo.jobInput.value;
    }
}