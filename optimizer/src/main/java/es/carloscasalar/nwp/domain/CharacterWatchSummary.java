package es.carloscasalar.nwp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class CharacterWatchSummary {
    @NotNull
    private String characterName;

    @NotNull
    private Integer sleepingTime;

    @NotNull
    private Integer maxConsecutiveSleepingTime;
}
