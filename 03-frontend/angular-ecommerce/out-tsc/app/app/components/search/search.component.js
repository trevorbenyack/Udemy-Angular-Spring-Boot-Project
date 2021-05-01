import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SearchComponent = class SearchComponent {
    // First thing to do is inject the router into our component
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    doSearch(value) {
        console.log(`value=${value}`);
        // this rotes the data to our "search" route, which will
        // then be handled by the ProductListComponent
        // We're reusing the logic and view for listing products
        // no sense in trying to reinvent the wheel lol
        this.router.navigateByUrl(`/search/${value}`);
    }
};
SearchComponent = __decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map