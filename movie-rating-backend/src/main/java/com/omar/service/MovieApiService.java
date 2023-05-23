package com.omar.service;

import com.omar.model.Movie;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MovieApiService {

    List<Movie> getTrending();
    Movie getMovieById(int id);
    List<Movie> searchMovie(String query);
}
