package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Character
 */
@AllArgsConstructor
@Data
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
    @Min(1)
    private final Integer requiredSleepTime;
}
