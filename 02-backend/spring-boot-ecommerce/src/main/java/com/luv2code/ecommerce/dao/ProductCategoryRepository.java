package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// (collectionResourceRel = "NameOfJsonEntry", </product-category>)
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
// JpaRepository<MyEntityType, MyIdType>
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
