package com.omar.repo;

import com.omar.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepo extends JpaRepository<RatingEntity, Integer> {

    List<RatingEntity> findByUserId(Integer userId);
}
