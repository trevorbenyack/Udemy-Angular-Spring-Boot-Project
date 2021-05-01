import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductListComponent = class ProductListComponent {
    // (private productListService: ProductService) is dependency injection
    constructor(productService) {
        this.productService = productService;
    }
    // once this component is initialized it will call this method
    ngOnInit() {
        this.listProducts();
    }
    // Overview: we call .getProductList() and subscribe to that data
    // and then that data is brought into our class
    listProducts() {
        // .getProductList() isn't invoked until subscribed to (happens below)
        // this executes in an asynchronous fashion
        // and once it returns the data, we can the data to our own property (this.products)
        this.productService.getProductList().subscribe(data => {
            this.products = data;
        });
    }
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css']
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map