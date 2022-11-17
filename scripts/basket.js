let basketItems = JSON.parse(window.localStorage.getItem("order")) || [];

const getTotalPrice = () => {
  let result = 0;
  basketItems.map((item) => (result += parseInt(item.price * item.quantity)));
  return result;
};

const removeItem = (item) => {
  item.quantity = item.quantity - 1;
  basketItems = [...basketItems.filter((item) => item.quantity > 0)];
  localStorage.setItem("order", JSON.stringify(basketItems));
  location.reload();
};

export const generateBasket = () => {
  let fragment = new DocumentFragment();

  const basketWrapper = document.createElement("div");
  basketWrapper.setAttribute("class", "basket-wrapper");

  const basketContent = document.createElement("div");
  basketContent.setAttribute("class", "basket-content");

  const basketHeader = document.createElement("div");
  basketHeader.setAttribute("class", "basket-header");

  const basketTitle = document.createElement("h2");
  basketTitle.textContent = "Your Order:";

  const closeBasketButton = document.createElement("button");
  closeBasketButton.setAttribute("class", "button-primary");
  closeBasketButton.textContent = "close";

  closeBasketButton.addEventListener("click", (e) => {
    basketWrapper.style.display = "none";
  });

  const basketFooter = document.createElement("div");
  basketFooter.setAttribute("class", "basket-footer");

  const priceLabel = document.createElement("h2");
  priceLabel.textContent = "Total Price";

  const priceAmount = document.createElement("h2");
  priceAmount.textContent = `$${getTotalPrice()}`;

  basketFooter.appendChild(priceLabel);
  basketFooter.appendChild(priceAmount);

  basketHeader.appendChild(basketTitle);
  basketHeader.appendChild(closeBasketButton);

  basketContent.appendChild(basketHeader);

  basketItems.map((item) => {
    const basketCard = document.createElement("div");
    basketCard.setAttribute("class", "basket-card");
    console.log(item);

    const cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const price = document.createElement("h2");
    price.textContent = `$${item.price}`;

    const author = document.createElement("p");
    author.textContent = item.author;

    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer");

    const removeItemButton = document.createElement("button");
    removeItemButton.setAttribute("class", "button-primary");
    removeItemButton.textContent = "X";

    removeItemButton.addEventListener("click", (e) => {
      e.preventDefault();
      removeItem(item);
    });

    const quantity = document.createElement("p");
    quantity.textContent = `quantity: ${item.quantity}`;

    cardHeader.appendChild(title);
    cardHeader.appendChild(price);

    cardFooter.appendChild(quantity);
    cardFooter.appendChild(removeItemButton);

    basketCard.appendChild(cardHeader);
    basketCard.appendChild(author);
    basketCard.appendChild(cardFooter);

    basketContent.appendChild(basketCard);
  });

  basketContent.appendChild(basketFooter);
  fragment.appendChild(basketContent);
  basketWrapper.appendChild(fragment);
  return basketWrapper;
};
