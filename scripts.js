import data from './data.js';

const itemsContainer = document.querySelector('#items');

data.forEach(function (item, i) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    const img = document.createElement('img');
    img.src = item.image;
    img.width = 300;
    img.height = 300;
    
    const description = document.createElement('p');
    const price = document.createElement('p');

    description.innerText = item.desc;
    price.innerText = item.price;

    newDiv.appendChild(img);
    newDiv.appendChild(description);
    newDiv.appendChild(price);

    const button = document.createElement('button');
    button.id = item.name;
    button.dataset.price = item.price;
    button.innerHTML = 'Add to Cart';
    newDiv.appendChild(button);

    itemsContainer.appendChild(newDiv);
});

const cart = [];

function addItem(name, price) {
    const item = {name: name, price: price, qty: 1};
    cart.push(item);
}

function showItems() {
    console.log(cart);
}

addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);

showItems();