package br.com.willpitz.movies.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MoviesResponseDTO {

    private List<MovieData> min;
    private List<MovieData> max;


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MovieData {

        private String producer;
        private Integer interval;
        private Integer previousWin;
        private Integer followingWin;
    }
}
