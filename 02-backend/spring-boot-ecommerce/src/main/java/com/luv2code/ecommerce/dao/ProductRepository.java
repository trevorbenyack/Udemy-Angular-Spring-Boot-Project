package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

// Origin is protocal + hostname + port
// All three have to match the calling app!
// Now configured in MyDataRestConfig
//@CrossOrigin("http://localhost:4200") // This is the server that our angular application is running on
// JpaRepository<MyEntityType, MyIdType>
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    // this is query method because it starts with "findBy"
    // we're going to match by "category id"
    // and we'll use 'id' as the parameter value
    // Behind the scenes, Spring will execute a query similar to this:
    // SELECT * FROM product WHERE category_id=?
    // Spring Data REST automatically exposes endpoint
    // http://localhost:8080/api/products/search/findByCategoryId?id=2
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    // Behind the scenes Spring will turn this into
    // SELECT * FROM product p WHERE p.name LIKE CONCAT('%', :name , '%')
    // :name will be replaced by the name coming in from our parameters
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
