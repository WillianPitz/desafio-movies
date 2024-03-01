package br.com.willpitz.movies;

import br.com.willpitz.movies.exception.CsvFileReaderException;
import br.com.willpitz.movies.persistence.entity.MovieEntity;
import br.com.willpitz.movies.persistence.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static br.com.willpitz.movies.utils.TestUtil.assertJsonFromPath;
import static br.com.willpitz.movies.utils.TestUtil.jsonToObject;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MovieTest {

    @Autowired
    private MockMvc webTestClient;

    @MockBean
    private MovieRepository repository;

    @Test
    void shouldReadCsvAndReturn() throws Exception {
        final var contractPath = "/response/get-movies-response.json";
        final var findWinners = "/response/find-winners-response.json";

        final var movieEntity = jsonToObject(
            findWinners,
            MovieEntity[].class
        );

        when(repository.findConsecutiveWinners()).thenReturn(Arrays.stream(movieEntity).toList());

        webTestClient.perform(get("/movie")
                .contentType(APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(assertJsonFromPath(contractPath));
    }

    @Test
    void shouldThrowExceptionWhenFindConsecutiveWinners() throws Exception {
        when(repository.findConsecutiveWinners()).thenReturn(List.of());

        webTestClient.perform(get("/movie")
                .contentType(APPLICATION_JSON))
            .andExpect(status().isInternalServerError())
            .andExpect(result -> assertTrue(result.getResolvedException() instanceof CsvFileReaderException));
    }
}
