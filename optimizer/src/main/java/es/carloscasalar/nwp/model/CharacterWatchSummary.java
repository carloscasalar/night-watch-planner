package es.carloscasalar.nwp.model;

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
