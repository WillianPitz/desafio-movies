package br.com.willpitz.movies.service;

import br.com.willpitz.movies.controller.response.MoviesResponseDTO;
import br.com.willpitz.movies.controller.response.MoviesResponseDTO.MovieData;
import br.com.willpitz.movies.exception.CsvFileReaderException;
import br.com.willpitz.movies.persistence.entity.MovieEntity;
import br.com.willpitz.movies.persistence.repository.MovieRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.internal.util.collections.CollectionHelper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Optional.ofNullable;

@Slf4j
@AllArgsConstructor
@Service
public class MovieService {

    private final MovieRepository repository;

    public MoviesResponseDTO getMovies() {
        log.info("Searching producers with interval between two awards");

        final var consecutiveWinners = ofNullable(repository.findConsecutiveWinners())
            .filter(CollectionHelper::isNotEmpty)
            .orElseThrow(() -> new CsvFileReaderException("Não foi possível encontrar nenhum produtor com intervalo entre dois prêmios."));

        log.info("%d Producers were found with an interval between two awards".formatted(consecutiveWinners.size()));

        var groupedByProducer = consecutiveWinners.stream()
            .collect(Collectors.groupingBy(MovieEntity::getProducers));

        var movieDataList = groupedByProducer.values().stream()
            .flatMap(movies -> calculateIntervals(movies).stream())
            .toList();

        var minIntervalMovieData = findMinIntervalMovieData(movieDataList);
        var maxIntervalMovieData = findMaxIntervalMovieData(movieDataList);

        return MoviesResponseDTO.builder()
            .min(minIntervalMovieData)
            .max(maxIntervalMovieData)
            .build();
    }

    private List<MovieData> calculateIntervals(List<MovieEntity> movies) {
        return movies.stream()
            .sorted(Comparator.comparingInt(MovieEntity::getYear))
            .toList().stream()
            .flatMap(currentMovie -> movies.stream()
                .filter(nextMovie -> nextMovie.getYear() > currentMovie.getYear())
                .map(nextMovie -> {
                    var interval = nextMovie.getYear() - currentMovie.getYear();
                    return MovieData.builder()
                        .producer(currentMovie.getProducers())
                        .previousWin(currentMovie.getYear())
                        .followingWin(nextMovie.getYear())
                        .interval(interval)
                        .build();
                }))
            .toList();
    }

    private List<MovieData> findMaxIntervalMovieData(List<MovieData> movieDataList) {
        return movieDataList.stream()
            .filter(movieData -> movieDataList.stream()
                .max(Comparator.comparingInt(MovieData::getInterval)).stream()
                .findAny()
                .orElse(MovieData.builder().build()).getInterval()
                .equals(movieData.getInterval()))
            .toList();
    }

    private List<MovieData> findMinIntervalMovieData(List<MovieData> movieDataList) {
        return movieDataList.stream()
            .filter(movieData -> movieDataList.stream()
                .min(Comparator.comparingInt(MovieData::getInterval)).stream()
                .findAny()
                .orElse(MovieData.builder().build()).getInterval()
                .equals(movieData.getInterval()))
            .toList();
    }

}
