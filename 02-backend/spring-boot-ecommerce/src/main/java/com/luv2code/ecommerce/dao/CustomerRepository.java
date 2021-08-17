package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

// We're using Customer as the Entity type b/c the customer has a collection of orders
// When a purchase comes across, we'll grab the customer, assemble it accordingly,
// and then we'll save the actual customer using this customer repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);
}
