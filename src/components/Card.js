import { handleEscClose } from "./modal.js";

const popupDescription = document.querySelector(".popup_type_image");
const popupImage = popupDescription.querySelector(".popup__image-photo");
const popupCaption = popupDescription.querySelector(".popup__image-title");

function getCardTemplate() {
  const cardTemplate = document.querySelector(".elements_template");
  return cardTemplate.content.cloneNode(true).querySelector(".element");
}
export function deleteCard(evt) {  
  const card = evt.target.closest(".element");
  card.remove();
}  
export function likeCard(evt) {  
  evt.target.classList.toggle("element__like_active");
}  
export function openPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  popupDescription.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleEscClose); 
}

export function createCard(link, name, deleteCard, likeCard, openPopupImage) { 
  const card = getCardTemplate();
  const cardImage = card.querySelector(".element__image");
  const cardTitle = card.querySelector(".element__text"); 
 
  cardImage.src = link; 
  cardTitle.textContent = name; 
  cardImage.alt = name; 
  
  const deleteButton = card.querySelector(".element__delete");
  const likeButton = card.querySelector(".element__like");
    
  deleteButton.addEventListener("click", deleteCard);  
  likeButton.addEventListener("click", likeCard);  

  cardImage.addEventListener("click", function () { 
    openPopupImage(link, name); 
  }); 
     
  return card; 
} 