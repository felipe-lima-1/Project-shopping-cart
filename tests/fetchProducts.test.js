require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");

describe("1 - Teste a função fetchProducts", () => {
  test("testa fetchproducts é uma funcao", () => {
    expect(typeof fetchProducts).toBe("function");
  });
  test('2 - Funcao fetchproducts chamada quando argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  test('3 - Funcao fetchproducts chamada quando argumento "computador", endpoint API', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('4 - Funcao fetchproducts chamada quando argumento computador, endpoint API', async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalledWith(
      "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    );
  });
  test("5 - Retorno erro quando sem argumento", async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error("You must provide an url"));
    }
  });
});
