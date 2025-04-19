package com.danielmwasi.rps.rpsbackend.interfaces;

import com.danielmwasi.rps.rpsbackend.model.GameResponse;
import org.springframework.http.ResponseEntity;

import com.danielmwasi.rps.rpsbackend.model.MoveRequest;

public interface GameApi {
    ResponseEntity<GameResponse> playGame(MoveRequest moveRequest);
}
