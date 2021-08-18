import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule, Router} from '@angular/router';

// this was added when we added the HttpClientModule below
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthInterceptor } from './services/auth.interceptor';

import {
  OKTA_CONFIG, OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import {ProductService} from './services/product.service';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

// this is an Angular InjectionToken used to configure the OktaAuthService
const oktaConfig = Object.assign({
  // onAuthRequired is triggered when a route protected by OktaAuthGuard is
  // accessed without authentication. This is used to present a custom login page.
  // added the oktaAuth argument to follow Okta's sample project
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    // added brackets around '/login' to follow Okta's sample project
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

// this is an array of route items
const routes: Routes = [
  // path: 'myPath' is the path to match for the corresponding component
  // ProductListService is the instance of the component that's created when the path is matched
  // Note there is no beginning forward slash for the path, but there is a forward slash for redirectTo:
  // ORDER MATTERS! First match that wins from top down is served!
  // Route order needs to be most specific to most generic

  // Normally you'd need to parse the Okta response and store the OAuth + OIDC tokens,
  // but the OktaCallBackComponent does this for us
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'}, // Match the whole path instead of just the prefix
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // Returns ProductListComponent for any non-existent route
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // (routes) is the route array defined above
    BrowserModule,
    HttpClientModule, // This is the module that contains the HttpClient
    // exposes the exported declarations in NgbModule (classes, interfaces, constants, etc
    // and makes them available in the current module
    NgbModule,
    ReactiveFormsModule, // allows us to use reactive forms in our project
    OktaAuthModule
  ],
  providers: [
    ProductService, // ProductService allows us to inject this into other parts of our application
    {provide: OKTA_CONFIG, useValue: oktaConfig},
    // multi: true means that there can be zero to many interceptors
    // it informs Angular that HTTP_INTERCEPTORS is a token for injection of an array of values
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
