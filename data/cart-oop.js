function generateCart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage: function(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems){
                this.cartItems = [
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity: 1,
                        deliveryOptionId: '2'
                    }];
                }
        },
        
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId){
            let match;
            this.cartItems.forEach((val) => {
                if (val.productId === productId){
                    match = val;
                }
            });
            if(!match){
                this.cartItems.push({productId : productId,
                quantity : 1,
                deliveryOptionId: '1'
            });
            }
            else{
                match.quantity += 1;
            }
            this.saveToStorage();
        },

        updateDeliveryOption(productId, deliveryOptionId){
            let match;
            this.cartItems.forEach((val) => {
                if (val.productId === productId){
                    match = val;
                }
            });

            match.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        },

        updateQuantity(productId, quantity){
            let match;
            this.cartItems.forEach(item =>{
                if(item.productId == productId)
                    match = item;
            });
            if(match)
                match.quantity = quantity;
        },

        getCartQuantity(){
            let cartQuantity = 0;
            this.cartItems.forEach(item => {
                cartQuantity += item.quantity;
            });
            return cartQuantity;
        },

        removeFromCart(productId){
            let id = -1;
            this.cartItems.forEach((val, index) => {
                if (val.productId === productId){
                    id = index;
                }
            });
            if(id >= 0){
                cart.splice(id, 1);
            }
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = generateCart('cart-oop');
const businessCart = generateCart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);