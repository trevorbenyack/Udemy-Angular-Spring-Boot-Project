import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductCategoryMenuComponent = class ProductCategoryMenuComponent {
    constructor(productService) {
        this.productService = productService;
    }
    ngOnInit() {
        this.listProductCategories();
        console.log(this.productCategories);
    }
    // The data returned from listProductCategories
    listProductCategories() {
        this.productService.getProductCategories().subscribe(data => {
            console.log('Product Categories=' + JSON.stringify(data));
            this.productCategories = data;
        });
    }
};
ProductCategoryMenuComponent = __decorate([
    Component({
        selector: 'app-product-category-menu',
        templateUrl: './product-category-menu.component.html',
        styleUrls: ['./product-category-menu.component.css']
    })
], ProductCategoryMenuComponent);
export { ProductCategoryMenuComponent };
//# sourceMappingURL=product-category-menu.component.js.map