package com.example.pokemonBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pokemonBackend.model.Login;
import com.example.pokemonBackend.service.LoginService;



@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {


    @Autowired
    private LoginService loginService;


    @PostMapping
    public String almacenarLogin(@RequestBody Login login) {
        return loginService.almacenarLogin(login);
    }


    @GetMapping
    public List<Login> obtenerLogins() {
        return loginService.obtenerLogins();
    }
    
}
