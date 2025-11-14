import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummsary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummsary();
});
