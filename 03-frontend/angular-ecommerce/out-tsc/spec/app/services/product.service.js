import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// This is using dependency injection to inject the ProductService for use throughout the app
let ProductService = class ProductService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = 'http://localhost:8080/api/products';
    }
    // Returns an observable of Product[]
    // This method is basically going to map the JSON data from the Spring data REST service
    // to a product array.
    getProductList() {
        return this.httpClient.get(this.baseUrl).pipe(map(response => response._embedded.products));
    }
}; // end ProductService class
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map