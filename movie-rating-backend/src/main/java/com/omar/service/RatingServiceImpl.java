package com.omar.service;

import com.omar.entity.RatingEntity;
import com.omar.repo.RatingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService{

    @Autowired
    private RatingRepo ratingRepo;

    @Override
    public RatingEntity addRating(RatingEntity rating) {
        return ratingRepo.save(rating);
    }

    @Override
    public RatingEntity getRatingById(int id) {
        return ratingRepo.findById(id).get();
    }

    @Override
    public RatingEntity updateRating(RatingEntity rating) {
        RatingEntity existingRating = ratingRepo.findById(rating.getId()).get();
//        if (existingRating == null) {
//            throw new RatingNotFoundException; // Implement This
//        }
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
