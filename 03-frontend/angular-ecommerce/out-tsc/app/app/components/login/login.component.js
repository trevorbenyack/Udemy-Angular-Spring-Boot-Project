import { __decorate } from "tslib";
import { Component } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import * as OktaSignIn from '@okta/okta-signin-widget';
let LoginComponent = class LoginComponent {
    constructor(oktaAuthService) {
        this.oktaAuthService = oktaAuthService;
        this.oktaSignin = new OktaSignIn({
            logo: 'assets/images/logo.png',
            features: {
                registration: true
            },
            baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
            clientId: myAppConfig.oidc.clientId,
            redirectUri: myAppConfig.oidc.redirectUri,
            authParams: {
                // Proof Key for Code Exchange
                // Recommended approach for controlling access between app and auth server
                // Protects against Authorization Code Interception attacks
                pkce: true,
                issuer: myAppConfig.oidc.issuer,
                scopes: myAppConfig.oidc.scopes
            }
        });
    }
    ngOnInit() {
        // this.oktaSignin.remove();
        //
        // // tutorial used .renderEl -- had to change to .showSignInToGetTokens
        // this.oktaSignin.renderEl({
        //     // render element with given ID
        //     // this name should be the same as div tag id in login.component.html
        //     el: '#okta-sign-in-widget'
        //   },
        //   (response) => {
        //     console.log('response is:');
        //     console.log(response);
        //     if (response.status === 'SUCCESS') {
        //       this.oktaSignin.remove();
        //       this.oktaAuthService.signInWithRedirect({originalUri:'/products'});
        //     }
        //   },
        //   (error) => {
        //     throw error;
        //   });
        this.oktaSignin.showSignInToGetTokens({
            el: '#okta-sign-in-widget',
            scopes: myAppConfig.oidc.scopes
        }).then(tokens => {
            // Remove the widget
            this.oktaSignin.remove();
            // In this flow the redirect to Okta occurs in a hidden iframe
            this.oktaAuthService.handleLoginRedirect(tokens);
        }).catch(err => {
            // Typically due to misconfiguration
            throw err;
        }); // end showSignInToGetTokens();
    } // end ngOnInit
    ngOnDestroy() {
        this.oktaSignin.remove();
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map