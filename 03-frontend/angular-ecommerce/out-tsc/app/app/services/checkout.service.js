import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CheckoutService = class CheckoutService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
    }
    placeOrder(purchase) {
        return this.httpClient.post(this.purchaseUrl, purchase);
    }
};
CheckoutService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CheckoutService);
export { CheckoutService };
//# sourceMappingURL=checkout.service.js.map