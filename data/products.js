import { formatCurrency } from "../scripts/utils/money.js";

class product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }
}


export function getProduct(productId){
  let product;
    for(let i = 0; i < products.length; i++){
      if(products[i].id === productId){
          product = products[i];
          break;
      }
    }
  return product;
}

export let products = [];

export function loadProducts(func){
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) =>{
      return new product(productDetails);
    });
    func();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
  
}