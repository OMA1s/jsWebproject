import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct, products, loadProductsFetch } from "./products.js";
import { cart } from '../data/cart-class.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

async function loadPage(){
    try{
        await loadProductsFetch();
        renderOrder();
    }
    catch (error) {
        console.log('Error: ' + error + '. Try again!');
    }
    
}
loadPage();
export function addOrder(order){
    orders.unshift(order);
    saveToLocalStorage();
}

function removeProductFromOrder(orderId, productId){
    let ord = undefined;
    let ordIdx = undefined;
    
    orders.forEach((o, index) => {
        if(o.id === orderId){
            ord = o;
            ordIdx = index;
        }
    });
    let idx = undefined;
    let prod = getProduct(productId);
    ord.products.forEach((p, index) => {
        if(p.productId === productId){
            idx = index;
        }
    });
    let prodPrice = prod.priceCents;
    let prodQuant = undefined;
    if(idx >= 0){
        prodQuant = ord.products[idx].quantity;
        ord.products.splice(idx, 1);
    }
    if(ord && prod){
        if(ord.products.length <= 0){
            orders.splice(ordIdx, 1);
        }
        ord.totalCostCents -= prodPrice * prodQuant;
    }
    
    saveToLocalStorage();
    renderOrder();
}

function saveToLocalStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

function orderDetailsHtml(products, orderId){
    let orderDetailsHtml = '';

    products.forEach(p =>{
        const product = getProduct(p.productId);
        orderDetailsHtml += `
        <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${p.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${p.quantity}
              </div>
              <button class="cancel-button button-primary js-cancel-button" data-product-id="${product.id}" data-order-id="${orderId}">
                <img class="cancel-icon" src="images/icons/buy-again.png">
                <span class="cancel-message">Cancel Product</span>
              </button>
            </div>
          </div>
        `;
    });
    return orderDetailsHtml;
}

function orderContainerHtml(){
    let orderGridHtml = '';

    orders.forEach(order => {
        
        orderGridHtml += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          ${orderDetailsHtml(order.products, order.id)}
        </div>
        `;
    });
    return orderGridHtml;
};

function renderOrder(){
    
    if(orders.length <= 0){
        const orderGrid = document.querySelector('.js-order-grid');
        if(orderGrid){
            orderGrid.innerHTML = `<h2>YOU HAVE NO ORDERS PLACED</h2>`;
        }
        return;        
    }
    document.querySelector('.js-order-grid').innerHTML = orderContainerHtml();

    document.querySelectorAll('.js-cancel-button').forEach(link =>{
    
            link.addEventListener('click', () =>{
                const productId = link.dataset.productId;
                const orderId = link.dataset.orderId;
                removeProductFromOrder(orderId, productId);
            });  
        });
    cart.emptyCart();
};