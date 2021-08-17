package com.luv2code.ecommerce.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
@ConfigurationProperties(prefix = "allowed")
@Getter @Setter
public class CustomProperties {

    /**
     * Allowed cross-origins
     */
    String origins;


}
