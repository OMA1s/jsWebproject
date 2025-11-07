export const cart = [];

export function addToCart(productId){
    let match;
    cart.forEach((val) => {
        if (val.productName === productId){
            match = val;
        }
    });
    if(!match){
        cart.push({productId : productId,
        quantity : 1
    });
    }
    else{
        match.quantity += 1;
    }
}