const fetchItem = (idItem) => {
  const url = `https://api.mercadolibre.com/items/${idItem}`;
  return fetch(url).then((resposta) => resposta.json()).then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
