package com.luv2code.ecommerce.dto;

import lombok.Data;

// this class sends back a Java object as JSON
@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
