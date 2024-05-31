package com.maretvaabel.restapi.SpringBootRestApiNextjsProject.controller;

import com.maretvaabel.restapi.SpringBootRestApiNextjsProject.entity.Movie;
import com.maretvaabel.restapi.SpringBootRestApiNextjsProject.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins= {"*"}, maxAge = 4800, allowCredentials = "false" )
@RestController
public class MovieController {
    @Autowired
    MovieRepository repo;
    //get all the movies
    //localhost:8080/movies
    @GetMapping("/movies")
    public List<Movie> getAllMovies(){

        return repo.findAll();
    }
    //get one movie by id
    //localhost:8080/movies/id
    @GetMapping("/movies/{id}")
    public Movie getMovieById(@PathVariable Integer id){
       Movie movie =  repo.findById(id).get();
      //  if (movie) {
      //      throw new IllegalStateException("There is no first string even though I totally expected there to be! <sarcasm>This exception is much more useful than NoSuchElementException</sarcasm>");
        // }
       return movie;
    }
    //Add new movie
    //localhost:8080/movies/add
    @PostMapping("/movies/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createMovie(@RequestBody Movie movie){
        repo.save(movie);
    }

    //Update the movie state by id
    //localhost:8080/movies/update/id
    @PutMapping("/movies/update/{id}")
    public Movie updateMovie(@PathVariable Integer id, @RequestBody Movie updatedMovie){
        Movie movie = repo.findById(id).get();
        movie.setState(updatedMovie.getState());
       repo.save(movie);
       return movie;
    }
    //Delete the movie by id
    //localhost:8080/movies/delete/id
    @DeleteMapping("/movies/delete/{id}")
    public void removeMovie(@PathVariable Integer id){
        Movie movie = repo.findById(id).get();
        repo.delete(movie);

    }

    //TODO:
    // 1) add throw errors,
    // 2) delete multiple movies
    // 3) filter and sorting
}
