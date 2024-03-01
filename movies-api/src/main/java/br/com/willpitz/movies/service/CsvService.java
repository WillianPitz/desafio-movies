package br.com.willpitz.movies.service;

import br.com.willpitz.movies.exception.CsvFileReaderException;
import br.com.willpitz.movies.persistence.entity.MovieEntity;
import br.com.willpitz.movies.persistence.repository.MovieRepository;
import com.opencsv.bean.CsvToBeanBuilder;
import io.vavr.control.Try;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class CsvService {

    public static final char SEPARATOR = ';';
    public static final String REGEX = "(,)|(\\band)";
    private final MovieRepository repository;
    private final ResourceLoader resourceLoader;

    @PostConstruct
    public void init() {
        final var resource = resourceLoader.getResource("classpath:csv/movielist.csv");

        log.info("Reading the file %s".formatted(resource.getFilename()));

        final var movieEntities = Try.withResources(() -> new FileReader(resource.getFile()))
            .of(this::parseCsvToEntity)
            .getOrElseThrow(throwable -> new CsvFileReaderException("Não foi possível realizar a transferencia dos dados do csv para a entity"));

        log.info("Reading completed successfully");

        repository.saveAll(movieEntities);
    }


    private List<MovieEntity> parseCsvToEntity(final FileReader fileReader) {
        return new CsvToBeanBuilder<MovieEntity>(fileReader)
            .withType(MovieEntity.class)
            .withSeparator(SEPARATOR)
            .build()
            .parse()
            .stream()
            .flatMap(CsvService::getMovieEntityStream)
            .toList();
    }

    private static Stream<MovieEntity> getMovieEntityStream(final MovieEntity movieEntity) {
        return Arrays.stream(movieEntity.getProducers().split(REGEX))
            .filter(StringUtils::isNotBlank)
            .map(producer -> MovieEntity.builder()
                .title(movieEntity.getTitle())
                .year(movieEntity.getYear())
                .studios(movieEntity.getStudios())
                .winner(movieEntity.getWinner())
                .producers(producer.trim())
                .build());
    }
}
