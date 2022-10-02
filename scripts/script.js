const POPUP_OPENED_CLASS = 'popup_opened';

let openEditBtn = document.querySelector('.profile__profile-info_edit-button');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupCloseBtn = popup.querySelector('.popup__close');

let profileName = document.getElementById('profile-name');
let nameInput = popup.querySelector('.popup__text_name');
nameInput.value = profileName.textContent;
let profileJob = document.getElementById('profile-job');
let jobInput = popup.querySelector('.popup__text_about');
jobInput.value = profileJob.textContent;

let popupSubmitBtn = popupForm.querySelector('.popup__submit-btn_action_submit');
console.log('кнопка подтверждает редактирование')

openEditBtn.addEventListener('click', () => {
    popup.classList.add(POPUP_OPENED_CLASS);
});

popup.addEventListener('click', (event) => {
    if (!popupForm.contains(event.target) || event.target === popupCloseBtn) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
});

popupForm.addEventListener('submit', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

popupSubmitBtn.addEventListener('click', () => {
    if (profileName.textContent = nameInput.value) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
    if (profileJob.textContent = jobInput.value) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
})