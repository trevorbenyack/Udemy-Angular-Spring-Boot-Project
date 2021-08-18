import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let CheckoutService = class CheckoutService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.purchaseUrl = environment.luv2shopApiUrl + '/checkout/purchase';
        this.storage = localStorage;
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