import "./index.css";
import { renderCard, likeCard } from "../components/Card.js";
import { closeModal, openModal, handleOverlayClose } from "../components/modal.js";
import { clearValidation, enableValidation } from "../components/validation.js";
import { getInitialInfo, postNewCard, updateUserAvatar, updateUserProfile,
  deleteCard as deleteCardFromServer } from "../components/api.js";

const cardContainer = document.querySelector(".elements__list");
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__workplace");
const profileAvatar = document.querySelector(".profile__avatar");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const popupCard = document.querySelector(".popup_add_card");
const popupCardForm = document.forms["new-place"];
const popupZoom = document.querySelector(".popup_type_image");
const popupImage = popupZoom.querySelector(".popup__image-photo");
const popupCaption = popupZoom.querySelector(".popup__image-title");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__avatar-container");
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId;

const deleteCard = (evt, cardId) => {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const fillProfileInfo = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

const renderInitialCards = (initialCards, userId) => {
  initialCards.forEach((card) => {
    renderCard(card, userId, cardContainer, likeCard, deleteCard, openImagePopup);
  });
};

const openImagePopup = (imageURL, imageAlt, title) => {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openModal(popupZoom);
};

const handleConfirmDelete = async (evt) => {
  deleteCardFromServer(popupConfirm.dataset.cardId)
    .then((result) => {
      const card = document.querySelector(
        `[data-card-id="${popupConfirm.dataset.cardId}"]`,
      );
      card.remove();
      closeModal(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupProfileForm.querySelector(".popup__button"));
  updateUserProfile({
    name: popupProfileForm.name.value,
    about: popupProfileForm.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupProfileForm.querySelector(".popup__button"));
    });
};

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAvatarForm.querySelector(".popup__button"));
  updateUserAvatar(popupAvatarForm.link.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarForm.querySelector(".popup__button"));
    });
};

const handleNewCardFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, popupCardForm.querySelector(".popup__button"));
  const name = popupCardForm.elements.name.value;
  const link = popupCardForm.elements.link.value;
  postNewCard({ name, link })
    .then((newCard) => {
      renderCard(newCard, userId, placesList, likeCard, deleteCard, openImagePopup, "start");
      closeModal(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupCardForm.querySelector(".popup__button"));
    });
};

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

popupZoom.addEventListener("click", (evt) => {
    handleOverlayClose(evt);
});

buttonOpenPopupProfile.addEventListener("click", () => {
  clearValidation(popupProfileForm, validationConfig);
  fillProfilePopup(
    popupProfileForm,
    profileName.textContent,
    profileDescription.textContent,
  );
  openModal(popupProfile);
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

popupProfile.addEventListener("click", (evt) => {
  handleOverlayClose(evt);
});

avatarEditButton.addEventListener("click", (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openModal(popupAvatar);
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

popupAvatar.addEventListener("click", (evt) => {
  handleOverlayClose(evt);
});

buttonOpenPopupCard.addEventListener("click", () => {
  popupCardForm.reset();
  clearValidation(popupCardForm, validationConfig);
  openModal(popupCard);
});

popupCardForm.addEventListener("submit", handleNewCardFormSubmit);

popupCard.addEventListener("click", (evt) => {
  handleOverlayClose(evt);
});

popupConfirm.addEventListener("click", (evt) => {
  handleOverlayClose(evt);
});

popupConfirmButton.addEventListener("click", handleConfirmDelete);

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.parentNode.parentNode);
  }
});

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);