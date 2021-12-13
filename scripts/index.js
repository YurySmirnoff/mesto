let popupEditProfileForm = document.querySelector(".popup-container");
let popupCloseButton = popupEditProfileForm.querySelector(
  ".popup__button-close");

let nameInputField = popupEditProfileForm.querySelector("#profile-name-field");
let descriptionInputField = popupEditProfileForm.querySelector("#profile-description-field");
let profileSection = document.querySelector(".profile");
let profileName = profileSection.querySelector(".profile__info-author");
let profileDescription = profileSection.querySelector(
  ".profile__info-description"
);
let profileEditButton = profileSection.querySelector(".profile__button-edit");
function handleEditButton() {
  popupEditProfileForm.classList.add("popup_opened");
  nameInputField.value = profileName.textContent;
  descriptionInputField.value = profileDescription.textContent;
}
function handlePopupCloseButton() {
  popupEditProfileForm.classList.remove("popup_opened");
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  handlePopupCloseButton();
}
//"слушатели" событий
profileEditButton.addEventListener("click", handleEditButton);
popupCloseButton.addEventListener("click", handlePopupCloseButton);
popupEditProfileForm.addEventListener("submit", formSubmitHandler);
