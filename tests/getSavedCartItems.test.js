const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('1 - Teste a função getSavedCartItems', () => {
  test('Testa se ao chamar a funcao é adicionado o metodo localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  test('2 - Testa se ao chamar a funcao é adicionado o metodo localStorage.getItem com o parametro cartItems', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
