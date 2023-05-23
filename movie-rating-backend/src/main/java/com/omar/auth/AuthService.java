package com.omar.auth;

import com.omar.config.JwtService;
import com.omar.entity.Role;
import com.omar.entity.UserEntity;
import com.omar.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepo.save(user);

        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder().id(user.getId()).username(user.getUsername())
                .role(user.getRole()).jwt(jwt).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserEntity user = userRepo.findByUsername(request.getUsername()).orElseThrow();
        
        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder().id(user.getId()).username(user.getUsername())
                .role(user.getRole()).jwt(jwt).build();
    }
}
