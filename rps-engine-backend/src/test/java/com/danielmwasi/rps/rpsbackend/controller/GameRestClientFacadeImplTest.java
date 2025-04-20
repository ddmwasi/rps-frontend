package com.danielmwasi.rps.rpsbackend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.danielmwasi.rps.rpsbackend.NoSecurityConfig;
import com.danielmwasi.rps.rpsbackend.model.GameResult;
import com.danielmwasi.rps.rpsbackend.model.Move;
import com.danielmwasi.rps.rpsbackend.model.MoveRequest;
import com.danielmwasi.rps.rpsbackend.model.Result;
import com.danielmwasi.rps.rpsbackend.service.GameService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(GameRestClientFacadeImpl.class)
@Import({ NoSecurityConfig.class, GameRestClientFacadeImplTest.MockedGameServiceConfig.class })
class GameRestClientFacadeImplTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameService gameService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockedGameServiceConfig {
        @Bean
        @Primary
        public GameService gameService() {
            return Mockito.mock(GameService.class);
        }
    }

    @BeforeEach
    void setupMock() {
        Mockito.reset(gameService);
    }

    @Test
    void playGame() throws Exception {
        MoveRequest request = new MoveRequest(Move.ROCK);
        GameResult expected = new GameResult(Move.ROCK, Move.PAPER, Result.COMPUTER_WINS);

        when(gameService.play(Move.ROCK)).thenReturn(expected);

        mockMvc.perform(post("/api/rps-game/play")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.playerMove").value("ROCK"))
                .andExpect(jsonPath("$.computerMove").value("PAPER"))
                .andExpect(jsonPath("$.result").value("COMPUTER_WINS"));
    }

    @Test
    void playGame_badRequest() throws Exception {
        MoveRequest request = new MoveRequest(); // no move set

        mockMvc.perform(post("/api/rps-game/play")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.type").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.field").value("playerMove"))
                .andExpect(jsonPath("$.errorMessage").value("Player move cannot be null"));
    }
}
