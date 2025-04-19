package com.danielmwasi.rps.rpsbackend.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveRequest {

        @NotNull(message = "Player move cannot be null")
        private Move playerMove;
}
