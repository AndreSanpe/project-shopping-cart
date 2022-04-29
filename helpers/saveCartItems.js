const saveCartItems = () => {
  const ol = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('cartItems', ol);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
