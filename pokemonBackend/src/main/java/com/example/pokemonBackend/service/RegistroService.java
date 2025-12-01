package com.example.pokemonBackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pokemonBackend.model.Registro;
import com.example.pokemonBackend.repository.RegistroRepository;


@Service
public class RegistroService {


    @Autowired
    private RegistroRepository registroRepository;


    public String almacenarRegistro(Registro registro) {
         registroRepository.save(registro);

         return "Registro almacenado correctamente";
    }

    public List<Registro> obtenerRegistros() {
        return registroRepository.findAll();
    }
    
}
