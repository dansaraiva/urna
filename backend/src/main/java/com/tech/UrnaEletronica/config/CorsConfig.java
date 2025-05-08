package com.tech.UrnaEletronica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")  // Mapeia todos os endpoints, não apenas /api/**
                            .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")
                            .allowedMethods("*")  // Permite todos os métodos
                            .allowedHeaders("*")
                            .allowCredentials(true)
                            .maxAge(3600);  // Cache da resposta preflight por 1 hora
                }
            };
        }
    }
