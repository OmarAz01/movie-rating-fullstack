package com.omar.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;

public interface JwtService {

    String getUsername(String jwt);

    Claims extractAllClaims(String jwt);

    <T> T extractClaim(String jwt, Function<Claims, T> claimsResolve);

    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

    String generateToken(UserDetails userDetails);

    boolean isTokenValid(String jwt, UserDetails userDetails);

    boolean isTokenExpired(String jwt);

}
