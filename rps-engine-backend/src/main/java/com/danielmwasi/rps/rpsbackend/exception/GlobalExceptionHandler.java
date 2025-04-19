package com.danielmwasi.rps.rpsbackend.exception;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.danielmwasi.rps.rpsbackend.model.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Hidden
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .orElse(null);

        String field = fieldError != null ? fieldError.getField(): "Unknown";
        String message = fieldError != null ? fieldError.getDefaultMessage() : "Validation failed";
        ErrorResponse errorResponse = new ErrorResponse("VALIDATION_ERROR", field, message);
        log.error("Validation error occurred: {}", errorResponse);
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler()
    public ResponseEntity<ErrorResponse> handleExceptions(Exception ex) {

        String field = "Unknown";
        String message = ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse("INTERNAL_SERVER_ERROR", message);
        log.error("Exception error occurred: {}", errorResponse);
        return ResponseEntity.internalServerError().body(errorResponse);
    }
}
