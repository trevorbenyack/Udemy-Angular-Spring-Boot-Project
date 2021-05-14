import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// this was added when we added the HttpClientModule below
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
// this is an array of rout items
const routes = [
    // path: 'myPath' is the path to match for the corresponding component
    // ProductListService is the instance of the component that's created when the path is matched
    // Note there is no beginning forward slash for the path, but there is a forward slash for redirectTo:
    // ORDER MATTERS! First match that wins from top down is served!
    // Route order needs to be most specific to most generic
    { path: 'checkout', component: CheckoutComponent },
    { path: 'cart-details', component: CartDetailsComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' } // Returns ProductListComponent for any non-existent route
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            ProductListComponent,
            ProductCategoryMenuComponent,
            SearchComponent,
            ProductDetailsComponent,
            CartStatusComponent,
            CartDetailsComponent,
            CheckoutComponent
        ],
        imports: [
            RouterModule.forRoot(routes),
            BrowserModule,
            HttpClientModule,
            // exposes the exported declarations in NgbModule (classes, interfaces, constants, etc
            // and makes them available in the current module
            NgbModule,
            ReactiveFormsModule // allows us to use reactive forms in our project
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map