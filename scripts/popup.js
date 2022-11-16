export const popupModal = (book, id) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.setAttribute("class", "modal-overlay");
  modalOverlay.setAttribute("id", `modal-${id}`);

  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.setAttribute("class", "modal-header");

  const closeModalButton = document.createElement("button");
  closeModalButton.setAttribute("class", "button-primary");
  closeModalButton.textContent = "close";

  closeModalButton.addEventListener("click", (e) => {
    modalOverlay.style.display = "none";
  });

  const title = document.createElement("h2");
  title.textContent = book.title;
  modalHeader.appendChild(closeModalButton);
  modalHeader.appendChild(title);

  const modalBody = document.createElement("div");
  modalBody.setAttribute("class", "modal-body");
  const description = document.createElement("div");
  description.textContent = book.description;
  modalBody.appendChild(description);

  const modalFooter = document.createElement("div");
  modalFooter.setAttribute("class", "modal-footer");

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalOverlay.appendChild(modalContent);

  window.addEventListener("click", outsideClick);
  function outsideClick(e) {
    if (e.target == modalOverlay) {
      modalOverlay.style.display = "none";
    }
  }

  return modalOverlay;
};
