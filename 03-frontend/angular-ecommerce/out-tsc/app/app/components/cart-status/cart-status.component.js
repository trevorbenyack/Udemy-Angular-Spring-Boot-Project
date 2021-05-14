import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CartStatusComponent = class CartStatusComponent {
    constructor(cartService) {
        this.cartService = cartService;
        this.totalPrice = 0.00;
        this.totalQuantity = 0;
    }
    ngOnInit() {
        this.updateCartStatus();
    }
    // by subscribing to the variables is the cartService,
    // when new events are received, the assignments
    // make the UI update
    updateCartStatus() {
        // subscribe to the cart totalPrice
        this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
        // subscribe to the cart totalQuantity
        this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    } // end updateCartStatus()
};
CartStatusComponent = __decorate([
    Component({
        selector: 'app-cart-status',
        templateUrl: './cart-status.component.html',
        styleUrls: ['./cart-status.component.css']
    })
], CartStatusComponent);
export { CartStatusComponent };
//# sourceMappingURL=cart-status.component.js.map