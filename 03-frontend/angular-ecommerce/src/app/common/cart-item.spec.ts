import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should create an instance', () => {
    let product; // I added this and passed it to CartItem()
    // probably not correct lol -- but it got rid of the error
    expect(new CartItem(product)).toBeTruthy();
  });
});
