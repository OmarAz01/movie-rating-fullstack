package com.omar.controller;

import com.omar.entity.RatingEntity;
import com.omar.repo.RatingRepo;
import com.omar.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;
    private final RatingRepo ratingRepo;

    //Gets the rating by userID
    @GetMapping("/all/{id}")
    public List<RatingEntity> getAll(@PathVariable("id") Integer id) {
        List<RatingEntity> ratings = ratingRepo.findByUserId(id);
        return ratings;
    }

    //Gets the rating by ratingID
    @GetMapping("/{id}")
    public RatingEntity getRating(@PathVariable("id") Integer id) {
        return ratingService.getRatingById(id);
    }

    @PostMapping("/add")
    public RatingEntity addRating(@RequestBody RatingEntity rating) {
        return ratingService.addRating(rating);
    }

    @PutMapping("/update/{id}")
    public RatingEntity updateRating(@PathVariable("id") Integer id, @RequestBody RatingEntity rating) {
        return ratingService.updateRating(rating);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRating(@PathVariable("id") Integer id) {
        ratingService.deleteRatingById(id);
    }



}

