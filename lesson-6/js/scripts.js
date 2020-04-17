'use strict';

// выпадающая корзина
let hrDropBtn = document.querySelector('.hr_drop_btn');
let hrDropDiv = document.querySelector('.hr_drop_div');
hrDropBtn.addEventListener('click', function () {
    if (hrDropDiv.classList.contains('hide')) {
        hrDropDiv.classList.add('block');
        hrDropDiv.classList.remove('hide');
    } else {
        hrDropDiv.classList.add('hide');
        hrDropDiv.classList.remove('block');
    };
});

// добавление товаров в корзину
let basketBtns = document.querySelectorAll('.fi__add');
basketBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        basket.addProduct({ id: id, price: price, name: name });
    });
});

let basket = {
    products: {},

    /**
     * Метод добавляет продукт в корзину.
     * @param {{ id: string, price: string, name: string }} product 
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },
/**
     * Обработчик события клика по кнопке удаления товара.
     * @param {MouseEvent} event
     */
    removeProductListener(event) {
        //console.log(this); this будет указывать на кнопку, а не на объект basket
        //здесь мы используем basket вместо this, потому что контекст вызова не имеет
        //этих методов и нам надо явно обратиться к нашему объекту корзины
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners() {
        let btns = document.querySelectorAll('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            //важно указать именно this.removeProductListener, чтобы это была одна и та же
            //функция, а не несколько одинаковых.
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        document.querySelector('.di_sum__right span').textContent = this.getTotalSum();
    },

    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },

    /**
     * Метод отрисовывает продукт в корзине, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(product) {
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist) {
            productExist.textContent++;
            return;
        }
        let productRow = `
            <div class="di_item">
                <div class="di_item_img"><a href="#"><img src="img/item-preview-1.png" alt="item-preview-1"></a></div>
                <div class="di_item_info">
                    <div class="di_title">${product.name}</div>
                    <div class="di_rating"><img src="img/rating.png" alt="rating"></div>
                    <div class="di_total"><span class="productCount" data-id="${product.id}">1</span> X $ ${product.price}</div>
                </div>
                <div class="di_item_delete"><a href="#"><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></a></div>
            </div>
        `;
        let dropInner = document.querySelector('.drop__inner');
        dropInner.insertAdjacentHTML("afterbegin", productRow);
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * @param {MouseEvent} event
     */
    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },

    /**
     * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
     * @param {string} id
     */
    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        let itemDiv = document.querySelector('.di_item');
        if (countTd.textContent == 1) {
            itemDiv.remove();
        } else {
            countTd.textContent--;
        }
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param {string} id
     */
    removeProductFromObject(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    }
}
