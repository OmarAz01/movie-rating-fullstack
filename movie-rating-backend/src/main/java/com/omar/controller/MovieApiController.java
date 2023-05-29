package com.omar.controller;

import com.omar.model.Movie;
import com.omar.service.MovieApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moviedb")
@CrossOrigin
@RequiredArgsConstructor
public class MovieApiController {

    @Autowired
    private MovieApiService movieApiService;

    public MovieApiService getMovieAPIService() {
        return movieApiService;
    }
    public void setMovieAPIService(MovieApiService movieApiService) {
        this.movieApiService = movieApiService;
    }

    @GetMapping("/trending")
    public List<Movie> getTrending() {
        return movieApiService.getTrending();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable("id") int id) {
        Movie movie = movieApiService.getMovieById(id);
        return movie;
    }

    @GetMapping("/search/{query}")
    public List<Movie> searchMovie(@PathVariable("query") String query) {
        return movieApiService.searchMovie(query);
    }

}
