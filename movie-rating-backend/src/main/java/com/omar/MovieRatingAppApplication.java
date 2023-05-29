package com.omar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MovieRatingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieRatingAppApplication.class, args);
	}

}


