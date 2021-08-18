import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OrderHistoryComponent = class OrderHistoryComponent {
    constructor(orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
        this.orderHistoryList = [];
        this.storage = sessionStorage; // Reference to web browser's session storage
    }
    ngOnInit() {
        this.handleOrderHistory();
    }
    handleOrderHistory() {
        // read the user's email address from browser storage
        const theEmail = (JSON.parse(this.storage.getItem('userEmail')));
        // retrieve data from the service
        this.orderHistoryService.getOrderHistory(theEmail).subscribe(data => {
            this.orderHistoryList = data._embedded.orders;
        });
    }
};
OrderHistoryComponent = __decorate([
    Component({
        selector: 'app-order-history',
        templateUrl: './order-history.component.html',
        styleUrls: ['./order-history.component.css']
    })
], OrderHistoryComponent);
export { OrderHistoryComponent };
//# sourceMappingURL=order-history.component.js.map