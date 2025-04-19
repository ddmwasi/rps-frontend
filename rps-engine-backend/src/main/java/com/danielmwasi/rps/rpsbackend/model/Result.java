package com.danielmwasi.rps.rpsbackend.model;

import lombok.Getter;

@Getter
public enum Result {
    PLAYER_WINS("PLAYER_WINS"),
    COMPUTER_WINS("COMPUTER_WINS"),
    DRAW("DRAW");

    private final String message;

    Result(String message) {
        this.message = message;
    }

}
