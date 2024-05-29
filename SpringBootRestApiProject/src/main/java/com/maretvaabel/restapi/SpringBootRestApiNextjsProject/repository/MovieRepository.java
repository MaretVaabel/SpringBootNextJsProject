package com.maretvaabel.restapi.SpringBootRestApiNextjsProject.repository;

import com.maretvaabel.restapi.SpringBootRestApiNextjsProject.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository  extends JpaRepository<Movie, Integer> {
}
