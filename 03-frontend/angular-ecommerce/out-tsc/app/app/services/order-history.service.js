import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let OrderHistoryService = class OrderHistoryService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.orderUrl = 'http://localhost:8080/api/orders';
    }
    getOrderHistory(theEmail) {
        // need to build URL based on the customer email
        const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
        return this.httpClient.get(orderHistoryUrl);
    }
};
OrderHistoryService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OrderHistoryService);
export { OrderHistoryService };
//# sourceMappingURL=order-history.service.js.map