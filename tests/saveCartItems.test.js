const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('1 - Teste a função saveCartItems', () => {
  test('Testa se ao executar savecartItems o metodo localstorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  test('Testa se ao executar savecartItems o metodo localstorage.setItem é chamado com 2 parametros', () => {
    const list = '<ol><li>Item</li></ol>';
    saveCartItems(list);
    expect(localStorage.setItem).toBeCalledWith('cartItems', list);
  });
});
