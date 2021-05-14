import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

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
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      // .find() returns the first element that passes,
      // otherwise it returns undefined
      // tempCartItem.id === theCartItem.id is the test that is
      // executed for each element in the array until the test passes
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id );
    }

    // check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart && existingCartItem != null) {
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

      // publish the new values... all subscribers will receive the new data
      // .next(...) is what actually publishes/sends the event
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      // log cart data just for debugging purposes
      this.logCartData(totalPriceValue, totalQuantityValue)
    }
  } // end computeCartTotals()

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`)
    }
    // .toFixed(2) formats the decimal to two places
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log(`----`)
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id)

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
} // end class

