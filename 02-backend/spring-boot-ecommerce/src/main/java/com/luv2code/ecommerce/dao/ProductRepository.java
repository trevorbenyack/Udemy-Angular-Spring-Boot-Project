package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
// Origin is protocal + hostname + port
// All three have to match the calling app!
@CrossOrigin("http://localhost:4200") // This is the server that our angular application is running on
// JpaRepository<MyEntityType, MyIdType>
public interface ProductRepository extends JpaRepository<Product, Long> {

}
