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
// this is an array of rout items
const routes = [
    // 'category/:id is the path to match
    // ProductListService is the instance of the component that's created when the path is matched
    // Note there is no beginning forward slash for the path, but ther is a forward slash for redirectTo:
    // ORDER MATTERS! First match that wins from top down is served!
    // Route order needs to be most specific to most generic
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
            SearchComponent
        ],
        imports: [
            RouterModule.forRoot(routes),
            BrowserModule,
            HttpClientModule // This is the module that contains the HttpClient
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map