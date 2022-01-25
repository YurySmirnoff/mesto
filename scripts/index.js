//************************ Глобальные переменные ********************
//popup модальные окна
const popupEditProfile = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const popupImageView = document.querySelector(".popup_image_view");
const popups = document.querySelectorAll(".popup");
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
const formInput = popupEditProfileForm.querySelector(".popup__input");
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
const listCards = document.querySelector(".elements");
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

//************************ Функции и обработчики событий ********************
//открыть/отобразить заданное модальное окно (modal)
//функция закрытия popup при нажетии ESC
function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
//закрыть заданное модальное окно (modal)
function closePopup(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
//удаление карточки
function deleteCardHandler(event) {
  event.target.closest(".element").remove();
}

//просмотр фото карточки
function viewPhotoCard(linkImage, captionImage) {
  // event.preventDefault();
  popupImage.src = linkImage;
  popupImage.alt = captionImage;
  popupImageCaption.textContent = captionImage;
  openPopup(popupImageView);
}

//создание карточки
function createCard(name, link) {
  //создается DOM элемент карточки
  const cardElement = cardTemplate.cloneNode(true);
  //в карточку вставляются данные и навешиваются обработчики
  const cardImage = cardElement.querySelector(".element__img");
  const cardTitle = cardElement.querySelector(".element__text");
  const deleteButton = cardElement.querySelector(".element__delete");
  const likeButton = cardElement.querySelector(".element__heart");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //обработчики событий на карточке
  //обработка удаления карточки
  deleteButton.addEventListener("click", deleteCardHandler);
  //обработка установки/снятия like
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("element__heart_active");
  });
  //просмотр фото карточки
  cardImage.addEventListener("click", (event) => {
    viewPhotoCard(event.target.src, event.target.alt);
  });
  //возвращается созданная карточка
  return cardElement;
}

//функция добавления карточки в контейнер
function addCard(container, cardElement) {
  container.prepend(cardElement); //cardElement добавляется в container }
}

//получить значения для полей формы редактирования профиля
//промежуточная функция, внутри которой устанавливаются необходимые значения
function getFieldPopupEditProfile() {
  nameInputField.value = profileName.textContent;
  descriptionInputField.value = profileDescription.textContent;
}

//"слушатели" событий
//открытие popup-формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  getFieldPopupEditProfile();
  openPopup(popupEditProfile);
});

//закрытие popup-формы редактирования профиля
popupCloseButton.addEventListener("click", () => closePopup(popupEditProfile));

//отправка и закрытие popup-формы редактирования профиля
popupEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInputField.value;
  profileDescription.textContent = descriptionInputField.value;
  document.getElementById("edit-profile-form").reset();
  closePopup(popupEditProfile);
});

//отправка и закрытие popup-формы добавления новой карточки
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard(listCards, createCard(inputCardName.value, inputCardLink.value));
  document.getElementById("add-card-form").reset();
  closePopup(addCardModal);
});

//открытие popup-формы добавления новой карточки
addCardButton.addEventListener("click", () => openPopup(addCardModal));
//закрытие popup-формы добавления новой карточки
closeAddCardModalButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

//закрытие popup-формы просмотра фото карточки
closeImageViewButton.addEventListener("click", () =>
  closePopup(popupImageView)
);

//************************ Изначальное отображение карточек ********************
//инициализация - первоначальное создание и размещение карточек мест на странице
initialCards.forEach((item) => {
  addCard(listCards, createCard(item.name, item.link));
});
//расстановка "слушателей" на click overlay
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (!event.target.closest(".popup__container")) {
      closePopup(popup);
    }
  });
});
