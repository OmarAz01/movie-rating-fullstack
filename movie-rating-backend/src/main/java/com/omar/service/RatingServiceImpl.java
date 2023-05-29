package com.omar.service;

import com.omar.entity.RatingEntity;
import com.omar.repo.RatingRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService{

    private final RatingRepo ratingRepo;

    @Override
    public RatingEntity addRating(RatingEntity rating) {
        return ratingRepo.save(rating);
    }

    @Override
    public RatingEntity getRatingById(int id) {
        return ratingRepo.findById(id).get();
    }

    @Override
    public List<RatingEntity> getRatingByUserId(int id) {
        List<RatingEntity> ratings = ratingRepo.findByUserId(id);
        return ratings;
    }

    @Override
    public RatingEntity updateRating(RatingEntity rating) {
        RatingEntity existingRating = ratingRepo.findById(rating.getId()).orElseThrow();
        existingRating.setTitle(rating.getTitle());
        existingRating.setDescription(rating.getDescription());
        existingRating.setRating(rating.getRating());
        existingRating.setUserId(rating.getUserId());

        return ratingRepo.save(existingRating);
    }

    @Override
    public List<RatingEntity> getAllRatings() {
        return ratingRepo.findAll();
    }

    @Override
    public void deleteRatingById(int id) {
        ratingRepo.deleteById(id);
    }
}
