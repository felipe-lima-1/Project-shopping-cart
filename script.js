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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => event.target.remove();

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const products = async () => {
  const object = await fetchProducts('computador');
  const itens = document.querySelector('.items');
  const { results } = object;
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const produtos = createProductItemElement({ sku, name, image });
    itens.appendChild(produtos);
  });
};
const catchId = (item) => item.querySelector('span.item__sku').innerText;
const random = async (element) => {
  const event = await catchId(element.target.parentElement);
  const result = await fetchItem(event);
  const destruct = { sku: result.id, name: result.title, salePrice: result.price };
  const card = createCartItemElement(destruct);
  const felipe = document.querySelector('.cart__items');
  felipe.appendChild(card);
};

window.onload = () => {
  products();
};
