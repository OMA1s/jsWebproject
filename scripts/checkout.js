import {cart, removeFromCart, getCartQuantity, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartItemHTML = '';

function updateCheckoutQuantity(){
    let cartQuantity = getCartQuantity();
    const str = cartQuantity <= 1 ? 'Item' : 'Items';
    document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} ${str}`;
    document.querySelector('.js-payment-cart-quantity').innerHTML = `${str} (${cartQuantity})`;
}


cart.forEach((cartItem) =>{
    const productId = cartItem.productId;
    let product;
    for(let i = 0; i < products.length; i++){
        if(products[i].id === productId){
            product = products[i];
            break;
        }
    }
    cartItemHTML +=  `<div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${product.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

          
});

document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
updateCheckoutQuantity();

document.querySelectorAll('.js-delete-link').forEach(link =>{

    link.addEventListener('click', () =>{
        const id = link.dataset.productId;
        removeFromCart(id);
        updateCheckoutQuantity();

        const container = document.querySelector(`.js-cart-item-container-${id}`);
        container.remove();
        
    });  
});

document.querySelectorAll('.js-update-link').forEach(link =>{

    link.addEventListener('click', () =>{
        
        const id = link.dataset.productId;
        
        
        const container = document.querySelector(`.js-cart-item-container-${id}`);
        container.classList.add('is-editing-quantity');
        
        //updateCheckoutQuantity();
        
    });  
});

document.querySelectorAll('.js-save-link').forEach(link =>{

    link.addEventListener('click', () =>{
        const id = link.dataset.productId;
        
        const container = document.querySelector(`.js-cart-item-container-${id}`);
        const input = container.querySelector('.quantity-input').value;
        
        if(input){
            container.querySelector('.quantity-label').textContent = parseInt(input);
            updateQuantity(id, parseInt(input));
        }
        container.classList.remove('is-editing-quantity');
        
        updateCheckoutQuantity();        
    });  
});