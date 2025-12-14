let products = [
    {
        id: 1,
        name: "iPhone 13",
        image: "img/apple-iphone-13-01.jpg",
        description: "Потужний смартфон з чудовою камерою.",
        type: "phone",
        price: 28000
    },
    {
        id: 2,
        name: "MacBook Air",
        image: "img/1582399075.jpg",
        description: "Легкий та швидкий ноутбук для роботи.",
        type: "laptop",
        price: 45000
    },
    {
        id: 3,
        name: "Airpods",
        image: "img/Apple_airpods_pro.jpg",
        description: "Легкий та зручні наушники для звучання.",
        type: "airpods",
        price: 55000
    },

    {
        id: 4,
        name: "poverbank",
        image: "img/72bedcd4abb7736fc33d0f50c8609146.jpg",
        description: "Легкий та швидкий повербанк  для заряджання.",
        type: "poverbank",
        price: 65000
    },

     {
        id: 5,
        name: "Tv",
        image: "img/main-image.jpeg",
        description: "зручний телевізор для переглядання.",
        type: "Tv",
        price: 25000
    },

       {
        id: 6,
        name: "printer",
        image: "img/superprinter.jpg",
        description: "зручний принтер для друкування.",
        type: "printer",
        price: 200000
    },

       {
        id: 7,
        name: "tablet",
        image: "img/istockphoto-1004165346-612x612.jpg",
        description: "зручний планшет для використання.",
        type: "tablet",
        price: 200000
    },

        {
        id: 8,
        name: "column",
        image: "img/14f2f11bf35da60b319d7a569a457718.jpg",
        description: "зручна колонка  для слухання.",
        type: "column",
        price: 100000
    },
    
];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let productsContainer = document.querySelector('.products-div');
let btnGroup = document.querySelector('.btn-group');

function renderProducts(items) {
    productsContainer.innerHTML = ""
    if (items.length == 0) {
        productsContainer.innerHTML = '<p>Товарів не знайдено</p>'
        return;
    }

    items.forEach(function(item) {
        let productHTML = `
            <article class="product" data-id=${item.id}>
                <img src="${item.image}" alt="" class="product-img">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <p class="product-price"><strong>${item.price} грн</strong></p>
                <button type="button" class="btn btn-primary add-to-cart-btn">До кошику</button>
            </article>
        `
        productsContainer.innerHTML += productHTML
    })
}

function applyFilters(categoryType){
        if (categoryType == "all"){
            renderProducts(products)
        } else{
            let filteredProducts = products.filter(product => product.type ==  categoryType);
            renderProducts(filteredProducts);
        }
}

function addToCart(productId){
    let cartProduct = cart.find(p => p.id == productId);
    if(cartProduct){
        cartProduct.quantity +=1
    }
    else{
        let product = products.find(p => p.id == productId);
        cart.push({  ...product, quantity: 1 })
    }
    localStorage.setItem('cart',JSON.stringify(cart))
   alert("Товар додано!")
    }


 let productsMap = {
    "Всі": "all",
    "Телефони": "phone",
    "Ноутбуки": "laptop",
    "Повербанки": "poverbank",
    "Телевізори": "Tv",
    "Наушникі": "airpods",
    "Планшети": "tablet",
    "Колонки": "column",

}
function setupFilterButtons(){
    for(let button of btnGroup.children){
        button.addEventListener("click",function(){
            let category = productsMap[button.innerHTML]
            applyFilters(category)
        })
    }
}

productsContainer.addEventListener("click",function(event) {
    if(event.target.classList.contains("add-to-cart-btn")){
        let productCart = event.target.closest('.product');
        let productId = parseInt(productCart.dataset.id)
        addToCart(productId)
    }
})
renderProducts(products)
setupFilterButtons()
