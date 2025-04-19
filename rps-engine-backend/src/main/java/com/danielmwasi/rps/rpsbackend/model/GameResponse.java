package com.danielmwasi.rps.rpsbackend.model;

public sealed interface GameResponse permits GameResult, ErrorResponse {
}
