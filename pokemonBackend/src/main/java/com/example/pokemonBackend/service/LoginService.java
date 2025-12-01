package com.example.pokemonBackend.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pokemonBackend.model.Login;
import com.example.pokemonBackend.model.Registro;
import com.example.pokemonBackend.repository.LoginRepository;
import com.example.pokemonBackend.repository.RegistroRepository;


@Service
public class LoginService {


    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private RegistroRepository registroRepository;


    public String almacenarLogin(Login login) {
         Registro usuario = registroRepository.findById(login.getEmail()).orElse(null);

         if (usuario == null) {
             return "Usuario no encontrado";
         }

         if (!usuario.getPassword().equals(login.getPassword())) {
             return "Contraseña incorrecta";
         }

         

         return "Login exitoso";
    }

    public List<Login> obtenerLogins() {
        return loginRepository.findAll();
    }
    
}
