require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe("1 - Teste a função fetchItem", () => {
  test("testa fetchItem é uma funcao", () => {
    expect(typeof fetchItem).toBe("function");
  });
  test('2 - Testa argumento MLB1615760527 chamou a funcao fetch', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });
  test('3 - Testa se ao chamar a funcao com o argumento MLB1615760527, a funcao usa o endpoint', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('4 - Testa se o argumento MLB1615760527 é uma estutura de dados igual', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalledWith(
      "https://api.mercadolibre.com/items/MLB1615760527"
    );
  });
  test("5 - Retorno erro quando sem argumento", async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error("You must provide an url"));
    }
  });
});
