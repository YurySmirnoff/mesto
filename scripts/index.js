//popup модальные окна
const popupEditProfile = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const popupImageView = document.querySelector(".popup_image_view");

//формы
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const addCardForm = addCardModal.querySelector(".popup__form");

//кнопки
const popupCloseButton = popupEditProfile.querySelector(".popup__button-close");
const closeAddCardModalButton = addCardModal.querySelector(
  ".popup__button-close"
);
const closeImageViewButton = popupImageView.querySelector(
  ".popup__button-close"
);

const profileEditButton = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");

const imageCardButton = document.querySelector(".element__img");

//поля ввода
const nameInputField = popupEditProfile.querySelector("#profile-name-field");
const descriptionInputField = popupEditProfile.querySelector(
  "#profile-description-field"
);
const inputCardName = document.querySelector("#add-card-name-field");
const inputCardLink = document.querySelector("#add-card-link-field");
//элементы
const profileSection = document.querySelector(".profile");
const profileName = profileSection.querySelector(".profile__info-author");
const profileDescription = profileSection.querySelector(
  ".profile__info-description"
);
//элементы popup просмотра фото карточки
const popupImage = popupImageView.querySelector(".popup__image-view");
const popupImageCaption = popupImageView.querySelector(".popup__image-caption");
//список карточек
const list = document.querySelector(".elements");
//шаблон карточки
const cardTemplate = document.querySelector(".card-template").content;

//начальный массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//инициализация - первоначальное создание и размещение карточек мест на странице
initialCards.forEach(CreateCard);

//открыть/отобразить заданный popup
function popupOpen(modal) {
  if (modal.classList.contains("popup_closed")) {
    modal.classList.remove("popup_closed");
  }
  if (!modal.classList.contains("popup_opened")) {
    modal.classList.add("popup_opened");
  }
}
//открыть/отобразить заданный popup
function popupClose(modal) {
  if (modal.classList.contains("popup_opened")) {
    modal.classList.remove("popup_opened");
  }
  if (!modal.classList.contains("popup_closed")) {
    modal.classList.add("popup_closed");
  }
}
//удаление карточки
function deleteCardHandler(event) {
  console.log(event.target.closest(".element"));
  event.target.closest(".element").remove();
}
//создание карточки
function CreateCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__img");
  const cardTitle = cardElement.querySelector(".element__text");
  const deleteButton = cardElement.querySelector(".element__delete");
  const likeButton = cardElement.querySelector(".element__heart");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  //обработка удаления карточки
  deleteButton.addEventListener("click", deleteCardHandler);
  //обработка установки/снятия like
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("element__heart_active");
  });
  //просмотр фото карточки
  cardImage.addEventListener("click", (event) => {
    event.preventDefault();
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupImageCaption.textContent = event.target.alt;
    popupOpen(popupImageView);
  });
  //вставляем карточку в конец списка
  list.prepend(cardElement);
}

//"слушатели" событий
//открытие popup-формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInputField.value = profileName.textContent;
  descriptionInputField.value = profileDescription.textContent;
  popupOpen(popupEditProfile);
});
//закрытие popup-формы редактирования профиля
popupCloseButton.addEventListener("click", () => popupClose(popupEditProfile));
//отправка и закрытие popup-формы редактирования профиля
popupEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  popupClose(popupEditProfile);
});
//отправка и закрытие popup-формы добавления новой карточки
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  CreateCard({ name: inputCardName.value, link: inputCardLink.value });
  popupClose(addCardModal);
});
//открытие popup-формы добавления новой карточки
addCardButton.addEventListener("click", () => popupOpen(addCardModal));
//закрытие popup-формы добавления новой карточки
closeAddCardModalButton.addEventListener("click", () =>
  popupClose(addCardModal)
);
//закрытие popup-формы просмотра фото карточки
closeImageViewButton.addEventListener("click", () =>
  popupClose(popupImageView)
);
