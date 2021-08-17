package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

// @RestController configuration is separate from Spring Data Rest configuration!!!

// for additional information baeldung.com/spring-data-rest-customize-http-endpoints
@Configuration // Lets spring know this is a configuration file
// RepositoryRestConfigurer is a component to configure and customize the setup of Spring Data REST
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    // this handles the auto-wiring of our JPA entity manager
    private final EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager em) {
        entityManager = em;
    }

    // apparently this is deprecated, so if not changed by end of project, will need to look
    // for how to use updated version.
    // Since we are overriding this method, we use the same signature (and therefore the same
    // RepositoryRestConfiguration parameter type (That's where the config comes in).
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, corsRegistry);

        // This section is to configure which HTTP request types will be allowed
        // These are the HTTP methods that we want to restrict at the beginning
        // this is passed into the disableHttpMethods() method we created below
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.PUT,
                HttpMethod.POST,
                HttpMethod.DELETE,
                HttpMethod.PATCH
        };

        // We created this method ourselves in order to....
        // disable HTTP methods for Product: Put, Post, Delete
        disableHttpMethods(Product.class, config, theUnsupportedActions);
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);
        disableHttpMethods(Order.class, config, theUnsupportedActions);

        // This section is to expose the product_category id in the JSON response
        // call an internal helper method
        exposeIds(config);

        // configure cors mapping
        corsRegistry.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);

    } // end configureRepositoryRestConfiguration()

    private void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()// registers filter customizing the HTTP methods; by default is registered globally
                .forDomainType(theClass) // specifies which Domains to apply the filter too
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)) // registers the filter for item resources
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))); // registers the filter for collection resources
        // an item resource is one thing... in this case, one Product (e.g. /products/{product_id})
        // a collection resource is multiple things... in this case, several Products (e.g. /products)
        // So this protects against put/post/delete for a single Product or several Products
    }

    // This is needed because Spring Data REST api does not expose the primary key in the returned JSON body
    // more info: http://tommyziegler.com/how-to-expose-the-resourceid-with-spring-data-rest/
    private void exposeIds(RepositoryRestConfiguration config) {

        // Overall strategy:
        // Get the entities,
        // then decipher which classes they are,
        // stuff them all into an array,
        // and then tell the configurer to expose their Ids in the JSON body
        // Why all this...?
        // B/c gathering the entities allows our program to be more dynamic
        // We only need to expose the Ids for the entity classes, so this is how we go about doing it
        // instead of hard coding each entity domain/class

        // EXPOSE ENTITY IDS
        // get a list of all entity classes from the entity manager
        // The entity type describes the mapping between the actual persistable domain model object and a database table row.
        // i.e.
        // EntityType<?> is an interface
        // A metamodel is a model of a model (i.e. a model of our entities)
        // getMetamodel provides access to the metamodel of persistent entities in the persistence unit
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of the entity types
        List<Class<?>> entityClasses = new ArrayList<>();

        // get the entity types for the entities
        // Converts the entity type to a java class type
        for(EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // We go from Set<EntityType> -> List<Class> -> Array<Class>[]

        // expose the entity ids for the array of entity/domain types
        // passing in (new Class[0]) ensures that it will be an array of Class types
        // also, the runtime will create a new array with the correct size
        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);

        // 'domain type' refers to the class type itself (vs entity type which is the object
        // used to map the domain type to a persistent store object (e.g. database table)
        // i.e. an entity is the go-between object)
        // so we're telling the configurer to expose the Id field in the JSON response for the
        // classes that are in the class[] that we passed in.
        // Sets the list of domain types for which we will expose the ID value as a normal property.
        config.exposeIdsFor(domainTypes);

//        // example of only exposing 1 class:
//        @Override
//        protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
//            config.exposeIdsFor(FooEntity.class);
//        }
    }


}
