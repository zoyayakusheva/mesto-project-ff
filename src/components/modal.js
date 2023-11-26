export function openModal(popupElement) { 
  popupElement.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleEscClose); 
} 

export function closeModal(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  }

export function handleEscClose(evt) { 
  if (evt.key === "Escape") { 
    const popupOpened = document.querySelector('.popup_opened'); 
    closeModal(popupOpened); 
  } 
} 

export function handleOverlayClose(evt) { 
  if (evt.target === evt.currentTarget) { 
    closeModal(evt.currentTarget); 
  } 
}