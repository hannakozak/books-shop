import { summaryModal } from "../../scripts/summary.js";

const nameInput = document.getElementById("name");
const nameError = document.querySelector(".name-error");
const surnameInput = document.getElementById("surname");
const surnameError = document.querySelector(".surname-error");
const dateInput = document.getElementById("delivery-date");
const dateError = document.querySelector(".date-error");
const streetInput = document.getElementById("street");
const streetError = document.querySelector(".street-error");
const houseInput = document.getElementById("house-number");
const houseError = document.querySelector(".house-error");
const flatInput = document.getElementById("flat-number");
const flatError = document.querySelector(".flat-error");
const submitButton = document.getElementById("submit-button");
const form = document.getElementById("order-form");

window.onload = function () {
  validateForm();
  nameInput.focus();
};

const validateForm = () => {
  if (
    !isNameInputValid() &&
    !isSurnameInputValid() &&
    !isDateInputValid() &&
    !isStreetInputValid() &&
    !isHouseInputValid() &&
    !isFlatInputValid()
  ) {
    submitButton.disabled = false;
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed;";
  }
};

const isNameInputValid = () => {
  const regex = /^[a-zA-Z]+$/;
  console.log(nameInput.value);
  return !nameInput.value || nameInput.value.length < 4 || !regex.test(nameInput.value);
};

const validateNameInput = () => {
  if (isNameInputValid()) {
    nameInput.style.borderColor = "#e74c3c";
    nameError.textContent = "The field is invalid. Please use strings only, without spaces, not less than 4 symbols";
  } else {
    nameInput.style.borderColor = "#2ecc71";
    nameError.textContent = "";
  }
  validateForm();
};

const isSurnameInputValid = () => {
  const regex = /^[a-zA-Z]+$/;
  return !surnameInput.value || surnameInput.value.length < 5 || !regex.test(surnameInput.value);
};

const validateSurnameInput = () => {
  if (isSurnameInputValid()) {
    surnameInput.style.borderColor = "#e74c3c";
    surnameError.textContent = "The field is invalid. Please use strings only, without spaces, not less than 5 symbols";
  } else {
    surnameInput.style.borderColor = "#2ecc71";
    surnameError.textContent = "";
  }
  validateForm();
};

const isDateInputValid = () => {
  let current = new Date();
  let userDate = new Date(dateInput.value);
  return !dateInput.value || userDate < current;
};

const validateDateInput = () => {
  if (isDateInputValid()) {
    dateInput.style.borderColor = "#e74c3c";
    dateError.textContent = "The field is invalid. Please select date not earlier than next day";
  } else {
    dateInput.style.borderColor = "#2ecc71";
    dateError.textContent = "";
  }
  validateForm();
};

const isStreetInputValid = () => {
  return !streetInput.value || streetInput.value.length < 5;
};

const validateStreetInput = () => {
  if (isStreetInputValid()) {
    streetInput.style.borderColor = "#e74c3c";
    streetError.textContent = "The field is invalid. Street name shoud not be less than 5 symbols. Numbers are allowed";
  } else {
    streetInput.style.borderColor = "#2ecc71";
    streetError.textContent = "";
  }
  validateForm();
};

const isHouseInputValid = () => {
  const regex = /^[0-9]+/;
  return !houseInput.value || !regex.test(houseInput.value);
};

const validateHouseInput = () => {
  if (isHouseInputValid()) {
    houseInput.style.borderColor = "#e74c3c";
    houseError.textContent = "The field is invalid. Please use numbers only, positive numbers only";
  } else {
    houseInput.style.borderColor = "#2ecc71";
    houseError.textContent = "";
  }
  validateForm();
};

const isFlatInputValid = () => {
  const regex = /[0-9\-]+/;
  return !flatInput.value || !regex.test(flatInput.value) || flatInput.value < 0;
};
const validateFlatInput = () => {
  if (isFlatInputValid()) {
    flatInput.style.borderColor = "#e74c3c";
    flatError.textContent =
      "The field is invalid. Please use numbers only, positive numbers only, the dash symbol is allowed. Means, the flat number shouldn't start with minus/dash symbol.";
  } else {
    flatInput.style.borderColor = "#2ecc71";
    flatError.textContent = "";
  }
  validateForm();
};

nameInput.addEventListener("blur", () => validateNameInput());
surnameInput.addEventListener("blur", () => validateSurnameInput());
dateInput.addEventListener("blur", () => validateDateInput());
streetInput.addEventListener("blur", () => validateStreetInput());
houseInput.addEventListener("blur", () => validateHouseInput());
flatInput.addEventListener("blur", () => validateFlatInput());

const submitForm = (event) => {
  event.preventDefault();
  const data = [
    {
      name: nameInput.value,
      surname: surnameInput.value,
      street: streetInput.value,
      house: houseInput.value,
      flat: flatInput.value,
    },
  ];
  localStorage.setItem("data", JSON.stringify(data));
  const modal = summaryModal();
  modal.style.display = "block";
  form.appendChild(modal);
};

form.addEventListener("submit", submitForm);
