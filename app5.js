"use strict";

// задание 3 а/б
let modal = document.querySelector('.modal');
let btnOpen = document.querySelector('.open');
let btnClose = document.querySelector('.close');

modal.classList.add('magictime', 'twisterInUp');

btnOpen.addEventListener('click', function(event) {
    modal.classList.add('view');
    btnOpen.classList.add('hide');
});

btnClose.addEventListener('click', function(event) {
    modal.classList.remove('view');
    btnOpen.classList.remove('hide');
});

// задание 4
const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        handleClick(event);
    });
});

/**
 * Функция обрабатывает клик по кнопке в карточке товара и попеременно вызывает
 * функции для показа или скрытия текста о товаре.
 * @param {MouseEvent} clickedButtonEvent 
 */
function handleClick(clickedButtonEvent) {
    const cardNode = clickedButtonEvent.target.parentNode;

    const card = {
        wrap: cardNode,
        img: cardNode.querySelector('img'),
        productName: cardNode.querySelector('.product__name'),
        productDesc: cardNode.querySelector('.product__desc'),
        button: cardNode.querySelector('button'),
    };

    const textOnButton = card.button.innerText;
    if (textOnButton === 'Подробнее') {
        showMoreText(card);
    } else if (textOnButton === 'Отмена') {
        hideMoreText(card);
    }
}

/**
 * Функция скрывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLDivElement} card.productDesc
 * @param {HTMLButtonElement} card.button
 */
function hideMoreText(card) {
    card.img.style.display = 'block';
    card.productDesc.style.display = 'none';
    card.button.innerText = 'Подробнее';
}

/**
 * Функция показывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLDivElement} card.productDesc
 * @param {HTMLButtonElement} card.button 
 */
function showMoreText(card) {
    card.img.style.display = 'none';
    card.productDesc.style.display = 'block';
    card.button.innerText = 'Отмена';
}

// задание 5/6
// смотрел видео