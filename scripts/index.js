let popupEditProfileForm = document.querySelector(".popup");
let popupCloseButton = popupEditProfileForm.querySelector(
  ".popup__button-close"
);
let nameInputField = popupEditProfileForm.querySelector(".popup__input-name");
let descriptionInputField = popupEditProfileForm.querySelector(
  ".popup__input-description"
);
//let popupSaveButton = popupEditProfileForm.querySelector(".popup__button-save");
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
profileEditButton.addEventListener("click", handleEditButton);

function handlePopupCloseButton() {
  popupEditProfileForm.classList.remove("popup_opened");
}
popupCloseButton.addEventListener("click", handlePopupCloseButton);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  handlePopupCloseButton();
}
popupEditProfileForm.addEventListener("submit", formSubmitHandler);
