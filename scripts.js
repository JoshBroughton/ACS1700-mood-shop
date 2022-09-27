import data from './data.js';

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');

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


const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const all_items_button = Array.from(document.querySelectorAll('button'));
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
//add event listener to all remove buttons
function removeButtons() {
    const buttons = Array.from(document.getElementsByClassName('remove-buttons'));
    buttons.forEach((element, index) => element.addEventListener('click', () => {
        removeItem(cart[index].name, cart[index].qty);
        clearList();
        showItems();
    }))
}

//event listener for add one button
function addOneButtons() {
    const buttons = Array.from(document.getElementsByClassName('add-one'));
    buttons.forEach((element, index) => element.addEventListener('click', () => {
        cart[index].qty += 1;
        showItems();
    }))
}

//event listener for remove one button
function removeOneButtons() {
    const buttons = Array.from(document.getElementsByClassName('remove-one'));
    buttons.forEach((element, index) => element.addEventListener('click', () => {
        removeItem(cart[index].name, 1);
        clearList();
        showItems();
    }))
}

//event listener to add input qty
function addInputQty() {
    const fields = Array.from(document.getElementsByClassName('input-qty'));
    fields.forEach((element, index) => element.addEventListener('change', () => {
        cart[index].qty = parseInt(element.value, 10);
        clearList();
        showItems();
    }))
}

//clear the footer so it can be refreshed
function clearList() {
    while (itemList.lastChild !== null) {
        itemList.lastChild.remove();
    }
    cartQty.innerHTML = '';
    cartTotal.innerHTML = '';

}

//create the item string for displaying to footer
function itemString(name, price, qty) {
    return `<li><p>${name} $${parseFloat(price, 10).toFixed(2)} x ${qty} = $${parseFloat((price * qty), 10).toFixed(2)}</p>
        <button class='remove-buttons' id='${name}-button'>Remove All</button>
        <button class='add-one' id='add-${name}'>+</button>
        <button class='remove-one' id='remove-${name}'>-</button>
        <input class='input-qty' type=number></li>`;
}

// print out the total number of items, the items in the cart, and the total cost
// of items in the cart
function showItems() {
    cartQty.innerHTML = `You have ${getQty()} items in your cart`;
    let itemStr = '';

    for (const i in cart) {
        const { name, price, qty } = cart[i];
        itemStr += itemString(name, price, qty);
    }

    itemList.innerHTML = itemStr;
    
    cartTotal.innerHTML = `The total cost is: $${getTotalPrice()}`;
    removeButtons();
    addOneButtons();
    removeOneButtons();
    addInputQty();
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
            } 
            
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1);
            }
            return;
        }
    }
    
}

//add event listener to all add to cart buttons
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'));
    showItems();
}))

showItems();