const stockList = {};

const removeValue = () => {
    const price = document.querySelector('.product__price');
    const productName = document.querySelector('.product__name');
    price.value.remove();
}

const createPageElement = (element, className, text) => {
    const item = document.createElement(element);
    item.className = className;
    item.innerText = text;
    return item;
}

const createPageInput = (className, placeHolder, type) => {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeHolder;
    input.className = className;
    return input;
}

const createStock = () => {
  const body = document.querySelector('body');
  const productSection = document.createElement('section');
  productSection.className = 'items__list';
  const firstSection = document.createElement('section');
  firstSection.className = 'products__father';
  body.appendChild(firstSection);
  firstSection.appendChild(productSection);
  const addItems = document.querySelector('.items__list');
  addItems.appendChild(createPageInput('product__name', 'Nome do Produto', 'text'));
  addItems.appendChild(createPageInput('product__price', 'Preço do Produto', 'number'));
  addItems.appendChild(createPageElement('button', 'product__button', 'ADICIONAR'));
  return addItems;
}

const addToStock = () => {
 const price = document.querySelector('.product__price');
 const productName = document.querySelector('.product__name');
 const nomeDoProduto = productName.value;
 stockList[`${productName.value}`] = {
     [`${nomeDoProduto}`] : `${price.value}`
 }
 price.value = null;
 productName.value = null;
 console.log(stockList);
}

const addEvent = (target, callback, type) => {
 const add = document.querySelector(target);
 add.addEventListener(type, callback);
 return add;
}

const createPageDefault = () => {
  const body = document.querySelector('body');
  const section = document.createElement('section');
  section.className = 'page__buttons';
  body.appendChild(section);
  const pageButtons = document.querySelector('.page__buttons');
  pageButtons.appendChild(createPageElement('button', 'page__changer', 'Calcular Vendas'));
  pageButtons.appendChild(createPageElement('button', 'page__changer', 'Adicionar ao Estoque'));
}


window.onload = async () => {
createPageDefault();
createStock();
addEvent('.product__button', addToStock, 'click');
}