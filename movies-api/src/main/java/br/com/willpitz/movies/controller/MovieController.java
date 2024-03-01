package br.com.willpitz.movies.controller;

import br.com.willpitz.movies.controller.response.MoviesResponseDTO;
import br.com.willpitz.movies.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movie")
@AllArgsConstructor
public class MovieController {

    private MovieService service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get the producer with the longest interval between two consecutive awards, and the one who got two awards the fastest")
    @ApiResponse(responseCode = "200", content = @Content(schema = @Schema(implementation = MoviesResponseDTO.class)))
    public MoviesResponseDTO getMovies() {
        return service.getMovies();
    }

}
