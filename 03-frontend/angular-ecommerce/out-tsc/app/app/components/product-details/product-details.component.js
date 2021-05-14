import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { CartItem } from '../../common/cart-item';
let ProductDetailsComponent = class ProductDetailsComponent {
    constructor(productService, cartService, route) {
        this.productService = productService;
        this.cartService = cartService;
        this.route = route;
        // assigning an empty project avoids angular race condition
        // getProduct is called in an asynchronous fashion
        // so the template can be rendered before the data arrives
        // angular will auto update the template once the imageUrl
        // is assigned below (known as data binding), but we may still
        // get a "product is undefined" error in the console log if
        // we don't assign a new instance of product below.
        // Another option is to put the safe-navigation operator "?" on
        // the field in the template
        this.product = new Product();
    }
    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.handleProductDetails();
        });
    }
    handleProductDetails() {
        // get the "id" param string. convert string to a number using the "+" symbol
        const theProductId = +this.route.snapshot.paramMap.get('id');
        this.productService.getProduct(theProductId).subscribe(data => {
            this.product = data;
        });
    } // end handleProductDetails method
    addToCart() {
        console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
        const theCartItem = new CartItem(this.product);
        this.cartService.addToCart(theCartItem);
    }
};
ProductDetailsComponent = __decorate([
    Component({
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css']
    })
], ProductDetailsComponent);
export { ProductDetailsComponent };
//# sourceMappingURL=product-details.component.js.map