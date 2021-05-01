import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';

// This is using dependency injection to inject the ProductService for use throughout the app
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-categories';

  // Injects HttpClient
  constructor(private httpClient: HttpClient) { }

  // It's best practice to create a scalable solution by definiing re-usable injectable
  // services to perform data-handling functionality, which is what we're doing with
  // the getProductList() and getProductCategories() methods.

  // takes in the categoryId passed to it and returns an observable of Product[]
  // This method is basically going to map the JSON data from the Spring data REST service
  // to a product array.
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);

  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    // The end product being returned is an observable Product[]
    return this // this class instance
      .httpClient // the injected HttpClient
      // Using an interface (ResponseProduct) allows us to declare the type of the response object
      // and therefore allows us to use the map operator below!
      // the .get() method actually parses the JSON into an observable object behind the scenes and returns it
      .get<ResponseProducts>(searchUrl)
      // pipe can be used to sequentially combine multiple functions into a single function.
      // Pipe is taking the observable and passing it to each function (just map in this case)
      // map is then pulling out the products array and returning it.
      // i.e. this last part is "unwrapping" the products array from the _embedded wrapper.
      .pipe(map(response => response._embedded.products));
  }

  // This unwraps the JSON from the Spring Data REST response
  // see above getProductList() comments for explanation
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

} // end ProductService class

// an interface in TypeScript is a "contract" saying something of this type
// will have these elements of their respective types.
// It's similar to how Java forces interface methods to be overwritten in classes
// that implement an interface, but this is doing it for objects.
// In this example, ResponseProducts is the type, and its element
// is an object named _embedded with a products variable of type Product[]
interface ResponseProducts {
  _embedded: { // _embedded is the outer name returned by the Spring Rest API
    products: Product[]
  };
}

interface ResponseProductCategories {
  _embedded: { // _embedded is the outer name returned by the Spring Rest API
    productCategories: ProductCategory[]
  };
}
