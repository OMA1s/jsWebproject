import {cart, removeFromCart, getCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummsary } from './paymentSummary.js';



export function renderOrderSummary(){

    let cartItemHTML = '';

    function updateCheckoutQuantity(){
        let cartQuantity = getCartQuantity();
        const str = cartQuantity <= 1 ? 'Item' : 'Items';
        document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} ${str}`;
        //document.querySelector('.js-payment-cart-quantity').innerHTML = `${str} (${cartQuantity})`;
        renderPaymentSummsary();
    }



    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;
        const product = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartItemHTML +=  `<div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
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
                    ${deliveryOptionsHTML(product, cartItem)}
                </div>
                </div>
            </div>`

            
    });

    function deliveryOptionsHTML(product, cartItem){
        let html = '';

        deliveryOptions.forEach(option => {
            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;

            const isChecked = option.id === cartItem.deliveryOptionId; 

            html += `<div class="delivery-option js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString}
                    </div>
                </div>
            </div>`
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
    updateCheckoutQuantity();

    document.querySelectorAll('.js-delete-link').forEach(link =>{

        link.addEventListener('click', () =>{
            const id = link.dataset.productId;
            removeFromCart(id);
            updateCheckoutQuantity();

            const container = document.querySelector(`.js-cart-item-container-${id}`);
            container.remove();
            renderPaymentSummsary();
            
        });  
    });

    document.querySelectorAll('.js-update-link').forEach(link =>{

        link.addEventListener('click', () =>{
            
            const id = link.dataset.productId;
            
            
            const container = document.querySelector(`.js-cart-item-container-${id}`);
            container.classList.add('is-editing-quantity');
            //renderPaymentSummsary();
            updateCheckoutQuantity();
            
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

    document.querySelectorAll('.js-delivery-option').forEach(option =>{
        option.addEventListener('click', () =>{
            const {productId, deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            //renderPaymentSummsary();
        });
    });
};