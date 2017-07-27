package es.carloscasalar.nwp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Body of a plan request.
 */
@AllArgsConstructor
@Data
public class PlanRequest {
    @JsonProperty("lengthOfWatch")
    @NotNull
    @Min(1)
    private Integer lengthOfWatch;

    @JsonProperty("maxWatchs")
    @NotNull
    @Min(1)
    private Integer maxWatchs;

    @JsonProperty("firstNightWatch")
    @Min(1)
    private Integer firstNightWatch;

    @JsonProperty("lastNightWatch")
    @Min(1)
    private Integer lastNightWatch;

    @JsonProperty("party")
    @NotNull
    @Valid
    @Size(min = 1)
    private List<Character> party;
}

