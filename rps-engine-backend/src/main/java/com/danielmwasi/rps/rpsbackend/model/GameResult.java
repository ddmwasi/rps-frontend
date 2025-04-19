package com.danielmwasi.rps.rpsbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public final class GameResult implements GameResponse {
    private Move playerMove;
    private Move computerMove;
    private Result result;
}