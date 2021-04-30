package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Origin is protocal + hostname + port
// All three have to match the calling app!
@CrossOrigin("http://localhost:4200") // This is the server that our angular application is running on

// (collectionResourceRel = "NameOfJsonEntry", </product-category>)
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
// JpaRepository<MyEntityType, MyIdType>
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
