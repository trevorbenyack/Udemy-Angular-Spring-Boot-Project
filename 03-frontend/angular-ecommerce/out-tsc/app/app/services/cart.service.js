import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let CartService = class CartService {
    constructor() {
        this.cartItems = [];
        // Subject is a subclass of observable
        // we can use the subject to publish events in our code
        // and the event will be sent to all subscribers.
        // Any subscribers to a Subject object, will only receive
        // events once they subscribe. Any past events from the
        // Subscribe object will not passed on.
        // Remedy: use Behavior Subject
        // BehaviorSubject is a subclass of Subject
        // it holds the last/most recent event value and sends it to the
        // component when the subscription occurs.
        // (There's also ReplaySubject which will send all past events, but
        // we only need the very last event in our case here)
        this.totalPrice = new BehaviorSubject(0);
        this.totalQuantity = new BehaviorSubject(0);
        // using sessionStorage:
        // sessionStorage is a reference to the web browser's session storage
        // storage: Storage = sessionStorage;
        // using localStorage:
        // with localStorage data is persisted and survives browser restarts
        this.storage = localStorage;
        // read data from storage
        let data = JSON.parse(this.storage.getItem('cartItems'));
        if (data != null) {
            this.cartItems = data;
            // compute totals based on the data that is read from storage
            this.computeCartTotals();
        }
    }
    addToCart(theCartItem) {
        // check if we already have the item in our cart
        let alreadyExistsInCart;
        let existingCartItem = undefined;
        if (this.cartItems.length > 0) {
            // find the item in the cart based on item id
            // .find() returns the first element that passes,
            // otherwise it returns undefined
            // tempCartItem.id === theCartItem.id is the test that is
            // executed for each element in the array until the test passes
            existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
        }
        // check if we found it
        alreadyExistsInCart = (existingCartItem != undefined);
        if (alreadyExistsInCart && existingCartItem != null) {
            existingCartItem.quantity++;
        }
        else {
            // just add the item to the array
            this.cartItems.push(theCartItem);
        }
        // compute cart total price and total quantity
        this.computeCartTotals();
    }
    computeCartTotals() {
        let totalPriceValue = 0;
        let totalQuantityValue = 0;
        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
            // publish the new values... all subscribers will receive the new data
            // .next(...) is what actually publishes/sends the event
            this.totalPrice.next(totalPriceValue);
            this.totalQuantity.next(totalQuantityValue);
            // log cart data just for debugging purposes
            this.logCartData(totalPriceValue, totalQuantityValue);
            // persist cart data
            this.persistCartItems();
        }
    } // end computeCartTotals()
    persistCartItems() {
        this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    logCartData(totalPriceValue, totalQuantityValue) {
        for (let tempCartItem of this.cartItems) {
            const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
            console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
        }
        // .toFixed(2) formats the decimal to two places
        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log(`----`);
    }
    decrementQuantity(theCartItem) {
        theCartItem.quantity--;
        if (theCartItem.quantity === 0) {
            this.remove(theCartItem);
        }
        else {
            this.computeCartTotals();
        }
    }
    remove(theCartItem) {
        // get index of item in the array
        const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
        // if found, remove the item from the array at the given index
        if (itemIndex > -1) {
            this.cartItems.splice(itemIndex, 1);
            this.computeCartTotals();
        }
    }
}; // end class
CartService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map