package com.danielmwasi.rps.rpsbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danielmwasi.rps.rpsbackend.interfaces.GameApi;
import com.danielmwasi.rps.rpsbackend.model.GameResponse;
import com.danielmwasi.rps.rpsbackend.model.MoveRequest;
import com.danielmwasi.rps.rpsbackend.service.GameService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/rps-game")
@RequiredArgsConstructor
@Slf4j
public class GameRestClientFacadeImpl implements GameApi {

    private final GameService gameService;

    @Override
    @PostMapping("/play")
    public ResponseEntity<GameResponse> playGame(@Valid @RequestBody MoveRequest moveRequest) {
        log.info("Received move request: {}", moveRequest);
        return ResponseEntity.ok(gameService.play(moveRequest.getPlayerMove()));
    }
}
