package es.carloscasalar.nwp.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * Character
 */
@AllArgsConstructor
@Data
@Builder
@EqualsAndHashCode(exclude = {"senses", "requiredSleepTime"})
@ToString(exclude = {"senses", "requiredSleepTime"})
public class Character {
    @JsonProperty("name")
    @NotNull
    private final String name;

    @JsonProperty("senses")
    @NotNull
    @Size(min = 1)
    private final List<Sense> senses;

    @JsonProperty("requiredSleepTime")
    @Min(0)
    private final Integer requiredSleepTime;

    public Character copy() {
        return Character.builder()
                .name(name)
                .senses(new ArrayList<>(senses))
                .requiredSleepTime(requiredSleepTime)
                .build();
    }

    public int overSleepTime(int totalTimeSleeping) {
        int excess = totalTimeSleeping - requiredSleepTime;
        return Math.max(excess, 0);
    }

    public boolean needsToSleep() {
        return requiredSleepTime > 0;
    }
}
