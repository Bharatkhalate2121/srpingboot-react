package com.techbulls.Pizza.Palace.ExceptionHandlers;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.ValidationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@ControllerAdvice
public class ExceptionHandler {

    @JsonPropertyOrder({"message", "success", "error"})
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> createPizzaException(MethodArgumentNotValidException ex) {
        // Extracting validation errors
        Map<String, String> validationErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                validationErrors.put(error.getField(), error.getDefaultMessage()));
        ex.printStackTrace();
        String errorMessage = validationErrors.values().toString();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "success", false,
                        "message", "Operation Failed",
                        "error", new Error(400, errorMessage)
                ));
    }


    @org.springframework.web.bind.annotation.ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> pathVariableNotFound(NoSuchElementException ex){
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "success", false,
                        "message", "Operation Failed",
                        "error", new Error(HttpStatus.NOT_FOUND.value(),ex.getLocalizedMessage())
                ));

    }

    @org.springframework.web.bind.annotation.ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<?> duplicateKeyExceptionHandler(DuplicateKeyException duplicateKeyException){
        duplicateKeyException.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "success", false,
                        "message", "Operation Failed",
                        "error", new Error(HttpStatus.IM_USED.value(),"Email Address Already Exists")
                ));
    }


    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> invalidPathVariable(MethodArgumentTypeMismatchException ex){
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "success", false,
                        "message", "Operation Failed",
                        "error", new Error(HttpStatus.NOT_FOUND.value(),"Invalid Id"/* ex.getLocalizedMessage()*/)
                ));

    }



    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherExceptions(Exception ex){
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "success", false,
                        "message", "Operation Failed",
                        "error", new Error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internl Server Error")
                ));

    }



}
