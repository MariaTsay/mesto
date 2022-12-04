export class UserInfo {
    data;

    constructor({profileName, profileJob}) {
        this._name = document.querySelector(profileName);
        this._job = document.querySelector(profileJob);
    }

    getUserInfo() {
        const profileUserInfo = {
        name: this._name.textContent.trim(),
        job: this._job.textContent.trim()
        }
        return profileUserInfo;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}