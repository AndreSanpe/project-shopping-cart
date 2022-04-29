require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('1 - Teste se fetchItem é uma função:',()=>{
    expect(typeof fetchItem).toBe('function');
  })
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async ()=>{
    
    const called = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })
  
});
