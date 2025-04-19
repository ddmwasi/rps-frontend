package com.danielmwasi.rps.rpsbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Random;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.danielmwasi.rps.rpsbackend.model.GameResult;
import com.danielmwasi.rps.rpsbackend.model.Move;
import com.danielmwasi.rps.rpsbackend.model.Result;

@SpringBootTest
class GameServiceTest {

    private GameService gameService;
    private Random mockRandom;

    @BeforeEach
    void setUp() {
        mockRandom = mock(Random.class);
        gameService = new GameService(mockRandom);
    }

    @Test
    void testPlayerWinsScenario() {
        when(mockRandom.nextInt(3)).thenReturn(Move.SCISSORS.ordinal());

        GameResult result = gameService.play(Move.ROCK);

        assertEquals(Move.ROCK, result.getPlayerMove());
        assertEquals(Move.SCISSORS, result.getComputerMove());
        assertEquals(Result.PLAYER_WINS, result.getResult());
    }

    @Test
    void testComputerWinsScenario() {
        when(mockRandom.nextInt(3)).thenReturn(Move.ROCK.ordinal());

        GameResult result = gameService.play(Move.SCISSORS);

        assertEquals(Move.SCISSORS, result.getPlayerMove());
        assertEquals(Move.ROCK, result.getComputerMove());
        assertEquals(Result.COMPUTER_WINS, result.getResult());
    }

    @Test
    void testDrawScenario() {
        when(mockRandom.nextInt(3)).thenReturn(Move.PAPER.ordinal());

        GameResult result = gameService.play(Move.PAPER);

        assertEquals(Move.PAPER, result.getPlayerMove());
        assertEquals(Move.PAPER, result.getComputerMove());
        assertEquals(Result.DRAW, result.getResult());
    }
}
