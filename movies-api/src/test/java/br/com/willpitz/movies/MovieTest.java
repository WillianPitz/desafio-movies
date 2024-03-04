package br.com.willpitz.movies;

import br.com.willpitz.movies.exception.CsvFileReaderException;
import br.com.willpitz.movies.persistence.repository.MovieRepository;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static br.com.willpitz.movies.utils.TestUtil.assertJsonFromPath;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
class MovieTest {

    @Autowired
    private MockMvc webTestClient;

    @Autowired
    private MovieRepository repository;

    @Test
    @Order(1)
    void shouldReadCsvAndReturn() throws Exception {
        final var contractPath = "/response/get-movies-response.json";

        webTestClient.perform(get("/movie")
                .contentType(APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(assertJsonFromPath(contractPath));
    }

    @Test
    @Order(2)
    void shouldThrowExceptionWhenFindConsecutiveWinners() throws Exception {
        repository.deleteAll();

        webTestClient.perform(get("/movie")
                .contentType(APPLICATION_JSON))
            .andExpect(status().isInternalServerError())
            .andExpect(result -> assertTrue(result.getResolvedException() instanceof CsvFileReaderException));
    }
}
