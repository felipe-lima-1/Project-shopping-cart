let itensCarrinho = [];
let total = 0;

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const felipe = document.querySelector('.cart__items');
const areaTotal = document.querySelector('.cart');
const valor = document.createElement('p');
valor.className = 'total-price';
valor.innerText = total;
areaTotal.appendChild(valor);

function atualizaTotal(variavel) {
  total += variavel;
  valor.innerHTML = total;
}
// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => event.target.remove();

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function carregando() {
  const carregandoPagina = document.createElement('p');
  carregandoPagina.classList = 'loading';
  carregandoPagina.innerText = 'carregando...';
  carregandoPagina.style.display = 'none';
  areaTotal.appendChild(carregandoPagina);
}
function esconde() {
  areaTotal.removeChild(areaTotal.lastChild);
}

const catchId = (item) => item.querySelector('span.item__sku').innerText;
const random = async (element) => {
  carregando();
  const event = await catchId(element.target.parentElement);
  esconde();
  const result = await fetchItem(event);
  const destruct = { sku: result.id, name: result.title, salePrice: result.price };
  const card = createCartItemElement(destruct);
  itensCarrinho.push(destruct);
  saveCartItems('card', itensCarrinho);
  felipe.appendChild(card);
  atualizaTotal(result.price);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', random);
  section.appendChild(botao);

  return section;
};

const products = async () => {
  carregando();
  const object = await fetchProducts('computador');
  const itens = document.querySelector('.items');
  esconde();
  const { results } = object;
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const produtos = createProductItemElement({ sku, name, image });
    itens.appendChild(produtos);
  });
};

const cartRender = async () => {
  itensCarrinho.forEach((event) => {
    const card = createCartItemElement(event);
    felipe.appendChild(card);
  });
};

function clear() {
  const area = document.querySelector('.cart__items');
  area.innerHTML = '';
  valor.innerText = 0;
  dadosCarinho = [];
  saveCartItems('card', dadosCarinho);
}

const deleteAll = document.querySelector('.empty-cart');
deleteAll.addEventListener('click', clear);

window.onload = () => {
  products();
  itensCarrinho = getSavedCartItems('card') || [];
  cartRender();
};
