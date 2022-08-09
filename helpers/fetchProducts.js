const fetchProducts = (computador) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  return fetch(url).then((resposta) => resposta.json()).then((data) => data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
