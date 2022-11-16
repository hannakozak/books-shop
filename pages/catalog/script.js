import { popupModal } from "../../scripts/popup.js";

const fetchBooks = fetch("../../books.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    renderBooks(data);
  });

const renderBooks = (data) => {
  let fragment = new DocumentFragment();

  data.map((book, id) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", id);

    const title = document.createElement("h2");
    title.textContent = book.title;

    const image = document.createElement("img");
    image.setAttribute("src", `${book.imageLink}`);
    image.setAttribute("alt", book.title);
    image.setAttribute("class", "book-image");

    const author = document.createElement("h3");
    author.textContent = book.author;

    const price = document.createElement("h2");
    price.textContent = `$${book.price}`;
    price.setAttribute("class", "book-price");

    const showMoreButton = document.createElement("button");
    showMoreButton.textContent = "show more";
    showMoreButton.setAttribute("class", "button-primary");
    showMoreButton.dataset.open = `modal-${id}`;

    const modal = popupModal(book, id);

    showMoreButton.addEventListener("click", function () {
      modal.style.display = "block";
    });
    card.appendChild(modal);

    const addToCardButton = document.createElement("button");
    addToCardButton.textContent = "add to card";
    addToCardButton.setAttribute("class", "button-primary");

    const buttonsAction = document.createElement("div");
    buttonsAction.setAttribute("class", "buttons-action");
    buttonsAction.appendChild(showMoreButton);
    buttonsAction.appendChild(addToCardButton);

    card.appendChild(image);
    card.appendChild(author);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(buttonsAction);

    fragment.appendChild(card);
  });

  const cardWrapper = document.createElement("div");
  cardWrapper.setAttribute("class", "card-wrapper");
  cardWrapper.appendChild(fragment);
  document.body.appendChild(cardWrapper);
};

const header = document.createElement("header");

const navigation = document.createElement("nav");

const ul = document.createElement("ul");

const home = document.createElement("li");
home.setAttribute("class", "nav__item");
const homeIcon = document.createElement("img");
homeIcon.setAttribute("src", "../../assets/icons/house-chimney-solid.svg");
homeIcon.setAttribute("alt", "home icon");
homeIcon.setAttribute("class", "home-icon");
home.appendChild(homeIcon);

const logo = document.createElement("li");
logo.setAttribute("class", "nav__item");
const logoIcon = document.createElement("img");
logoIcon.setAttribute("src", "../../assets/icons/book-solid.svg");
logoIcon.setAttribute("alt", "logo icon");
logoIcon.setAttribute("class", "logo-icon");
logo.appendChild(logoIcon);

const basket = document.createElement("li");
basket.setAttribute("class", "nav__item");
const basketIcon = document.createElement("img");
basketIcon.setAttribute("src", "../../assets/icons/basket-shopping-solid.svg");
basketIcon.setAttribute("alt", "basket icon");
basketIcon.setAttribute("class", "basket-icon");
basket.appendChild(basketIcon);

const headerTitle = document.createElement("h2");
headerTitle.classList.add("header__title");
headerTitle.innerHTML = "Welcome to amazing book shop!";

ul.appendChild(home);
ul.appendChild(logo);
ul.appendChild(basket);

navigation.appendChild(ul);
header.appendChild(navigation);
header.appendChild(headerTitle);
document.body.appendChild(header);
