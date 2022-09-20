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
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            return
        }
    }
    const item = {name, price, qty: 1};
    cart.push(item);
}

//print out the total number of items, the items in the cart, and the total cost
//of items in the cart
function showItems() {
    console.log(`You have ${getQty()} items in your cart`);

    for (let i = 0; i < cart.length; i++) {
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
    }

    
    console.log(`The total cost is: $${getTotalPrice()}`);
}

//get total quantity of items in the cart
function getQty() {
    let totalQty = 0;

    for (let i = 0; i < cart.length; i++) {
        totalQty += cart[i].qty;
    }

    return totalQty
}

// get total price of items in cart
function getTotalPrice() {
    let totalPrice = 0;

    for (let i =0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].qty;
    }

    return totalPrice.toFixed(2);
}

addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Fribsee', 9.92);
addItem('Apple', 0.99);

showItems();