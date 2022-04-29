const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1 - Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado:', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled()
  })

  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems:', () => {
    getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
