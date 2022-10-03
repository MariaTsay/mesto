const POPUP_OPENED_CLASS = 'popup_opened';

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let openEditBtn = document.querySelector('.profile__profile-info-edit-button');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupSubmitBtn = popupForm.querySelector('.popup__submit-btn');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_about');
let profileName = document.getElementById('profile-name');
let profileJob = document.getElementById('profile-job');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add(POPUP_OPENED_CLASS);
}

openEditBtn.addEventListener('click', openPopup);


function closePopup(event) {
    if (!popupForm.contains(event.target) || event.target === popupCloseBtn) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
}

popup.addEventListener('click', closePopup);


function popupSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    if (popupForm.contains(evt.target)) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
}

popupForm.addEventListener('submit', popupSubmitHandler);