package com.example.pokemonBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pokemonBackend.model.Registro;


public interface RegistroRepository extends JpaRepository<Registro, String> {
    
}
