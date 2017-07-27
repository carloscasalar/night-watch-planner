package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Details of a watch.
 */

@Data
@AllArgsConstructor
public class Watch {
    @JsonProperty("sleepingCharacters")
    @NotNull
    private List<String> sleepingCharacters;

    @JsonProperty("watchfulCharacters")
    @NotNull
    private List<String> watchfulCharacters;
}

