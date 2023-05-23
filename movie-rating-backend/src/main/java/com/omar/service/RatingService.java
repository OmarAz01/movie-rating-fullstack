package com.omar.service;

import com.omar.entity.RatingEntity;

import java.util.List;

public interface RatingService {
    RatingEntity addRating(RatingEntity rating);
    RatingEntity getRatingById(int id);
    RatingEntity updateRating(RatingEntity rating);
    List<RatingEntity> getAllRatings();
    void deleteRatingById(int id);

}
