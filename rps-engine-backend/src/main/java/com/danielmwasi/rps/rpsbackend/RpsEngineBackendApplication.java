package com.danielmwasi.rps.rpsbackend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition
public class RpsEngineBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RpsEngineBackendApplication.class, args);
    }

}
