package com.maretvaabel.restapi.SpringBootRestApiNextjsProject.entity;

import jakarta.persistence.*;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long EIDR;
    private String name;
    public String Category;
    private float rate;
    private int year;
    private String state;

    public Movie() {
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public float getRate() {
        return rate;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getEIDR() {
        return EIDR;
    }

    public void setEIDR(long EIDR) {
        this.EIDR = EIDR;
    }
}
