const POPUP_OPENED_CLASS = 'popup_opened';


let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let openEditBtn = document.querySelector('.profile__profile-info-edit-button');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupSubmitBtn = popupForm.querySelector('.popup__submit-btn');
let nameInput = popup.querySelector('.popup__text_type_name');
let jobInput = popup.querySelector('.popup__text_type_about');
let profileName = document.getElementById('profile-name');
nameInput.value = profileName.textContent;
let profileJob = document.getElementById('profile-job');
jobInput.value = profileJob.textContent;


function openPopup() {
    popup.classList.add(POPUP_OPENED_CLASS);
}

openEditBtn.addEventListener('click', openPopup);


function closePopup(event) {
    if (!popupForm.contains(event.target) || event.target === popupCloseBtn) {
        popup.classList.remove(POPUP_OPENED_CLASS);
    }
}

popup.addEventListener('click', closePopup);


function popupSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove(POPUP_OPENED_CLASS);
}

popupForm.addEventListener('submit', popupSubmitHandler);

