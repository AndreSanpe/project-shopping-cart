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

const valorTotal = () => {
  const lis = document.getElementsByClassName('cart__item');
  const array = Array.from(lis);
  const soma = array.reduce((accValor, item) => accValor + Number(item
    .innerText.split('PRICE: $')[1]), 0);
  const span = document.querySelector('.total-price');
  span.innerText = soma;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
function cartItemClickListener(event) {
  event.target.remove();
  valorTotal();
  saveCartItems();
}

const elementSaved = () => {
  const lis = document.getElementsByClassName('cart__item');
  console.log(lis);
  const array = Array.from(lis); // to use forEach!
  console.log(array);
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
  valorTotal();
  saveCartItems();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', target);

  return section;
}
// this function was used to require the response from the server and append it to the page. 
const getElements = async () => {
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
  valorTotal();
};
