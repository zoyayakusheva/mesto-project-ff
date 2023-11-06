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