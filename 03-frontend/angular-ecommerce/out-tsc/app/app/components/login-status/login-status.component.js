import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginStatusComponent = class LoginStatusComponent {
    constructor(oktaAuthService) {
        this.oktaAuthService = oktaAuthService;
        this.isAuthenticated = false;
        this.storage = sessionStorage;
    }
    ngOnInit() {
        // Subscribe to authentication state changes
        this.oktaAuthService.$authenticationState.subscribe((result) => {
            this.isAuthenticated = result;
            this.getUserDetails();
        });
    }
    getUserDetails() {
        if (this.isAuthenticated) {
            // Fetch the logged in user details (user's claims)
            //
            // user full name is exposed as a property name
            this.oktaAuthService.getUser().then((res) => {
                this.userFullName = res.name;
                // retrieve the user's email from authentication response;
                const theEmail = res.email;
                // now store the email in browser storage
                this.storage.setItem('userEmail', JSON.stringify(theEmail));
            });
        }
    }
    logout() {
        // Terminate the session with Okta and removes current tokens.
        this.oktaAuthService.signOut();
    }
};
LoginStatusComponent = __decorate([
    Component({
        selector: 'app-login-status',
        templateUrl: './login-status.component.html',
        styleUrls: ['./login-status.component.css']
    })
], LoginStatusComponent);
export { LoginStatusComponent };
//# sourceMappingURL=login-status.component.js.map