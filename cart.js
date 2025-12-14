let cartContainer = document.querySelector('.cart-products');
let totalElement = document.querySelector('.total-price-display');

let cart = JSON.parse(localStorage.getItem('cart')) ||[];

function renderCart(){
    cartContainer.innerHTML = '';

    if (cart.length == 0){
        cartContainer.innerHTML = '<p>Ваш кошик порожній .</p>'
        totalElement.innerText = '0грн';
        return;
    }
}

cartContainer.forEach(function(item) {
    let html = `
            <div class="cart-product" data-id="${item.id}">
                <div class="info-box">
                    <h3>${item.name}</h3>
                    <p class="product-price">${item.price} грн</p>
                </div>
                
                <div class="count-box">
                    <p>Кількість: </p>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                </div>
                
                <div class="total-box">
                    ${item.price * item.quantity} грн
                </div>
                
                <button class="btn btn-danger remove-btn">Видалити</button>
            </div>
        `;

}); 

cartContainer.addEventListener('input', (event) =>{
    if (event.target.classlist.contains('quantity-input')){
       let input  = event.target;
       let  parent = input.closest('.cart-product');
       let id = parseFloat(parent.dataset.id);
       let newQuantity = parseInt(input.value);

       let item = cart.find(item => item.id == id);
       if (item && newQuantity > 0){
           item.quantity =newQuantity;
           //renderCart();

           localStorage.setItem('cart', JSON.stringify(cart));
           totalElement.innerText =`${calculateTotal} грн`;
           parent.querySelector('.total - box').innerText = `${item.price*item.quantity}грн`;


       }
    }
})