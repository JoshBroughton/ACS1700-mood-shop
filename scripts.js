import data from './data.js';

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');

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

// add item to art
function addItem(name, price) {
    for (const i in cart) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            return
        }
    }
    const item = {name, price, qty: 1};
    cart.push(item);
}

// print out the total number of items, the items in the cart, and the total cost
// of items in the cart
function showItems() {
    cartQty.innerHTML = `You have ${getQty()} items in your cart`;
    let itemStr = '';
    for (const i in cart) {
        const { name, price, qty } = cart[i];
        itemStr += `<li>${name} $${price} x ${qty} = $${price * qty}</li>`;
    }

    itemList.innerHTML = itemStr;
    
    cartTotal.innerHTML = `The total cost is: $${getTotalPrice()}`;
}

// get total quantity of items in the cart
function getQty() {
    let totalQty = 0;

    for (const i in cart) {
        totalQty += cart[i].qty;
    }

    return totalQty;
}

// get total price of items in cart
function getTotalPrice() {
    let totalPrice = 0;

    for (const i in cart) {
        totalPrice += cart[i].price * cart[i].qty;
    }

    return totalPrice.toFixed(2);
}

// remove qty of items from cart, or clear cart if not specified (or cart.qty < 1)
function removeItem (name, qty = 0) {
    for (const i in cart) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty;
            } else if (cart[i]. qty < 1 || qty === 0) {
                cart.splice(i, 1);
            }
            return;
        }
    }
}


addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Frisbee', 9.92);
addItem('Apple', 0.99);

showItems();