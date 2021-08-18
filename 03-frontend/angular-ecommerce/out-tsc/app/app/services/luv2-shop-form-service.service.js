import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
let Luv2ShopFormServiceService = class Luv2ShopFormServiceService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.countriesUrl = environment.luv2shopApiUrl + "/countries";
        this.statesUrl = environment.luv2shopApiUrl + "/states";
    }
    getCountries() {
        return this.httpClient.get(this.countriesUrl).pipe(map(response => response._embedded.countries));
    }
    getStates(theCountryCode) {
        // searchUrl
        const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
        return this.httpClient.get(searchStatesUrl).pipe(map(response => response._embedded.states));
    }
    // we're using observables here b/c our angular component is going
    // to subscribe to this method to receive the async data
    getCreditCardMonths(startMonth) {
        let data = [];
        // build an array for "Month" dropdown list
        // - start at current month and loop until
        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            // .push adds theMonth to the data array
            data.push(theMonth);
        }
        // the of operator from rxjs will wrap an object as an Observable!
        return of(data);
    }
    getCreditCardYears() {
        let data = [];
        // build an array for "Year" dropdown list
        // - start at current year and loop for next 10 years
        const startYear = new Date().getFullYear();
        const endYear = startYear + 10;
        for (let theYear = startYear; theYear <= endYear; theYear++) {
            data.push(theYear);
        }
        return of(data);
    }
};
Luv2ShopFormServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], Luv2ShopFormServiceService);
export { Luv2ShopFormServiceService };
//# sourceMappingURL=luv2-shop-form-service.service.js.map