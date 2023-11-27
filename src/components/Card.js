import { deleteLike, putLike } from "./api.js";

const cardTemplate = document.querySelector(".elements_template").content;
const popupConfirm = document.querySelector(".popup_type_confirm");

const likeCard = (evt, cardId) => {
  const currentLikes = evt.target.parentNode.querySelector(".element__like-count");

  if (evt.target.classList.contains("element__like_active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("element__like_active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("element__like_active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const createCard = (card, userId, deleteCardFn, likeCardFn, openFullImageFn) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".element__delete");
  const cardLikeButton = cardElement.querySelector(".element__like");
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__text");
  const cardLikeCount = cardElement.querySelector(".element__like-count");

  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardLikeCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("element__like_active");
  }

  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteCardFn(evt, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCardFn(evt, card._id);
  });

  cardImage.addEventListener("click", () => {
    openFullImageFn(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

const renderCard = (item, userId, container, likeCard, deleteCard, openFullImageFn, place = "end") => {
  const cardElement = createCard(item, userId, deleteCard, likeCard, openFullImageFn);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { renderCard, likeCard};