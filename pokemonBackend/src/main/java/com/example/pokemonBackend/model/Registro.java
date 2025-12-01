package com.example.pokemonBackend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Registro {


    @Id
    private String emailRegistro;
    private String nombre;
    private String password;


    @OneToMany(mappedBy = "registro")
    private List<Login> login;

    public Registro() {
    }

    public Registro(String nombre, String emailRegistro, String password) {
        this.nombre = nombre;
        this.emailRegistro = emailRegistro;
        this.password = password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmailRegistro() {
        return emailRegistro;
    }

    public List<Login> getLogins() {
        return login;
    }

    public void setLogins(List<Login> logins) {
        this.login = logins;
    }

    public void setEmailRegistro(String emailRegistro) {
        this.emailRegistro = emailRegistro;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
