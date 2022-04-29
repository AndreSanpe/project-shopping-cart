const getSavedCartItems = () => {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = localStorage.getItem('cartItems');
 };

// getSavedCartItems();

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
