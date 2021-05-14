import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CartItem } from '../common/cart-item';
let ProductListComponent = class ProductListComponent {
    // (private productListService: ProductService) is dependency injection
    // ActivatedRoute is also injected
    // ActivatedRoute is the current active route that loaded the component.
    // This is useful for accessing route parameters
    constructor(productService, route, cartService) {
        this.productService = productService;
        this.route = route;
        this.cartService = cartService;
        this.products = [];
        this.previousCategoryId = 1;
        this.currentCategoryId = 1;
        this.searchMode = false;
        // properties for pagination
        this.thePageNumber = 1;
        this.thePageSize = 5;
        this.theTotalElements = 0;
        this.previousKeyword = null;
    }
    // once this component is initialized it will call this method
    // This component is being used called by two different routes:
    // search and list
    // Angular will re-use the component instance, so if currently
    // viewing a list, and then immediately doing a search
    // the component will not re-initialize.
    // By wrapping this.listProducts() in .subscribe, any time
    // the parameters for something calling this route change,
    // it will automatically call this.listProducts() and
    // *in-essence*, re-initialize the component.
    // NOTE: You can also extract the parameters in this step
    // if they were needed by using:
    // .subscribe((params: ParamMap) => {
    //    this.myObject.myProperty = params.get('myParam1');
    //    this.myObject.myProperty = params.get('myParam2'};
    // }
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
        // if we have a different keyword than previous
        // then set thePageNumber to 1
        if (this.previousKeyword != theKeyword) {
            this.thePageNumber = 1;
        }
        this.previousKeyword = theKeyword;
        console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
        // now search for products using keyword
        this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult());
    } // end handleSearchProducts() method
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
        // Check if we have a different category than previous
        // Note: Angular will reuse a component if it is currently being viewed
        // therefore....
        // if we have a different category id than previous
        // we need to set thePageNumber back to 1
        if (this.previousCategoryId != this.currentCategoryId) {
            this.thePageNumber = 1;
        }
        // this assignment is so the above conditional is not met, during a page change
        // for the same category type.
        this.previousCategoryId = this.currentCategoryId;
        console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
        // this.thePage - 1: Pagination component pages are 1-based, Spring Data REST pages are 0-based
        this.productService
            .getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());
        // NOTE for .subscribe(this.processResult());
        // To execute the observable you have created (.getProductListPaginate()) and begin receiving notifications,
        // you call its subscribe() method, passing an observer.
        // In this case, this.processResult() is the observer. It handles the data/notifications received.
    } // end handleListProducts()
    processResult() {
        return data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
        };
    } // end processResult() method
    updatePageSize(target) {
        this.thePageSize = +target.value;
        this.thePageNumber = 1;
        this.listProducts();
    } // end updatePageSize() method
    addToCart(theProduct) {
        console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
        const theCartItem = new CartItem(theProduct);
        this.cartService.addToCart(theCartItem);
    }
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