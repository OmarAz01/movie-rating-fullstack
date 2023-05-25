package com.omar.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.Objects;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Movie {

    private Integer id;
    private String title;
    private String poster_path;
    private String backdrop_path;
    private String overview;
    private Integer runtime;
    private String release_date;
    private String vote_average;

}
