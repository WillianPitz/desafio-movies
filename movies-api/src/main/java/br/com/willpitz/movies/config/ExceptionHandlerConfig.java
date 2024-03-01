package br.com.willpitz.movies.config;

import br.com.willpitz.movies.error.ErrorResponseDTO;
import br.com.willpitz.movies.exception.CsvFileReaderException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlerConfig {

    @ExceptionHandler(CsvFileReaderException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ErrorResponseDTO handleException(CsvFileReaderException ex) {
        return ErrorResponseDTO.builder()
            .error("Ocorreu um erro ao realizar a operação")
            .message(ex.getMessage())
            .build();
    }
}
