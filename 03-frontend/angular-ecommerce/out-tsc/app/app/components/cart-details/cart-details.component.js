import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CartDetailsComponent = class CartDetailsComponent {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartItems = [];
        this.totalPrice = 0;
        this.totalQuantity = 0;
    }
    ngOnInit() {
        this.listCartDetails();
    }
    listCartDetails() {
        // get a handle to the cart items
        this.cartItems = this.cartService.cartItems;
        // subscribe to the cart totalPrice
        this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
        // subscribe to the cart totalQuantity
        this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
        // compute cart total price and quantity
        this.cartService.computeCartTotals();
    }
    incrementQuantity(theCartItem) {
        this.cartService.addToCart(theCartItem);
    }
    decrementQuantity(theCartItem) {
        this.cartService.decrementQuantity(theCartItem);
    }
    remove(theCartItem) {
        this.cartService.remove(theCartItem);
    }
};
CartDetailsComponent = __decorate([
    Component({
        selector: 'app-cart-details',
        templateUrl: './cart-details.component.html',
        styleUrls: ['./cart-details.component.css']
    })
], CartDetailsComponent);
export { CartDetailsComponent };
//# sourceMappingURL=cart-details.component.js.map