import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
let AuthInterceptor = class AuthInterceptor {
    constructor(oktaAuth) {
        this.oktaAuth = oktaAuth;
    }
    intercept(request, next) {
        return from(this.handleAccess(request, next));
        //return next.handle(request);
    }
    handleAccess(request, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersEndpoint = environment.luv2shopApiUrl + '/orders';
            // Only add an access token for secured endpoints
            const securedEndpoints = [ordersEndpoint];
            if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {
                // get access token
                const accessToken = yield this.oktaAuth.getAccessToken();
                // clone the request and add new header with access token
                // we're cloning b/c the request itself is immutable, so we have
                // to make a copy first
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
            }
            // This basically says to go ahead and continue to other interceptors that are in the chain
            // if there are no interceptors, then just simply make the call to the given rest API
            return next.handle(request).toPromise();
        });
    } // end handleAccess()
};
AuthInterceptor = __decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map