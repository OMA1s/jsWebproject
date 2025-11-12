export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }
];
}

export function updateQuantity(productId, quantity){
    let match;
    cart.forEach(item =>{
        if(item.productId == productId)
            match = item;
    });
    if(match)
        match.quantity = quantity;
}

export function getCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;
}
function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let match;
    cart.forEach((val) => {
        if (val.productId === productId){
            match = val;
        }
    });
    if(!match){
        cart.push({productId : productId,
        quantity : 1,
        deliveryOptionId: '1'
    });
    }
    else{
        match.quantity += 1;
    }
    saveToStorage();
}

export function removeFromCart(productId){
    let id = -1;
    cart.forEach((val, index) => {
        if (val.productId === productId){
            id = index;
        }
    });
    if(id >= 0){
        cart.splice(id, 1);
    }
    
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let match;
    cart.forEach((val) => {
        if (val.productId === productId){
            match = val;
        }
    });

    match.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}