import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';
import { OrderItem } from '../../common/order-item';
import { Order } from '../../common/order';
import { Purchase } from '../../common/purchase';
let CheckoutComponent = class CheckoutComponent {
    constructor(formBuilder, luv2ShopFormService, cartService, checkoutService, router) {
        this.formBuilder = formBuilder;
        this.luv2ShopFormService = luv2ShopFormService;
        this.cartService = cartService;
        this.checkoutService = checkoutService;
        this.router = router;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.creditCardYears = [];
        this.creditCardMonths = [];
        this.countries = [];
        this.shippingAddressStates = [];
        this.billingAddressStates = [];
    }
    ngOnInit() {
        this.reviewCartDetails();
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl('', [Validators.required,
                    Validators.minLength(2),
                    Luv2ShopValidators.notOnlyWhitespace]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
            }),
            shippingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace])
            }),
            billingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace])
            }),
            creditCard: this.formBuilder.group({
                cardType: new FormControl('', [Validators.required]),
                nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
                cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                expirationMonth: [''],
                expirationYear: [''],
            }),
        });
        // populate credit card months
        const startMonth = new Date().getMonth() + 1;
        console.log('startMonth: ' + startMonth);
        this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
            console.log('Retrieved credit card months: ' + JSON.stringify(data));
            this.creditCardMonths = data;
        });
        // populate credit card years
        this.luv2ShopFormService.getCreditCardYears().subscribe(data => {
            console.log('Retrieved credit card years: ' + JSON.stringify(data));
            this.creditCardYears = data;
        });
        // populate countries
        this.luv2ShopFormService.getCountries().subscribe(data => {
            console.log('Retrieved countries: ' + JSON.stringify(data));
            this.countries = data;
        });
    } // end ngOnInit()
    // These are typescript getter methods for form fields. They use a special syntax:
    // get myVariable() { return this.myVariableName; }
    // The method name doesn't particularly matter, but when accessing the variable
    // in the template, the name used in the template must match the method name.
    // These getter methods return the FormControl objects (which were initialized with
    // validation rules) to the view.
    // The view can then access the .invalid & .errors properties of the form control object
    // in order to show elements/control flow based on the form control's value's validity
    get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
    get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
    get email() { return this.checkoutFormGroup.get('customer.email'); }
    get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
    get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
    get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
    get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
    get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
    get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
    get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
    get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
    get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
    get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
    get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
    get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
    get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
    get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
    copyShippingAddressToBillingAddress(event) {
        if (event.target.checked) {
            // this copies the shipping address value to billing address value
            this.checkoutFormGroup.controls.billingAddress
                .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
            // bug fix for states
            this.billingAddressStates = this.shippingAddressStates;
        }
        else {
            // this will reset all the fields on the billingAddress form group
            this.checkoutFormGroup.controls.billingAddress.reset();
            // bug fix for states
            this.billingAddressStates = [];
        }
    } // end copyShippingAddressToBillingAddress() method
    onSubmit() {
        console.log('Handling the submit button');
        // if there are invalid values in the fields, mark all the fields as touched
        // (will show alerts for all invalid fields) and then exit the function
        // i.e. don't do anything...
        if (this.checkoutFormGroup.invalid) {
            // .markAllAsTouched() => touching all fields triggers the display of the error messages
            this.checkoutFormGroup.markAllAsTouched();
            return;
        }
        // Logging -- can be removed
        console.log(this.checkoutFormGroup.get('customer').value);
        // It is possible to get specific properties:
        console.log('The email address is ' + this.checkoutFormGroup.get('customer').value.email);
        console.log('The shipping address country is ' + this.checkoutFormGroup.get('shippingAddress').value.country.name);
        console.log('The shipping address state is ' + this.checkoutFormGroup.get('shippingAddress').value.state.name);
        // set up order
        let order = new Order();
        order.totalPrice = this.totalPrice;
        order.totalQuantity = this.totalQuantity;
        // get cart items
        const cartItems = this.cartService.cartItems;
        // create orderItems from cartItems
        // At this point, not exactly sure why we need this conversion...
        // Guessing it has something to do with how we set up the backend
        let orderItems = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
        // set up purchase
        let purchase = new Purchase();
        // populate purchase - customer
        purchase.customer = this.checkoutFormGroup.controls['customer'].value;
        // populate purchase - shipping address
        purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
        const shippingState = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
        const shippingCountry = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
        purchase.shippingAddress.state = shippingState.name;
        purchase.shippingAddress.country = shippingCountry.name;
        // populate purchase - billing address
        purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
        const billingState = JSON.parse(JSON.stringify(purchase.billingAddress.state));
        const billingCountry = JSON.parse(JSON.stringify(purchase.billingAddress.country));
        purchase.billingAddress.state = billingState.name;
        purchase.billingAddress.country = billingCountry.name;
        // populate purchase - order and orderItems
        purchase.order = order;
        purchase.orderItems = orderItems;
        // call REST API via the CheckoutService
        this.checkoutService.placeOrder(purchase).subscribe({
            // success/happy
            next: response => {
                alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);
                // reset cart
                this.resetCart();
            },
            // error/exception
            error: err => {
                alert(`There was an error: ${err.message}`);
            }
        });
    } // end onSubmit() method
    handleMonthsAndYears() {
        const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
        const currentYear = new Date().getFullYear();
        const selectedYear = Number(creditCardFormGroup.value.expirationYear);
        // if the current year equals the selected year, then start with the current month
        let startMonth;
        if (currentYear === selectedYear) {
            startMonth = new Date().getMonth() + 1;
        }
        else {
            startMonth = 1;
        }
        this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
            console.log('Retrieved credit card months: ' + JSON.stringify(data));
            this.creditCardMonths = data;
        });
    } // end handleMonthsAndYears() method
    // this is called when the country is selected in the checkout form
    // calls the getStates() in the luv2shopFormService (which
    // returns an array of State objects) and then assigns the
    // State[] to the ...AddressStates variable in this class which
    // will then be used to populate the states select tag in the
    // checkout view.
    getStates(formGroupName) {
        // gets a handle to the form group using the form group name
        // .get() method is from the AbstractControl parent class for
        // FormControl, FormGroup, and FormArray
        // in this case, it takes in a string, and returns the
        // FormControl object for the formGroupName
        const formGroup = this.checkoutFormGroup.get(formGroupName);
        const countryCode = formGroup.value.country.code;
        const countryName = formGroup.value.country.name;
        console.log(`${formGroupName} country code: ${countryCode}`);
        console.log(`${formGroupName} country name: ${countryName}`);
        this.luv2ShopFormService.getStates(countryCode).subscribe(data => {
            if (formGroupName === 'shippingAddress') {
                this.shippingAddressStates = data;
            }
            else {
                this.billingAddressStates = data;
            }
            // select first item by default
            formGroup.get('state').setValue(data[0]);
        });
    } // end getStates() method
    reviewCartDetails() {
        // subscribe to cartService.totalQuantity
        this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);
        // subscribe to cartService.totalPrice
        this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
    }
    resetCart() {
        // reset cart data
        this.cartService.cartItems = [];
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);
        // reset the form
        this.checkoutFormGroup.reset();
        // navigate back to the products page
        this.router.navigateByUrl("/products");
    }
};
CheckoutComponent = __decorate([
    Component({
        selector: 'app-checkout',
        templateUrl: './checkout.component.html',
        styleUrls: ['./checkout.component.css']
    })
], CheckoutComponent);
export { CheckoutComponent };
//# sourceMappingURL=checkout.component.js.map