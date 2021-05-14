import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductListComponent = class ProductListComponent {
    // (private productListService: ProductService) is dependency injection
    // ActivatedRoute is also injected
    // ActivatedRoute is the current active route that loaded the component.
    // This is useful for accessing route parameters
    constructor(productService, route) {
        this.productService = productService;
        this.route = route;
    }
    // once this component is initialized it will call this method
    // this.listProducts() was alone by itself originally
    // and then we wrapped it in the .subscribe(() => {})
    // NOT SURE WHAT'S GOING ON HERE :(
    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }
    listProducts() {
        // This checks to see if the keyword param is present
        // ('keyword') is the param we listed in our Route[]
        // {path: 'search/:keyword', component: ProductListComponent}
        this.searchMode = this.route.snapshot.paramMap.has('keyword');
        if (this.searchMode) {
            this.handleSearchProducts();
        }
        else {
            this.handleListProducts();
        }
    } // end listProducts() method
    handleSearchProducts() {
        const theKeyword = this.route.snapshot.paramMap.get('keyword');
        // now search for products using keyword
        this.productService.searchProducts(theKeyword).subscribe(data => {
            this.products = data;
        });
    }
    // Overview: we call .getProductList() and subscribe to that data
    // and then that data is brought into our class
    handleListProducts() {
        // .getProductList() isn't invoked until subscribed to (happens below)
        // this executes in an asynchronous fashion
        // and once it returns the data, we can the data to our own property (this.products --> a Product[])
        // checks if "id" parameter is available
        // Breakdown:
        // .route - use the activated route
        // .snapshot - state of route at this given moment in time
        // .paramMap - is the map of all the route parameters
        // .has('id') - we read the given id parameter and if it exists, returns true, if not, returns false
        // 'id' comes from the <a routerLink="/category/1 ...> link in the menu side bar
        // and matches the the route path: 'category/:id' in our routes array
        const hasCategoryId = this.route.snapshot.paramMap.has('id');
        if (hasCategoryId) {
            // get the "id" param string. convert string to a number using the "+" symbol
            // Parameter value is returned as string so we use the "+" symbol to convert to a number
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
        }
        else {
            // if category id is not available .. default to category id 1
            this.currentCategoryId = 1;
        }
        this.productService.getProductList(this.currentCategoryId).subscribe(data => {
            this.products = data;
        });
    } // end handleListProducts()
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        templateUrl: './product-list-grid.component.html',
        styleUrls: ['./product-list.component.css']
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map