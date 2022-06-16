const buyBtns = [...document.querySelectorAll('[data-name]')];
const basketUl = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');
const basket = new Basket();
const removeItem = event => {
    const id = Number(event.target.dataset.id);
    basket.remove(id);
    createBasketUi();
};
const createBasketUi = () => {
    basketUl.innerText = '';
    for (const {id, text} of basket.getBasketSummary()) {
        const newLi = document.createElement('li'); // <li>
        newLi.innerText = text;
        newLi.addEventListener('click', removeItem);
        newLi.dataset.id = id;
        basketUl.appendChild(newLi);
    }
    const basketTotalValue = basket.getTotalValue();
    buyAllBtn.innerText = `Order for  ${basketTotalValue.toFixed(2)}BTC `;
    buyAllBtn.disabled = basketTotalValue === 0;
};
const addProductToBasket = event => {
    const name = event.target.dataset.name;
    const price = Number(event.target.dataset.price);
    const newProduct = new Product(name, price);
    basket.add(newProduct);
    createBasketUi();
};
const buyAllProducts = () => {
    const basketTotalValue = basket.getTotalValue();
    alert(`You order is placed : ${basketTotalValue.toFixed(2)}BTC.`);
    basket.clear();
    createBasketUi();
};
for (const btn of buyBtns) {
    btn.addEventListener('click', addProductToBasket);
}
buyAllBtn.addEventListener('click', buyAllProducts);
