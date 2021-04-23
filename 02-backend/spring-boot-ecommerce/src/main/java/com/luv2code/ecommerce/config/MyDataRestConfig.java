package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration // Lets spring know this is a configuration file
public class MyDataRestConfig implements RepositoryRestConfigurer {

    // apparently this is deprecated, so if not changed by end of project, will need to look
    // for how to use updated version.
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config);

        // These are the HTTP methods that we want to restrict at the beginning
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // disable HTTP methods for Product: Put, Post, Delete
        config.getExposureConfiguration()// registers filter customizing the HTTP methods; by default is registered globally
                .forDomainType(Product.class) // specifies which Domains to apply the filter too
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) // registers the filter for item resources
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))); // registers the filter for collection resources
        // an item resource is one thing... in this case, one Product (e.g. /products/{product_id})
        // a collection resource is multiple things... in this case, several Products (e.g. /products)
        // So this protects against put/post/delete for a single Product or several Products

        // See notes above for explanation
        // disable HTTP methods for ProductCategory: Put, Post, Delete
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));


    }


}
