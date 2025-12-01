package com.example.pokemonBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pokemonBackend.model.Registro;
import com.example.pokemonBackend.service.RegistroService;



@RestController
@RequestMapping("/registro")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistroController {
    

    @Autowired
    private RegistroService registroService;


    @PostMapping
    public String almacenarRegistro(@RequestBody Registro registro) {
        return registroService.almacenarRegistro(registro);
    }


    @GetMapping
    public List<Registro> obtenerRegistros() {
        return registroService.obtenerRegistros();
    }
}
