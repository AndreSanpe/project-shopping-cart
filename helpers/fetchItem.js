const fetchItem = async (id) => {
  try {
    const endPoint = 'https://api.mercadolibre.com/items/';
    const response = await fetch(`${endPoint}${id}`);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
// console.log(fetchItem('MLB1615760527'));