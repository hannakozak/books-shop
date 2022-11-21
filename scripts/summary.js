let data = JSON.parse(window.localStorage.getItem("data")) || undefined;

export const summaryModal = () => {
  const modalOverlay = document.createElement("div");
  modalOverlay.setAttribute("class", "modal-overlay");

  const modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.setAttribute("class", "modal-header");

  const closeModalButton = document.createElement("button");
  closeModalButton.setAttribute("class", "button-primary");
  closeModalButton.textContent = "close";

  closeModalButton.addEventListener("click", (e) => {
    modalOverlay.style.display = "none";
    localStorage.clear();
    window.location.href = "../catalog/index.html";
  });

  const title = document.createElement("h2");
  title.textContent = "The order created";
  modalHeader.appendChild(closeModalButton);
  modalHeader.appendChild(title);

  const modalBody = document.createElement("div");
  modalBody.setAttribute("class", "modal-body");
  const description = document.createElement("div");
  description.textContent = data
    ? `The delivery address is ${data[0].street} ${data[0].house} flat ${data[0].flat}. Customer ${data[0].name} ${data[0].surname}. `
    : "";

  modalBody.appendChild(description);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalOverlay.appendChild(modalContent);

  window.addEventListener("click", outsideClick);
  function outsideClick(e) {
    if (e.target == modalOverlay) {
      modalOverlay.style.display = "none";
    }
  }

  return modalOverlay;
};
