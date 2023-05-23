package com.omar.service;

import com.omar.entity.RatingEntity;

import java.util.List;
import java.util.Optional;

public interface RatingService {
    RatingEntity addRating(RatingEntity rating);
    RatingEntity getRatingById(int id);
    List<RatingEntity> getRatingByUserId(int id);
    RatingEntity updateRating(RatingEntity rating);
    List<RatingEntity> getAllRatings();
    void deleteRatingById(int id);

}
