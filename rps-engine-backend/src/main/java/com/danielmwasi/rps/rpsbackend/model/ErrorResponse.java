package com.danielmwasi.rps.rpsbackend.model;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public final class ErrorResponse implements GameResponse {
    private String type;
    @Nullable
    private String field;
    private String errorMessage;

    public ErrorResponse(String type, String errorMessage) {
        this.type = type;
        this.errorMessage = errorMessage;
        this.field = null;
    }
}
