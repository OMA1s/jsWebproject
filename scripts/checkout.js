import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummsary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

async function loadCheckoutPage(){
    try{
        await loadProductsFetch();
    }
    catch (error) {
        console.log('Error: ' + error + '. Try again!');
    }
    renderOrderSummary();
    renderPaymentSummsary();
};
loadCheckoutPage();
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