const fetchProducts = async (item) => {
  try {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=';
    const response = await fetch(`${endPoint}${item}`);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return new Error('You must provide an url');
  }
};
// console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
