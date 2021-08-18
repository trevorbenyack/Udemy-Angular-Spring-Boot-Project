import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// This is using dependency injection to inject the ProductService for use throughout the app
let ProductService = class ProductService {
    // Injects HttpClient
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = environment.luv2shopApiUrl + "/products";
        this.categoryUrl = environment.luv2shopApiUrl + "/product-categories";
    }
    getProduct(theProductId) {
        // need to build URL based on product id
        const productUrl = `${this.baseUrl}/${theProductId}`;
        // no need to "unwrap" this, b/c it's not embedded within an outer object
        return this.httpClient.get(productUrl);
    }
    // Spring Data REST supports pagination out of the box...
    // just send the parameters for page and size
    getProductListPaginate(thePage, thePageSize, theCategoryId) {
        // need to build URL based on category id, page, and size
        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
            + `&page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get(searchUrl);
    }
    // It's best practice to create a scalable solution by defining re-usable injectable
    // services to perform data-handling functionality, which is what we're doing with
    // the getProductList() and getProductCategories() methods.
    // takes in the categoryId passed to it and returns an observable of Product[]
    // This method is basically going to map the JSON data from the Spring data REST service
    // to a product array.
    getProductList(theCategoryId) {
        // need to build URL based on category id
        const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
        return this.getProducts(searchUrl);
    }
    searchProducts(theKeyword) {
        // need to build URL based on keyword
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
        return this.getProducts(searchUrl);
    }
    searchProductsPaginate(thePage, thePageSize, theKeyword) {
        // need to build URL based on category keyword, page, and size
        const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
            + `&page=${thePage}&size=${thePageSize}`;
        return this.httpClient.get(searchUrl);
    }
    getProducts(searchUrl) {
        // The end product being returned is an observable Product[]
        return this // this class instance
            .httpClient // the injected HttpClient
            // Using an interface (ResponseProduct) allows us to declare the type of the response object
            // and therefore allows us to use the map operator below!
            // the .get() method actually parses the JSON into an observable object behind the scenes and returns it
            .get(searchUrl)
            // pipe can be used to sequentially combine multiple functions into a single function.
            // Pipe is taking the observable and passing it to each function (just map in this case)
            // map then returns all the elements and also adds Products[] for direct access.
            // i.e. this last part is "unwrapping" the products array from the _embedded wrapper.
            .pipe(map(response => response._embedded.products));
    }
    // map(...) unwraps the JSON from the Spring Data REST response so that it can be accessed directly
    // see above getProductList() comments for explanation
    getProductCategories() {
        return this.httpClient.get(this.categoryUrl).pipe(map(response => response._embedded.productCategories));
    }
}; // end ProductService class
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map