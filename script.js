const lastSellsValue = localStorage.getItem('allSells');
const lastStockList = JSON.parse(localStorage.getItem('StockList'));
const stockList = lastStockList !== null ? lastStockList : {};
let totalValue = lastSellsValue !== null ? Number(lastSellsValue) : 0;

const removeValue = () => {
    const price = document.querySelector('.product__price');
    const productName = document.querySelector('.product__name');
    price.value.remove();
}

const createPageElement = (element, className, text, VALUE) => {
    const item = document.createElement(element);
    item.className = className;
    item.innerText = text;
    item.value = VALUE
    return item;
}

const createPageInput = (className, placeHolder, type) => {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeHolder;
    input.className = className;
    return input;
}

const isDefined = (nodeList) => {
  const stockSectionArr = nodeList;
  if (stockSectionArr.length >= 1) {
    return false;
  }
  return true;
}

const removeStockSection = (className) => {
  if (document.querySelector(className) !== null) {
    document.querySelector(className).remove();
  }
}

const createStock = () => {
  const fatherSection = document.querySelector('.products__father');
  const itemsList = document.querySelector('.items__list');
  if (isDefined(document.querySelectorAll('.items__list'))) {
    removeStockSection('.sells__list');
    removeStockSection('.sells__values');
    removeStockSection('.storage__changer');
    if(fatherSection === null) {
      const body = document.querySelector('body');
      const productSection = document.createElement('section');
      productSection.className = 'items__list';
      const firstSection = document.createElement('section');
      firstSection.className = 'products__father';
      firstSection.appendChild(createPageElement('span', 'sells__values', `Vendas Totais em R$ : ${totalValue}`));
      body.appendChild(firstSection);
      firstSection.appendChild(productSection);
    } else if (itemsList === null) {
      const productSection = document.createElement('section');
      productSection.className = 'items__list';
      fatherSection.appendChild(createPageElement('span', 'sells__values', `Vendas Totais em R$ : ${totalValue}`));
      fatherSection.appendChild(productSection);
    }
    const addItems = document.querySelector('.items__list');
    addItems.appendChild(createPageInput('product__name', 'Nome do Produto', 'text'));
    addItems.appendChild(createPageInput('product__price', 'Preço do Produto', 'number'));
    addItems.appendChild(createPageElement('button', 'product__button', 'ADICIONAR'));
    addEvent('.product__button', addToStock, 'click');
  }
}

const createSellsArea = () => {
  const boolean = isDefined(document.querySelectorAll('.items__list'));

  if(!boolean) {
    const section = document.querySelector('.products__father');
    const sellsSection = document.createElement('section');
    sellsSection.className = 'sells__list';
    section.appendChild(sellsSection);
    const selection = createPageElement('select', 'product__list');
    const calculateButton = createPageElement('button', 'product__button', 'CALCULAR');
    sellsSection.appendChild(selection);
    sellsSection.appendChild(createPageInput('product__quantity', 'Quantidade Vendida', 'number'));
    sellsSection.appendChild(calculateButton);
    calculateButton.addEventListener('click', calculateSells);
    createProductLists(selection);
    removeStockSection('.items__list');
  }
}

const calculateSells = () => {
  const product = document.querySelector('.product__list').value;
  const quantitySold = Number(document.querySelector('.product__quantity').value);
  const result = Number(stockList[product]) * quantitySold;
  totalValue += result;
  totalValue = Number(totalValue.toFixed(2));
  if (isNaN(result)) {
    totalValue = 0;
  }
  const updateTotalValue = document.querySelector('.sells__values');
  updateTotalValue.innerText = `Vendas Totais em R$ : ${totalValue}`;
  localStorage.setItem('allSells', totalValue);
}

const createProductLists = (selectTarget) => {
  const productLists = Object.keys(stockList);
  const productSelect = selectTarget;
  productLists.forEach((product) => {
    const PRODUCT = document.createElement('option');
    PRODUCT.value = product;
    PRODUCT.innerText = product;
    productSelect.appendChild(PRODUCT);
  })
}

const addToStock = () => {
 const price = document.querySelector('.product__price');
 const productName = document.querySelector('.product__name');
 const nomeDoProduto = productName.value;
 stockList[`${productName.value}`] = `${price.value}`;
 price.value = null;
 productName.value = null;
 localStorage.setItem('StockList', JSON.stringify(stockList));
}

const addEvent = (target, callback, type) => {
 const add = typeof target === 'string' ? document.querySelector(target) : target;
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

const clearSells = () => {
  localStorage.removeItem('StockList');
  localStorage.removeItem('allSells');
}

const addEventToMainButtons = () => {
  const buttonToStock = document.querySelectorAll('.page__changer');
  addEvent(buttonToStock[1], createStock, 'click');
  addEvent(buttonToStock[0], createSellsArea, 'click');
}

window.onload = async () => {
createPageDefault();
createStock();
addEventToMainButtons();
}