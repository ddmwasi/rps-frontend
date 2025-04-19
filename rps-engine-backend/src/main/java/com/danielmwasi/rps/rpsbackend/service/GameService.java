package com.danielmwasi.rps.rpsbackend.service;

import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.danielmwasi.rps.rpsbackend.model.GameResult;
import com.danielmwasi.rps.rpsbackend.model.Move;
import com.danielmwasi.rps.rpsbackend.model.Result;

import jakarta.validation.constraints.NotNull;

@Service
@Validated
public class GameService {

    private final Random random;

    public GameService(Random random) {
        this.random = random;
    }

    public GameService() {
        this(new Random());
    }

    public GameResult play(Move playerMove) {
        Move computerMove = generateComputerMove();
        Result result = determineWhoWins(playerMove, computerMove);

        return new GameResult(playerMove, computerMove, result);
    }

    private Result determineWhoWins(@NotNull Move playerMove, @NotNull Move computerMove) {
        if (playerMove == computerMove) {
            return Result.DRAW;
        }

        return switch (playerMove) {
            case ROCK -> (computerMove == Move.SCISSORS) ? Result.PLAYER_WINS : Result.COMPUTER_WINS;
            case PAPER -> (computerMove == Move.ROCK) ? Result.PLAYER_WINS : Result.COMPUTER_WINS;
            case SCISSORS -> (computerMove == Move.PAPER) ? Result.PLAYER_WINS : Result.COMPUTER_WINS;
        };
    }

    private Move generateComputerMove() {
        int randomIndex = random.nextInt(Move.values().length);
        return Move.values()[randomIndex];
    }
}
