import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummsary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

async function loadPage(){
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummsary();
};
loadPage();
/*
loadProductsFetch().then(() =>{
    renderOrderSummary();
    renderPaymentSummsary();
});
*/
/*
new Promise((resolve) =>{
    loadProducts(() =>{
        resolve();
    });
}).then(() =>{
    renderOrderSummary();
    renderPaymentSummsary();
});
*/