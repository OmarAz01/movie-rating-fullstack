package com.omar.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.omar.model.Movie;
import com.omar.model.MovieApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
@Service
public class MovieApiServiceImpl implements MovieApiService{

    private final String apiKey;
    private final String apiUrl;
    private final RestTemplate restTemplate;

    public MovieApiServiceImpl(@Value("${api.key}") String apiKey, @Value("${api.url}") String apiUrl, RestTemplate restTemplate) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.restTemplate = restTemplate;
    }


    @Override
    public List<Movie> getTrending() {
        String fullUrl = apiUrl + "/trending/movie/week?api_key=" + apiKey;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(fullUrl, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String response = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                MovieApiResponse movieApiResponse = objectMapper.readValue(response, MovieApiResponse.class);
                List<Movie> movies = movieApiResponse.getResults();

                return movies;
            }
            catch (Exception e) {
                throw new RuntimeException("Failed to parse JSON", e);
            }
        } else {
            throw new RuntimeException("Failed to fetch movies from the API");
        }
    }

    @Override
    public Movie getMovieById(int id) {
        String fullUrl = apiUrl + "/movie/" + id + "?api_key=" + apiKey;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(fullUrl, String.class);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String response = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Movie movie = objectMapper.readValue(response, Movie.class);
                return movie;
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse JSON", e);
            }
        }
        else {
            throw new RuntimeException("Failed to fetch movie from the API");
        }

    }

    @Override
    public List<Movie> searchMovie(String query) {
        String fullUrl = apiUrl + "/search/movie?query=" + query + "&api_key=" + apiKey;
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(fullUrl, String.class);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String response = responseEntity.getBody();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                MovieApiResponse movieApiResponse = objectMapper.readValue(response, MovieApiResponse.class);
                List<Movie> movies = movieApiResponse.getResults();
                return movies;
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse JSON", e);
            }
        }
        else {
            throw new RuntimeException("Failed to fetch movie from the API");
        }

    }
}
