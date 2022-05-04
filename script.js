const ol = document.querySelector('.cart__items');

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

// This function was made to create the product image smaller than the size of the 'real' product image.
function createProductImageElementSmall(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image_small';
  img.src = imageSource;
  return img;
}

// The next function I make to creat the loading element;
const addLoading = () => {
  const sectionItems = document.querySelector('.items');
  const loadingElement = document.createElement('div');
  loadingElement.className = 'loading';
  // loadingElement.innerText = 'Loading...';
  sectionItems.appendChild(loadingElement);
};

// The next function I make to remove the loading element;
const removeLoading = async () => {
  const items = document.querySelectorAll('.items');
  const loadingElement = await document.querySelector('.loading');
  if (items !== 0) loadingElement.remove();
};

// The next arrow function I make to sum all items that are in the shooping cart.
const totalValue = () => {
  const lis = document.getElementsByClassName('cart__item');
  const array = Array.from(lis); // This is made to turn something into a array.
  const soma = array.reduce((accValor, item) => accValor + Number(item // I needed to split the string to just take the number part of it.
    .innerText.split('PRICE: R$')[1]), 0); // This reduce was made to do the oparation of all objetc on the ol cart. 
  const span = document.querySelector('.total-price');

  span.innerText = `${soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
};

// The next function just take the ID of the element that I want,  when I pass to it the relative element as a parameter of the function.
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const emptyCart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems(ol.innerHTML); // I called this function to save all itens from the cart to the localStorage.
    totalValue();
  });
};

// This next function I made to remove element from the shooping cart. Then I used other two functions that need to be called when this action happens.
function cartItemClickListener(event) {
  event.target.parentNode.remove();
  totalValue();
  saveCartItems(ol.innerHTML);
  emptyCart();
}

const elementSaved = () => {
  const lis = document.querySelectorAll('.cart_btn');
  const array = Array.from(lis); // to use forEach I transform the HTML colections into a array.
  // console.log(array);
  array.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  btn.className = 'cart_btn';
  btn.innerText = 'x';

  li.className = 'cart__text';
  p.className = 'cart__item';
  p.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: R$${salePrice}`;

  li.appendChild(btn);
  li.appendChild(p);

  li.appendChild(createProductImageElementSmall(image));
  btn.addEventListener('click', cartItemClickListener);
  return li;
}

const target = async (event) => {
  const element = event.target.parentNode;
  const id = getSkuFromProductItem(element);
  const item = await fetchItem(id);
  const { id: sku, title: name, price: salePrice, thumbnail: image } = item;
  const productCart = createCartItemElement({ sku, name, salePrice, image });
  ol.appendChild(productCart);
  totalValue();
  saveCartItems(ol.innerHTML);
  emptyCart();
};

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const value = createCustomElement('span', 'item__value', salePrice);
  // const valueBrl = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const valueBrl = Number((value.innerText))
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  value.innerText = valueBrl;
  section.appendChild(value);
  // const test = document.querySelector('.item__value').innerText;
  // console.log(test);
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', target); // This was made to add an event listener when the button was make. 
  return section;
}
let inputValue;
const inputGet = ({ key }) => {
  if (key === 'Enter') {
    inputValue = document.getElementById('input').value;
    document.getElementsByClassName('items')[0].innerHTML = '';
    const getElements = async () => {
      addLoading();
      // const object = await fetchProducts('computador');
      const object = await fetchProducts(inputValue);
      console.log(inputValue);
      const { results } = object;
      results.forEach((item) => {
        const { id: sku, title: name, thumbnail: image, price: salePrice } = item;
        const father = document.getElementsByClassName('items')[0];
        const section = createProductItemElement({ sku, name, image, salePrice }); // I used the this function to create the element with those parameters.
        father.appendChild(section);
        removeLoading();
      });
    };
    getElements();
    document.getElementById('input').value = '';
  }
};

const input = () => {
  document.getElementById('input').addEventListener('keypress', inputGet);
};

input();

// this function was used to require the response from the server and append it to the page. 
const getElements = async () => {
  addLoading();
  // const object = await fetchProducts('computador');
  const object = await fetchProducts(inputValue);
  const { results } = object;
  results.forEach((item) => {
    const { id: sku, title: name, thumbnail: image, price: salePrice } = item;
    const father = document.getElementsByClassName('items')[0];
    const section = createProductItemElement({ sku, name, image, salePrice }); // I used the this function to create the element with those parameters.
    father.appendChild(section);
    removeLoading();
  });
};
getElements();

const getCartElements = () => {
  const getSaved = getSavedCartItems();
  ol.innerHTML = getSaved;
};

window.onload = async () => {
  getCartElements();
  elementSaved();
  totalValue();
  emptyCart();
  input();
};
