package com.example.pokemonBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pokemonBackend.model.Login;



public interface LoginRepository extends JpaRepository <Login, String>  {
    
}
