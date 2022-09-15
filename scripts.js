import data from './data.js';

const itemsContainer = document.querySelector('#items');

for (let i = 0; i < data.length; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item';

    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    
    const description = document.createElement('p');
    const price = document.createElement('p');

    description.innerText = data[i].desc;
    price.innerText = data[i].price;

    newDiv.appendChild(img);
    newDiv.appendChild(description);
    newDiv.appendChild(price);

    itemsContainer.appendChild(newDiv);
}