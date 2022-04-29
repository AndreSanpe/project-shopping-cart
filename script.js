function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// The next function I make to creat the loading element;
const addLoading = () => {
  const sectionItems = document.querySelector('.items');
  const loadingElement = document.createElement('div');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'Loading...';
  sectionItems.appendChild(loadingElement);
};

// The next function I make to remove the loading element;
const removeLoading = () => {
  const items = document.querySelectorAll('.items');
  const loadingElement = document.querySelector('.loading');
  if (items !== 0) loadingElement.remove();
};

const totalValue = () => {
  const lis = document.getElementsByClassName('cart__item');
  const array = Array.from(lis); // This is made to turn something into a array.
  const soma = array.reduce((accValor, item) => accValor + Number(item // I needed to split the string to just take the number part of it.
    .innerText.split('PRICE: $')[1]), 0); // This reduce was made to do the oparation of all objetc on the ol cart. 
  const span = document.querySelector('.total-price');
  span.innerText = soma;
};
// The next function just take the ID of the element that I want,  when I pass to it the relative element as a parameter of the function.
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const emptyCart = () => {
  const ol = document.querySelector('.cart__items');
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems(); // I called this function to save all itens from the cart to the localStorage.
  });
};

// This next function I made to remove element from the shooping cart. Then I used other two functions that need to be called when this action happens.
function cartItemClickListener(event) {
  event.target.remove();
  totalValue();
  saveCartItems();
  emptyCart();
}

const elementSaved = () => {
  const lis = document.getElementsByClassName('cart__item');
  const array = Array.from(lis); // to use forEach I transform the HTML colections into a array.
  // console.log(array);
  array.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const target = async (event) => {
  const element = event.target.parentNode;
  const id = getSkuFromProductItem(element);
  const item = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = item;
  const productCart = createCartItemElement({ sku, name, salePrice });
  const father = document.querySelector('.cart__items');
  father.appendChild(productCart);
  totalValue();
  saveCartItems();
  emptyCart();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', target); // This was made to add an event listener when the button was make. 
  return section;
}
// this function was used to require the response from the server and append it to the page. 
const getElements = async () => {
  addLoading();
  const object = await fetchProducts('computador');
  const { results } = object;
  results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const father = document.getElementsByClassName('items')[0];
    const section = createProductItemElement({ sku, name, image }); // I used the this function to create the element with those parameters.
    father.appendChild(section);
  });
};
getElements();

window.onload = () => {
  getSavedCartItems();
  elementSaved();
  totalValue();
  emptyCart();
  removeLoading();
};
