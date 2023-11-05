import "./index.css";
import { createCard, deleteCard, likeCard, openPopupImage } from "../components/Card.js";
import { initialCards } from "../utils/cards.js";
import { openPopup, closePopup, handleOverlayClose } from "../components/modal.js";

const popupCard = document.querySelector(".popup_add_card");
const popupProfile = document.querySelector(".popup_type_edit");
const popupDescription = document.querySelector(".popup_type_image");
const allPopups = Array.from(document.querySelectorAll(".popup")); 

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = document.querySelector("#close-button-profile");
const formEditProfile = document.querySelector("#popup-form-edit");
 
const nameInput = formEditProfile.querySelector("#nameInput"); 
const jobInput = formEditProfile.querySelector("#jobInput"); 
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__workplace"); 

const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonClosePopupCard = document.querySelector("#close-button-card");
const formAddCard = document.querySelector("#popup-form-add");
const cardContainer = document.querySelector(".elements__list");
const buttonClosePopupImage = document.querySelector("#close-button-image");
const linkInput = document.querySelector("#linkCard"); 
const titleInput = document.querySelector("#nameCard"); 

function handleFormEditSubmit(evt) { 
  evt.preventDefault(); 
  profileName.textContent = nameInput.value; 
  profileDescription.textContent = jobInput.value; 
  closePopup(popupProfile); 
} 

formEditProfile.addEventListener("submit", handleFormEditSubmit);
buttonOpenPopupProfile.addEventListener("click", function () { 
  openPopup(popupProfile); 
  nameInput.value = profileName.textContent;  
  jobInput.value = profileDescription.textContent; 
}); 
buttonClosePopupProfile.addEventListener("click", function () { 
  closePopup(popupProfile); 
}); 

buttonOpenPopupCard.addEventListener("click", function () { 
  openPopup(popupCard); 
}); 
buttonClosePopupCard.addEventListener("click", function () { 
  closePopup(popupCard); 
});

function addCard(link, name) { 
  const card = createCard(link, name, deleteCard, likeCard, openPopupImage); 
  cardContainer.prepend(card); 
} 

function handleFormAddSubmit(evt) { 
  evt.preventDefault(); 
  addCard(linkInput.value, titleInput.value); 
  formAddCard.reset(); 
  closePopup(popupCard);
} 

initialCards.forEach((item) => { 
  const card = createCard(item.link, item.name, deleteCard, likeCard, openPopupImage); 
  cardContainer.appendChild(card); 
}); 


buttonClosePopupImage.addEventListener("click", function () { 
    closePopup(popupDescription); 
}); 
formAddCard.addEventListener("submit", handleFormAddSubmit); 


allPopups.forEach((popup) => { 
    popup.addEventListener("mousedown", handleOverlayClose); 
});