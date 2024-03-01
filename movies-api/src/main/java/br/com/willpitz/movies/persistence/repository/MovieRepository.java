package br.com.willpitz.movies.persistence.repository;

import br.com.willpitz.movies.persistence.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, UUID> {

    @Query(value = "SELECT * FROM MOVIE WHERE winner = 'yes'"
        + "AND producers IN"
        + "(SELECT producers FROM MOVIE WHERE winner = 'yes' GROUP BY "
        + "producers HAVING count(producers) > 1)"
        + "ORDER BY producers",
        nativeQuery = true)
    List<MovieEntity> findConsecutiveWinners();
}
