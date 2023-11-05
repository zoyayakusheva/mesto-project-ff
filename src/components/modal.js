export function openPopup(popupElement) { 
  popupElement.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleEscClose); 
} 

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  }

export function handleEscClose(evt) { 
  if (evt.key === "Escape") { 
    const popupOpened = document.querySelector('.popup_opened'); 
    closePopup(popupOpened); 
  } 
} 

export function handleOverlayClose(evt) { 
  if (evt.target === evt.currentTarget) { 
    const popupOpened = document.querySelector('.popup_opened'); 
    closePopup(popupOpened); 
  } 
} 