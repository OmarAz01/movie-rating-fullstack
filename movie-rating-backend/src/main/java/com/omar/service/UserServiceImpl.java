package com.omar.service;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.repo.RatingRepo;
import com.omar.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepo userRepo;
    private RatingRepo ratingRepo;
    @Override
    public UserDTO findUser(Integer id) {
        UserEntity user = userRepo.findById(id).orElseThrow();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        return userDTO;
    }

    @Override
    public void deleteUser(Integer id) {
        UserEntity user = userRepo.findById(id).orElseThrow();
        ratingRepo.findByUserId(id).forEach(rating -> ratingRepo.deleteById(rating.getId()));
        userRepo.deleteById(id);
    }

    @Override
    public UserEntity updateUser(Integer id, UserEntity user) {
        UserEntity existingUser = userRepo.findById(id).orElseThrow();
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        return userRepo.save(existingUser);
    }

}
