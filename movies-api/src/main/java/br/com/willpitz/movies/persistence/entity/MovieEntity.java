package br.com.willpitz.movies.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "movie")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "\"year\"")
    private Integer year;
    private String title;
    private String studios;
    private String producers;
    private String winner;

}
